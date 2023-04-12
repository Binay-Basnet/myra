import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Column, Icon, Scrollable, Table, Text } from '@myra-ui';

import {
  useGetEndOfDayDateDataQuery,
  useGetLoanProductPenaltyChargeDetailQuery,
  useGetLoanProductPenaltyUpdateListQuery,
  useUpdateLoanProductPenaltyMutation,
} from '@coop/cbs/data-access';
import { PenaltyDetailModal, UpdatePenaltyModal } from '@coop/cbs/settings/ui-components';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { SideBar } from '../components';

export const LoanPenaltyUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedPenaltyId, setSelectedPenaltyId] = useState('');

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

  const methods = useForm();

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const { data: penaltyChargeDetailData, isFetching: isPenaltyChargeFetching } =
    useGetLoanProductPenaltyChargeDetailQuery(
      {
        id: selectedPenaltyId,
      },
      { enabled: !!selectedPenaltyId }
    );

  const { data: penaltyUpdateListData, isFetching } = useGetLoanProductPenaltyUpdateListQuery(
    {
      productId: id as string,
    },
    { enabled: !!id }
  );

  const rowData = useMemo(
    () => penaltyUpdateListData?.settings?.general?.loanProducts?.listPenaltyCharge?.data ?? [],
    [penaltyUpdateListData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.createdAt),
      },
      {
        header: 'Effective Date',
        accessorFn: (row) => localizedDate(row?.additionalData?.effectiveDate),
      },
      {
        header: 'Penalty Rate',
        accessorFn: (row) => `${row?.payload?.penaltyRate} %`,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Penalty Amount',
        accessorFn: (row) => amountConverter(row?.payload?.penaltyAmount),
        meta: {
          isNumeric: true,
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          closingDate &&
          props?.row?.original?.additionalData?.effectiveDate &&
          (localizedDate(closingDate) as string) <
            (localizedDate(props?.row?.original?.additionalData?.effectiveDate) as string) ? (
            <Button
              variant="ghost"
              onClick={(e) => {
                setSelectedPenaltyId(props?.row?.original?.additionalData?.id as string);
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
                setSelectedPenaltyId(props?.row?.original?.additionalData?.id as string);
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

  const { mutateAsync: updatePenalty } = useUpdateLoanProductPenaltyMutation();

  const handleSavePenaltyCharge = () => {
    const values = methods.getValues();
    asyncToast({
      id: 'settings-loan-product-penalty-charge-update',
      msgs: {
        loading: 'Updating Penalty Charge',
        success: 'Penalty Charge Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductPenaltyUpdateList']);
        handleUpdateModalClose();
      },
      promise: updatePenalty({
        productId: id as string,
        payload: values['payload'],
        additionalData: values['additionalData'],
      }),
    });
  };

  const handleEditInterestRate = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'settings-loan-product-penalty-charge-edit',
      msgs: {
        loading: 'Updating Penalty Charge',
        success: 'Penalty Charge Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductPenaltyUpdateList']);
        handleUpdateModalClose();
      },
      promise: updatePenalty({
        id: selectedPenaltyId,
        productId: id as string,
        payload: values['payload'],
        additionalData: values['additionalData'],
      }),
    });
  };

  const handleUpdateModalClose = () => {
    methods.reset({
      payload: { dayAfterInstallmentDate: null, penaltyRate: null, penaltyAmount: null },
      additionalData: { effectiveDate: null, fileUploads: [], notes: '' },
    });

    setSelectedPenaltyId('');
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
              Penalty Update
            </Text>
            <Button
              leftIcon={<Icon as={HiOutlineRefresh} size="md" />}
              onClick={onUpdateModalToggle}
            >
              Update Penalty
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
              setSelectedPenaltyId(row?.additionalData?.id as string);
              onDetailModalToggle();
            }}
          />
        </Box>
      </Scrollable>

      {!isPenaltyChargeFetching && (
        <UpdatePenaltyModal
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateModalClose}
          onSave={handleSavePenaltyCharge}
          onEdit={handleEditInterestRate}
          methods={methods}
          penalty={
            selectedPenaltyId
              ? penaltyChargeDetailData?.settings?.general?.loanProducts?.getPenaltyCharge?.data
              : null
          }
        />
      )}

      <PenaltyDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        penalty={penaltyChargeDetailData?.settings?.general?.loanProducts?.getPenaltyCharge?.data}
      />
    </Box>
  );
};
