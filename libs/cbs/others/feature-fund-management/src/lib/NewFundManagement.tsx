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

import { Alert, asyncToast, Box, Button, FormSection, Loader, Text } from '@myra-ui';

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
  OtherFundDistributionTable,
  ParticularTable,
  TransferPLtoHO,
} from '../components';

export const NewFundManagement = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const {
    isOpen: isConfirmOpen,
    onClose: onConfirmClose,
    onToggle: onConfirmToggle,
  } = useDisclosure();

  const methods = useForm<CustomFundManagementInput>({
    defaultValues: {
      generalReserveFund: [
        {
          particular: '20.1 General Reserve Fund',
          percent: 0,
          thisYear: 0,
          lastYear: 0,
        },
      ],
      distributionTable: [
        {
          distribution: '20.2 Patronage Refund Fund',
          percent: 0,
          thisYear: 0,
          lastYear: 0,
        },
        {
          distribution: '20.3 Cooperative Promotion Fund',
          percent: 0,
          thisYear: 0,
          lastYear: 0,
        },
      ],
    },
  });

  const { watch, getValues, reset } = methods;

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

      const grossProfit = Number(currentFundAmount?.amount?.amount || 0);

      const staffBonusFund = Number(formData?.staffBonusFund);

      const profitBeforeTax = Number(
        (grossProfit - (staffBonusFund / 100) * grossProfit || 0).toFixed(2)
      );

      const incomeTax = Number(formData?.incomeTax || 0);

      const netProfit = Number(
        (profitBeforeTax - (incomeTax / 100) * profitBeforeTax || 0).toFixed(2)
      );

      const generalReserveFundPercent = Number(formData?.generalReserveFund || 0);

      const generalReserveFund = Number(
        ((generalReserveFundPercent / 100) * Number(netProfit) || 0).toFixed(2)
      );

      const remainingProfit = netProfit && generalReserveFund ? netProfit - generalReserveFund : 0;

      const patronageRefundFundPercent = Number(formData?.patronageRefundFund || 0);

      const patronageRefundFund = Number(
        ((patronageRefundFundPercent / 100) * remainingProfit).toFixed(2)
      );

      const cooperativePromotionFundPercent = Number(formData?.cooperativePromotionFund || 0);

      const cooperativePromotionFund = Number(
        ((cooperativePromotionFundPercent / 100) * remainingProfit).toFixed(2)
      );

      const finalRemainingProfit = remainingProfit - patronageRefundFund - cooperativePromotionFund;

      reset({
        // ...methods.getValues(),
        grossProfit,
        grossProfitCoa: `${currentFundAmount?.coaHead} - ${currentFundAmount?.coaHeadName}`,
        grossProfitDr: debitCreditConverter(
          currentFundAmount?.amount?.amount as string,
          currentFundAmount?.amount?.amountType as string
        ),
        staffBonusFund: formData?.staffBonusFund,
        incomeTax: formData?.incomeTax,
        generalReserveFund: [
          {
            particular: '20.1 General Reserve Fund',
            percent: Number(formData?.generalReserveFund || 0),
            thisYear: generalReserveFund,
            lastYear: 0,
          },
        ],
        distributionTable: [
          {
            distribution: '20.2 Patronage Refund Fund',
            percent: Number(formData?.patronageRefundFund || 0),
            thisYear: patronageRefundFund,
            lastYear: 0,
          },
          {
            distribution: '20.3 Cooperative Promotion Fund',
            percent: Number(formData?.cooperativePromotionFund || 0),
            thisYear: cooperativePromotionFund,
            lastYear: 0,
          },
        ],
        otherFunds: formData?.otherFunds?.map((other) => ({
          accountCode: {
            label: other?.accountName,
            value: other?.accountCode,
          } as unknown as string,
          percent: other?.percent as number,
          thisYear: Number(((Number(other?.percent || 0) / 100) * finalRemainingProfit).toFixed(2)),
        })),
      });
    }
  }, [editData, currentFundAmount]);

  const isSubmitDisabled = useMemo(() => {
    if (
      router?.asPath?.includes('/view') &&
      editData?.profitToFundManagement?.get?.record?.state === 'COMPLETED'
    ) {
      return true;
    }

    if (!otherFunds) {
      return true;
    }

    const totalPercent = otherFunds?.reduce((sum, fund) => {
      sum += Number(fund?.percent ?? 0);
      return sum;
    }, 0);

    return totalPercent !== 100;
  }, [otherFunds, editData, router?.asPath]);

  const { mutateAsync: addProfitToFundManagement } = useAddProfitToFundManagementDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      staffBonusFund: values['staffBonusFund'],
      incomeTax: values['incomeTax'],
      generalReserveFund: values['generalReserveFund'][0].percent,
      patronageRefundFund: values['distributionTable'][0].percent,
      cooperativePromotionFund: values['distributionTable'][1].percent,
      otherFunds: values?.otherFunds?.map(({ accountCode, percent }) => ({
        accountCode: (accountCode as unknown as { value: string })?.value,
        percent,
      })),
    };

    asyncToast({
      id: 'add-profit-to-fund-management',
      msgs: {
        loading: 'Adding profit to fund management data',
        success: 'Added profit to fund management',
      },
      promise: id
        ? addProfitToFundManagement({
            id: id as string,
            data: filteredValues as FundManagementInput,
          })
        : addProfitToFundManagement({ data: filteredValues as FundManagementInput }),
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

  const netProfitField = watch('netProfit');

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

                {Number(netProfitField) ? (
                  <FormSection
                    header="Appropriation of Profit (Profit Distribution)"
                    divider={false}
                  >
                    <ParticularTable />

                    <DistributionTable />

                    <OtherFundDistributionTable />
                  </FormSection>
                ) : null}
              </>
            )}

            {/* {currentFundError ? (
              <Box p="s20">
                <Alert status="error" title={currentFundError as string} hideCloseIcon />
              </Box>
            ) : Number(currentFundAmount?.amount?.amount) === 0 ? (
              <TransferPLtoHO />
            ) : (
              <>
                <BasicFundManagement />

                <FormSection header="Appropriation of Profit (Profit Distribution)" divider={false}>
                  <ParticularTable />

                  <DistributionTable />

                  <OtherFundDistributionTable />
                </FormSection>
              </>
            )} */}
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
