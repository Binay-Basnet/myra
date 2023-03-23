import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Button, Column, DetailsCard, Icon, Table } from '@myra-ui';

import {
  InterestRateSetupInput,
  useAccountDetails,
  useEditAccountInterestMutation,
  useGetAccountInterestRateDetailQuery,
  useGetEndOfDayDateDataQuery,
  useListAccountInterestRateListQuery,
  useUpdateAccountInterestMutation,
} from '@coop/cbs/data-access';
import { CustomInterestRateSetupInput, localizedDate } from '@coop/cbs/utils';

import { AccountInterestDetailModal } from './AccountInterestDetailModal';
import { AccountInterestUpdateModal } from './AccountInterestUpdateModal';
import { TabHeader } from './TabHeader';

export const InterestUpdateTab = () => {
  const router = useRouter();
  const { id } = router.query;

  const { accountDetails } = useAccountDetails();

  const [selectedRateId, setSelectedRateId] = useState('');

  const queryClient = useQueryClient();

  const {
    isOpen: isUpdateModalOpen,
    onClose: onUpdateModalClose,
    onToggle: onUpdateModalToggle,
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onClose: onDetailModalClose,
    onToggle: onDetailModalToggle,
  } = useDisclosure();

  const { data: interestRateDetailData, isFetching: isRateDetailFetching } =
    useGetAccountInterestRateDetailQuery(
      {
        id: selectedRateId,
        accountId: id as string,
      },
      {
        enabled: Boolean(id && selectedRateId),
      }
    );

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const methods = useForm<CustomInterestRateSetupInput>();

  const { data: interestRateListData, isFetching } = useListAccountInterestRateListQuery(
    {
      accountId: id as string,
    },
    { enabled: !!id }
  );

  const rowData = useMemo(
    () => interestRateListData?.account?.listAccountInterestRates?.data ?? [],
    [interestRateListData]
  );

  const baseRate = useMemo(
    () =>
      Number(
        selectedRateId
          ? interestRateDetailData?.account?.getAccountInterestRate?.data?.rate
          : interestRateListData?.account?.listAccountInterestRates?.data?.[0]?.rate ?? 0
      ),
    [interestRateListData, selectedRateId, interestRateDetailData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorKey: 'createdAt',
        cell: (props) => localizedDate(props?.row?.original?.createdAt),
      },
      {
        header: 'Effective Date',
        accessorKey: 'effectiveDate',
        cell: (props) => localizedDate(props?.row?.original?.effectiveDate),
      },
      {
        header: 'New A/C Premium',
        accessorKey: 'rate',
        cell: (props) => `${props?.row?.original?.rate} %`,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          closingDate &&
          props?.row?.original?.effectiveDate &&
          (localizedDate(closingDate) as string) <
            (localizedDate(props?.row?.original?.effectiveDate) as string) ? (
            <Button
              variant="ghost"
              onClick={(e) => {
                setSelectedRateId(props?.row?.original?.id as string);
                onUpdateModalToggle();
                e.stopPropagation();
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedRateId(props?.row?.original?.id as string);
                onDetailModalToggle();
              }}
            >
              View
            </Button>
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [closingDate]
  );

  const { mutateAsync: updateAccountInterest } = useUpdateAccountInterestMutation();

  const handleSaveInterestRate = () => {
    const values = methods.getValues();

    // console.log({ ...values, rate: Number(accountDetails?.interestRate) + Number(values.rate) });
    asyncToast({
      id: 'account-detail-interest-rate-update',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['listAccountInterestRateList']);
        handleUpdateModalClose();
      },
      promise: updateAccountInterest({
        accountId: id as string,
        data: {
          ...values,
          rate: baseRate + Number(values.rate),
        } as InterestRateSetupInput,
      }),
    });
  };

  const { mutateAsync: editInterestRate } = useEditAccountInterestMutation();

  const handleEditInterestRate = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'account-detail-interest-rate-edit',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['listAccountInterestRateList']);
        handleUpdateModalClose();
      },
      promise: editInterestRate({
        id: selectedRateId,
        accountId: id as string,
        data: {
          ...values,
          rate: Number(accountDetails?.interestRate) + Number(values.rate),
        } as InterestRateSetupInput,
      }),
    });
  };

  const handleUpdateModalClose = () => {
    methods.reset({ rate: null, effectiveDate: null, fileUploads: [], note: '' });

    setSelectedRateId('');
    onUpdateModalClose();
  };

  return (
    <>
      <TabHeader
        heading="Interest Update"
        headerButton={
          <Button leftIcon={<Icon as={HiOutlineRefresh} size="md" />} onClick={onUpdateModalToggle}>
            Update Interest
          </Button>
        }
      />

      <DetailsCard title="Interest Update Schedule" hasTable>
        <Table
          isStatic
          isLoading={isFetching}
          data={rowData}
          columns={columns}
          rowOnClick={(row) => {
            setSelectedRateId(row?.id as string);
            onDetailModalToggle();
          }}
        />
      </DetailsCard>

      {!isRateDetailFetching && (
        <AccountInterestUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleSaveInterestRate}
          onEdit={handleEditInterestRate}
          methods={methods}
          rate={
            selectedRateId ? interestRateDetailData?.account?.getAccountInterestRate?.data : null
          }
          baseRate={baseRate}
        />
      )}

      <AccountInterestDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        rate={interestRateDetailData?.account?.getAccountInterestRate?.data}
      />
    </>
  );
};
