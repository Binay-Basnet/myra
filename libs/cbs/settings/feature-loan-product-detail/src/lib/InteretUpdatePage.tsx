import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Column, Icon, Scrollable, Table, Text } from '@myra-ui';

import {
  InterestRateSetupInput,
  useEditLoanProductInterestRateMutation,
  useGetEndOfDayDateDataQuery,
  useGetLoanProductInterestRateDetailQuery,
  useGetLoanProductInterestRateListQuery,
  useUpdateLoanProductInterestRateMutation,
} from '@coop/cbs/data-access';
import { CustomInterestRateSetupInput, localizedDate } from '@coop/cbs/utils';

import { AccountInterestDetailModal, AccountInterestUpdateModal, SideBar } from '../components';

export const InterestUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;

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
    useGetLoanProductInterestRateDetailQuery(
      {
        id: selectedRateId,
        productId: id as string,
      },
      {
        enabled: Boolean(id && selectedRateId),
      }
    );

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const methods = useForm<CustomInterestRateSetupInput>();

  const { data: interestRateListData, isFetching } = useGetLoanProductInterestRateListQuery(
    {
      productId: id as string,
    },
    { enabled: !!id }
  );

  const rowData = useMemo(
    () =>
      interestRateListData?.settings?.general?.loanProducts?.listProductInterestRates?.data ?? [],
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
        header: 'Interest Rate',
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

  const { mutateAsync: updateLoanProductInterestRate } = useUpdateLoanProductInterestRateMutation();

  const handleSaveInterestRate = () => {
    asyncToast({
      id: 'settings-loan-product-interest-rate-update',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductInterestRateList']);
        handleUpdateModalClose();
      },
      promise: updateLoanProductInterestRate({
        productId: id as string,
        data: { ...methods.getValues() } as InterestRateSetupInput,
      }),
    });
  };
  const { mutateAsync: editInterestRate } = useEditLoanProductInterestRateMutation();

  const handleEditInterestRate = () => {
    asyncToast({
      id: 'settings-loan-product-interest-rate-edit',
      msgs: {
        loading: 'Updating Interest Rate',
        success: 'Interest Rate Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductInterestRateList']);
        handleUpdateModalClose();
      },
      promise: editInterestRate({
        id: selectedRateId,
        productId: id as string,
        data: { ...methods.getValues() } as InterestRateSetupInput,
      }),
    });
  };

  const handleUpdateModalClose = () => {
    methods.reset({ rate: null, effectiveDate: null, fileUploads: [], note: '' });

    setSelectedRateId('');
    onUpdateModalClose();
  };

  return (
    <Box display="flex">
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar />
      </Box>

      <Scrollable detailPage>
        <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
            <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
              Interest Update
            </Text>
            <Button
              leftIcon={<Icon as={HiOutlineRefresh} size="md" />}
              onClick={onUpdateModalToggle}
            >
              Update Interest
            </Button>
          </Box>
        </Box>
        <Box bg="background.500" ml="320px" p="s16" minH="100vh">
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
        </Box>
      </Scrollable>

      {!isRateDetailFetching && (
        <AccountInterestUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleSaveInterestRate}
          onEdit={handleEditInterestRate}
          methods={methods}
          rate={
            selectedRateId
              ? interestRateDetailData?.settings?.general?.loanProducts?.getProductInterestRate
                  ?.data
              : null
          }
        />
      )}

      <AccountInterestDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        rate={interestRateDetailData?.settings?.general?.loanProducts?.getProductInterestRate?.data}
      />
    </Box>
  );
};
