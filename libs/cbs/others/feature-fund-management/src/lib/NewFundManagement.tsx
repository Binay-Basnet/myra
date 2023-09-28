import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, FormSection, Loader, Text } from '@myra-ui';

import {
  FundManagementInput,
  useAddProfitToFundManagementDataMutation,
  useCheckSourceCoaValidityQuery,
  useExecuteProfitFundMangementMutation,
  useGetCoaAccountDetailsQuery,
  useGetCurrentFundAmountQuery,
  useGetFundManagementFormStateQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormCOALedgerSelect, FormLayout, FormLeafCoaHeadSelect } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

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

  const { watch, getValues } = methods;

  const { remainingProfitAfterTax, remainingProfitAfterOther } = useFundManagement({ methods });
  const [isCOAHeadValid, setIsCOAHeadValid] = useState(false);

  const otherFunds = watch('otherFunds');

  const id = router?.query?.['id'];

  const { data: editData } = useGetFundManagementFormStateQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const { mutateAsync: addProfitToFundManagement } = useAddProfitToFundManagementDataMutation();

  const handleSubmit = () => {
    const values = getValues();

    const staffBonusCoaHead = values?.['staffBonus']?.ledgerId as unknown;
    const incomeTaxCoaHead = values?.['incomeTax']?.ledgerId as unknown;

    const filteredValues = {
      destinationLedgerId: values?.['destinationLedger'],
      staffBonus: {
        ledgerId:
          staffBonusCoaHead && typeof staffBonusCoaHead === 'object' && 'value' in staffBonusCoaHead
            ? staffBonusCoaHead?.['value']
            : staffBonusCoaHead,
        percent: values['staffBonus']?.percent,
        amount: values['staffBonus']?.amount,
      },
      incomeTax: {
        ledgerId:
          incomeTaxCoaHead && typeof incomeTaxCoaHead === 'object' && 'value' in incomeTaxCoaHead
            ? incomeTaxCoaHead?.['value']
            : incomeTaxCoaHead,
        percent: values['incomeTax']?.percent,
        amount: values['incomeTax']?.amount,
      },

      others: [
        ...(values?.generalReserveFund?.map((gen) => ({
          ledgerId: gen?.ledgerId,
          amount: gen?.amount,
          percent: gen?.percent,
          tableIndex: 0,
        })) ?? []),
        ...(values?.distributionTable?.map((dis) => ({
          ledgerId: dis?.ledgerId,
          amount: dis?.amount,
          percent: dis?.percent,
          tableIndex: 1,
        })) ?? []),
        ...(values?.otherFunds?.map((oth) => ({
          ledgerId: oth?.ledgerId,
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

  const sourceCOA = watch('sourceCOA');

  const { data: branchFundData, isFetching: isFetchingBranchBalance } =
    useGetCurrentFundAmountQuery(
      {
        head: sourceCOA as unknown as string,
      },
      {
        enabled: isCOAHeadValid,
      }
    );

  const branchFundAmount = branchFundData?.profitToFundManagement?.getCurrentFundAmount;

  // const currentFundError = useMemo(() => {
  //   if (!branchFundAmount) return '';

  //   const errorKeys = findQueryError(branchFundAmount, 'error');

  //   return errorKeys
  //     ? getQueryError(errorKeys?.length ? errorKeys[0] : (errorKeys as unknown as QueryError))
  //     : '';
  // }, [branchFundAmount]);

  const isSubmitDisabled = useMemo(() => {
    if (
      router?.asPath?.includes('/view') &&
      editData?.profitToFundManagement?.get?.record?.state === 'COMPLETED'
    ) {
      return true;
    }

    return remainingProfitAfterOther !== 0;
  }, [otherFunds, editData, router?.asPath, remainingProfitAfterOther]);

  const { data: coaHeadValidityData, isFetching: isCheckingSourceCOA } =
    useCheckSourceCoaValidityQuery(
      {
        head: sourceCOA as unknown as string,
      },
      { enabled: !!sourceCOA }
    );

  useEffect(() => {
    if (
      coaHeadValidityData &&
      !coaHeadValidityData?.profitToFundManagement?.checkCOAValidity?.data?.length
    ) {
      setIsCOAHeadValid(true);
    } else {
      setIsCOAHeadValid(false);
    }
  }, [coaHeadValidityData]);

  const destinationLedger = watch('destinationLedger');

  const { data: accountQueryData } = useGetCoaAccountDetailsQuery(
    {
      id:
        destinationLedger && typeof destinationLedger === 'object'
          ? (destinationLedger as { value: string })?.['value']
          : destinationLedger,
    },
    {
      enabled: !!destinationLedger,
    }
  );

  const destinationLedgerBalance = useMemo(() => {
    if (!destinationLedger) return 0;

    return accountQueryData?.settings?.chartsOfAccount?.coaAccountDetails?.data?.overview
      ?.closingBalance;
  }, [accountQueryData, destinationLedger]);

  return (
    <>
      <FormLayout methods={methods}>
        <FormLayout.Header
          title={`New Profit to Fund Management - ${featureCode?.newProfitToFundManagement}`}
          // closeLink="/others/fund-management/list"
        />

        <FormLayout.Content>
          <FormLayout.Form>
            <Box display={isFetchingBranchBalance || isCheckingSourceCOA ? 'block' : 'none'}>
              <Loader />
            </Box>
            <Box display={isFetchingBranchBalance || isCheckingSourceCOA ? 'none' : 'block'}>
              {/* <LedgerSetup /> */}
              <FormSection header="Ledger Setup">
                <FormLeafCoaHeadSelect name="sourceCOA" label="Source" />

                <FormCOALedgerSelect
                  name="destinationLedger"
                  label="Destination Ledger"
                  currentBranchOnly
                />

                <GridItem colSpan={3}>
                  {sourceCOA && !isCOAHeadValid && !isCheckingSourceCOA && (
                    <Alert
                      title="Source COA Head is not valid. Please select a valid one to proceed."
                      status="error"
                      hideCloseIcon
                    />
                  )}
                </GridItem>
              </FormSection>

              {branchFundAmount &&
                Number(branchFundAmount?.amount?.amount) !== 0 &&
                destinationLedger && <TransferPLtoHO />}

              {destinationLedgerBalance ? (
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
              ) : null}
            </Box>
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
