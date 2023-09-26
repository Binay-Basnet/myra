import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Column, Icon, Scrollable, Table, Text } from '@myra-ui';

import {
  ProductChargeAdditionalDataInput,
  ProductRebateData,
  RebateTypeInput,
  Scalars,
  useGetEndOfDayDateDataQuery,
  useGetLoanProductRebateUpdateListQuery,
  useUpdateLoanProductRebateMutation,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { RebateDetailModal, SideBar } from '../components';
import { RebateUpdateModal } from '../components/RebateUpdateModal';

type LoanProductRebateUpdateInput = {
  payload: RebateTypeInput;
  additionalData: Omit<ProductChargeAdditionalDataInput, 'effectiveDate'> & {
    effectiveDate: Scalars['Localized'] | null;
  };
};
export const LoanRebateUpdatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedRebate, setSelectedRebate] = useState<ProductRebateData | null>();

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

  const methods = useForm<LoanProductRebateUpdateInput>();

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const { data: rebateUpdateListData, isFetching } = useGetLoanProductRebateUpdateListQuery(
    {
      productId: id as string,
    },
    { enabled: !!id }
  );

  const rowData = useMemo(
    () => rebateUpdateListData?.settings?.general?.loanProducts?.listRebateCharge?.data ?? [],
    [rebateUpdateListData]
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
        header: 'Rebate Rate',
        accessorFn: (row) => (row?.payload?.rebateRate ? `${row?.payload?.rebateRate} %` : '-'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Rebate Amount',
        accessorFn: (row) => amountConverter(row?.payload?.rebateAmount),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Days before installment date',
        accessorFn: (row) => row?.payload?.dayBeforeInstallmentDate || '-',
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
                setSelectedRebate(props?.row?.original as ProductRebateData);
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
                setSelectedRebate(props?.row?.original as ProductRebateData);
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

  const { mutateAsync: updateRebate } = useUpdateLoanProductRebateMutation();

  const handleSavePenaltyCharge = () => {
    const values = methods.getValues();
    asyncToast({
      id: 'settings-loan-product-rebate-charge-update',
      msgs: {
        loading: 'Updating Rebate Charge',
        success: 'Rebate Charge Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductRebateUpdateList']);
        handleUpdateModalClose();
      },
      promise: updateRebate({
        productId: id as string,
        payload: values['payload'],
        additionalData: values['additionalData'] as ProductChargeAdditionalDataInput,
      }),
    });
  };

  const handleEditInterestRate = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'settings-loan-product-rebate-charge-edit',
      msgs: {
        loading: 'Updating Rebate Charge',
        success: 'Rebate Charge Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductRebateUpdateList']);
        handleUpdateModalClose();
      },
      promise: updateRebate({
        id: selectedRebate?.additionalData?.id,
        productId: id as string,
        payload: values['payload'],
        additionalData: values['additionalData'] as ProductChargeAdditionalDataInput,
      }),
    });
  };

  const handleUpdateModalClose = () => {
    methods.reset({
      payload: { dayBeforeInstallmentDate: null, rebateRate: null, rebateAmount: null },
      additionalData: { effectiveDate: null, fileUploads: [], notes: '' },
    });

    setSelectedRebate(null);
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
              Rebate Update
            </Text>
            <Button
              leftIcon={<Icon as={HiOutlineRefresh} size="md" />}
              onClick={onUpdateModalToggle}
            >
              Update Rebate
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
              setSelectedRebate(row as ProductRebateData);
              onDetailModalToggle();
            }}
          />
        </Box>
      </Scrollable>

      <RebateUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onSave={handleSavePenaltyCharge}
        onEdit={handleEditInterestRate}
        methods={methods}
        // penalty={
        //   selectedRebate
        //     ? penaltyChargeDetailData?.settings?.general?.loanProducts?.getPenaltyCharge?.data
        //     : null
        // }
      />

      <RebateDetailModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        rebate={selectedRebate}
      />
    </Box>
  );
};
