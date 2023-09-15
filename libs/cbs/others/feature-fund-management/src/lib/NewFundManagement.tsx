import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Loader, Text } from '@myra-ui';

import {
  FundManagementInput,
  useAddProfitToFundManagementDataMutation,
  useExecuteProfitFundMangementMutation,
  useGetCurrentFundAmountQuery,
  useGetFundManagementFormStateQuery,
} from '@coop/cbs/data-access';
import { findQueryError, getQueryError, QueryError, ROUTES } from '@coop/cbs/utils';
import { FormLayout } from '@coop/shared/form';
import { debitCreditConverter, featureCode } from '@coop/shared/utils';

import { CustomFundManagementInput } from './type';
import {
  BasicFundManagement,
  DistributionTable,
  IncomeTax,
  OtherFundDistributionTable,
  ParticularTable,
  StaffBonusFund,
  TransferPLtoHO,
} from '../components';
import { useFundManagement } from '../hooks';

export const NewFundManagement = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onToggle: onConfirmToggle,
  } = useDisclosure();

  const methods = useForm<CustomFundManagementInput>();

  const { watch, getValues, reset } = methods;

  const { remainingProfitAfterTax, remainingProfitAfterOther } = useFundManagement({ methods });

  const otherFunds = watch('otherFunds');

  const id = router?.query?.['id'];

  const { data: editData } = useGetFundManagementFormStateQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const { data: currentFundAmountHOData } = useGetCurrentFundAmountQuery({ forHeadOffice: true });

  const currentFundAmount = currentFundAmountHOData?.profitToFundManagement?.getCurrentFundAmount;

  useEffect(() => {
    if (editData?.profitToFundManagement?.get?.record) {
      const formData = editData?.profitToFundManagement?.get?.record;

      const grossProfit =
        formData?.state === 'COMPLETED'
          ? Number(formData?.grossProfit || 0)
          : Number(currentFundAmount?.amount?.amount || 0);

      const staffBonusAmount = Number(formData?.staffBonus?.amount || 0);

      const incomeTaxAmount = Number(formData?.incometax?.amount || 0);

      const netProfit = (grossProfit - staffBonusAmount - incomeTaxAmount).toFixed(2);

      const generalReserveFund =
        formData?.fundDistribution?.filter((fund) => fund?.tableIndex === 0) ?? [];

      const distributionFund =
        formData?.fundDistribution?.filter((fund) => fund?.tableIndex === 1) ?? [];

      const otherFundsTable =
        formData?.fundDistribution?.filter((fund) => fund?.tableIndex === 2) ?? [];

      reset({
        // ...methods.getValues(),
        grossProfit,
        grossProfitCoa:
          formData?.state === 'COMPLETED'
            ? (formData?.grossProfitCoa as string)
            : `${currentFundAmount?.coaHead} - ${currentFundAmount?.coaHeadName}`,
        grossProfitDr:
          formData?.state === 'COMPLETED'
            ? debitCreditConverter(grossProfit, 'CR')
            : debitCreditConverter(
                currentFundAmount?.amount?.amount as string,
                currentFundAmount?.amount?.amountType as string
              ),
        staffBonus: {
          coaHead: {
            label: formData?.staffBonus?.accountName,
            value: formData?.staffBonus?.accountCode,
          } as unknown as string,
          percent: formData?.staffBonus?.percent,
          amount: formData?.staffBonus?.amount as string,
        },
        incomeTax: {
          coaHead: {
            label: formData?.incometax?.accountName,
            value: formData?.incometax?.accountCode,
          } as unknown as string,
          percent: formData?.incometax?.percent,
          amount: formData?.incometax?.amount as string,
        },
        generalReserveFund: generalReserveFund?.map((g) => ({
          coaHead: g?.accountCode as string,
          coaHeadName: g?.accountName as string,
          percent: String(g?.percent),
          amount: g?.amount as string,
        })),
        distributionTable: distributionFund?.map((g) => ({
          coaHead: g?.accountCode as string,
          coaHeadName: g?.accountName as string,
          percent: String(g?.percent),
          amount: g?.amount as string,
        })),
        otherFunds: otherFundsTable?.map((g) => ({
          coaHead: g?.accountCode as string,
          coaHeadName: g?.accountName as string,
          percent: String(g?.percent),
          amount: g?.amount as string,
        })),
        netProfit,
      });
    }
  }, [editData, currentFundAmount]);

  const { mutateAsync: addProfitToFundManagement } = useAddProfitToFundManagementDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const staffBonusCoaHead = values?.['staffBonus']?.coaHead as unknown;
    const incomeTaxCoaHead = values?.['incomeTax']?.coaHead as unknown;

    const filteredValues = {
      staffBonus: {
        coaHead:
          staffBonusCoaHead && typeof staffBonusCoaHead === 'object' && 'value' in staffBonusCoaHead
            ? staffBonusCoaHead?.['value']
            : staffBonusCoaHead,
        percent: values['staffBonus']?.percent,
        amount: values['staffBonus']?.amount,
      },
      incomeTax: {
        coaHead:
          incomeTaxCoaHead && typeof incomeTaxCoaHead === 'object' && 'value' in incomeTaxCoaHead
            ? incomeTaxCoaHead?.['value']
            : incomeTaxCoaHead,
        percent: values['incomeTax']?.percent,
        amount: values['incomeTax']?.amount,
      },

      others: [
        ...(values?.generalReserveFund?.map((gen) => ({
          coaHead: gen?.coaHead,
          amount: gen?.amount,
          percent: gen?.percent,
          tableIndex: 0,
        })) ?? []),
        ...(values?.distributionTable?.map((dis) => ({
          coaHead: dis?.coaHead,
          amount: dis?.amount,
          percent: dis?.percent,
          tableIndex: 1,
        })) ?? []),
        ...(values?.otherFunds?.map((oth) => ({
          coaHead: oth?.coaHead,
          amount: oth?.amount,
          percent: oth?.percent,
          tableIndex: 2,
        })) ?? []),
      ],
    };

    asyncToast({
      id: 'add-profit-to-fund-management',
      msgs: {
        loading: router?.asPath?.includes('edit')
          ? 'Updating profit to fund management data'
          : 'Adding profit to fund management data',
        success: router?.asPath?.includes('edit')
          ? 'Updated profit to fund management'
          : 'Added profit to fund management',
      },
      promise: id
        ? addProfitToFundManagement({
            id: id as string,
            data: filteredValues as unknown as FundManagementInput,
          })
        : addProfitToFundManagement({ data: filteredValues as unknown as FundManagementInput }),
      onSuccess: () => router.back(),
    });
  };

  const { mutateAsync: execute } = useExecuteProfitFundMangementMutation();

  const handleExecute = () => {
    asyncToast({
      id: 'execute-profit-fund-management',
      msgs: { loading: 'Executing fund management', success: 'Fund management executed' },
      promise: execute({ id: id as string }),
      onSuccess: () => {
        queryClient.invalidateQueries(['profitToFundManagementList']);
        router.push(ROUTES.CBS_OTHERS_FUND_MANAGEMENT_LIST);
      },
    });
  };

  const { data: branchFundData, isFetching } = useGetCurrentFundAmountQuery({
    forHeadOffice: false,
  });

  const branchFundAmount = branchFundData?.profitToFundManagement?.getCurrentFundAmount;

  const currentFundError = useMemo(() => {
    if (!branchFundAmount) return '';

    const errorKeys = findQueryError(branchFundAmount, 'error');

    return errorKeys
      ? getQueryError(errorKeys?.length ? errorKeys[0] : (errorKeys as unknown as QueryError))
      : '';
  }, [branchFundAmount]);

  const isSubmitDisabled = useMemo(() => {
    if (
      router?.asPath?.includes('/view') &&
      editData?.profitToFundManagement?.get?.record?.state === 'COMPLETED'
    ) {
      return true;
    }

    return remainingProfitAfterOther !== 0;
  }, [otherFunds, editData, router?.asPath, remainingProfitAfterOther]);

  return (
    <>
      <FormLayout methods={methods}>
        <FormLayout.Header
          title={`New Profit to Fund Management - ${featureCode?.newProfitToFundManagement}`}
          // closeLink="/others/fund-management/list"
        />

        <FormLayout.Content>
          <FormLayout.Form>
            {isFetching ? (
              <Loader />
            ) : currentFundError ? (
              <Box p="s20">
                <Alert status="error" title={currentFundError as string} hideCloseIcon />
              </Box>
            ) : Number(branchFundAmount?.amount?.amount) !== 0 ? (
              <TransferPLtoHO />
            ) : (
              <>
                <BasicFundManagement />

                <StaffBonusFund />

                <IncomeTax />

                {Number(remainingProfitAfterTax) ? (
                  <>
                    <ParticularTable />

                    <DistributionTable />

                    <OtherFundDistributionTable />
                  </>
                ) : null}
              </>
            )}
          </FormLayout.Form>
        </FormLayout.Content>

        <FormLayout.Footer
          mainButtonLabel={router?.asPath?.includes('/view') ? 'Execute' : 'Submit'}
          mainButtonHandler={router?.asPath?.includes('/view') ? onConfirmToggle : handleSubmit}
          isMainButtonDisabled={isSubmitDisabled}
        />
      </FormLayout>

      <FundManagementExecutionConfirmation
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        onToggle={onConfirmToggle}
        handleConfirm={handleExecute}
      />
    </>
  );
};

type FundManagementExecutionConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;

  handleConfirm: () => void;
};

const FundManagementExecutionConfirmation = ({
  isOpen,
  onClose,
  onToggle,
  handleConfirm,
}: FundManagementExecutionConfirmationProps) => {
  const confirmCancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={confirmCancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            borderBottom="1px"
            borderColor="border.layout"
          >
            <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
              Profit to Fund Management Confirmation
            </Text>
          </AlertDialogHeader>

          <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
            <Box display="flex" flexDirection="column" gap="s16">
              <Text fontSize="s3" fontWeight={400} color="gray.800">
                This action is irreversible and will execute the fund management process.
              </Text>
            </Box>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={confirmCancelRef} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              onClick={() => {
                onToggle();
                handleConfirm();
              }}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
