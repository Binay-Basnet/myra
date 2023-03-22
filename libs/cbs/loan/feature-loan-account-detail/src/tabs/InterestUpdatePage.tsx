import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Button, Column, DetailsCard, Icon, Table } from '@myra-ui';

import {
  useEditLoanAccountInterestMutation,
  useGetEndOfDayDateDataQuery,
  useGetLoanAccountInterestRateDetailQuery,
  useListLoanAccountInterestRateListQuery,
  useUpdateLoanAccountInterestMutation,
} from '@coop/cbs/data-access';
import { CustomInterestRateSetupInput, localizedDate } from '@coop/cbs/utils';

import { AccountInterestDetailModal, AccountInterestUpdateModal, TabHeader } from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const InterestUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { overviewData } = useLoanAccountDetailHooks();

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
    useGetLoanAccountInterestRateDetailQuery(
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

  const { data: interestRateListData, isFetching } = useListLoanAccountInterestRateListQuery(
    {
      accountId: id as string,
    },
    { enabled: !!id }
  );

  const rowData = useMemo(
    () => interestRateListData?.loanAccount?.listAccountInterestRates?.data ?? [],
    [interestRateListData]
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

  const { mutateAsync: updateLoanAccountInterest } = useUpdateLoanAccountInterestMutation();

  const handleSaveInterestRate = () => {
    const values = methods.getValues();

    // console.log({ ...values, rate: Number(accountDetails?.interestRate) + Number(values.rate) });
    asyncToast({
      id: 'loan-account-detail-interest-rate-update',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['listLoanAccountInterestRateList']);
        handleUpdateModalClose();
      },
      promise: updateLoanAccountInterest({
        accountId: id as string,
        data: {
          ...values,
          rate: Number(overviewData?.generalInformation?.interestRate) + Number(values.rate),
        },
      }),
    });
  };

  const { mutateAsync: editLoanAccountInterestRate } = useEditLoanAccountInterestMutation();

  const handleEditInterestRate = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'loan-account-detail-interest-rate-edit',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['listLoanAccountInterestRateList']);
        handleUpdateModalClose();
      },
      promise: editLoanAccountInterestRate({
        id: selectedRateId,
        accountId: id as string,
        data: {
          ...values,
          rate: Number(overviewData?.generalInformation?.interestRate) + Number(values.rate),
        },
      }),
    });
  };

  const handleUpdateModalClose = () => {
    setSelectedRateId('');
    onUpdateModalClose();
  };

  return (
    <>
      <TabHeader
        heading="Interest Update"
        headerButton={
          <Button leftIcon={<Icon as={HiOutlineRefresh} size="md" />} onClick={onUpdateModalToggle}>
            Update Interest Interest
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
          rate={interestRateDetailData?.loanAccount?.getAccountInterestRate?.data}
        />
      )}

      <AccountInterestDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        rate={interestRateDetailData?.loanAccount?.getAccountInterestRate?.data}
      />
    </>
  );
};
