import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import {
  asyncToast,
  Button,
  Container,
  Divider,
  FormFooter,
  Grid,
  GridItem,
  Icon,
  MemberCard,
  Text,
} from '@myra-ui';

import { BPMRequestsSidebarLayout } from '@coop/bpm/ui-layouts';
import {
  LoanDisbursementInput,
  LoanDisbursementMethod,
  useGetIndividualMemberDetails,
  useGetLoanApplicationDetailsQuery,
  useSetDisburseLoanMutation,
} from '@coop/cbs/data-access';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { ROUTES } from '@coop/cbs/utils';
import {
  FormAccountSelect,
  FormAmountInput,
  FormBankSelect,
  FormInput,
  FormLayout,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import CBSLoanDetails from './CbsLoanFeatureDetails';
import LoanApplicationPrintContent from './LoanApplicationPrintContent';
import {
  LoanDetails,
  LoanDetailsHeader,
  LoanGeneralInformation,
  LoanPaymentSchedule,
  LoanProductCard,
} from '../components';
import { useLoanDetails } from '../hooks/useLoanDetails';
import { IoMdPrint } from 'react-icons/io';

const paymentModes = [
  {
    label: 'Account Transfer',
    value: LoanDisbursementMethod?.Account,
  },
  {
    label: 'Bank Cheque',
    value: LoanDisbursementMethod?.BankCheque,
  },
];

const RequiredSideBarLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;
  const router = useRouter();
  const isBpm = router?.pathname?.includes('bpm');
  if (isBpm) {
    return <BPMRequestsSidebarLayout>{children}</BPMRequestsSidebarLayout>;
  }
  return <LoanListLayout>{children}</LoanListLayout>;
};

export const CBSLoanDisburse = () => {
  const router = useRouter();
  const { loanPreview } = useLoanDetails();
  const [mode, setMode] = useState<'details' | 'payment' | 'success'>('details');

  const printComponentRef = useRef<HTMLInputElement>(null);

  const continueToPayment = () => {
    setMode('payment');
  };

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => {},
    documentTitle: `${router.query?.['id']}.pdf`,
  });

  if (mode === 'success') {
    return <CBSLoanDisburseSuccess />;
  }

  if (mode === 'details') {
    return (
      <>
        <RequiredSideBarLayout>
          <LoanDetailsHeader
            title="Loan Application List"
            options={[{ label: 'Print ', handler: () => handlePrint() }]}
          />
          <CBSLoanDetails />
          <Box position="fixed" bottom="0" zIndex={10} w="calc(100% - 260px)">
            <FormFooter
              mainButtonLabel="Disburse Loan"
              mainButtonHandler={continueToPayment}
              status={`Total Disbursed Amount: ${
                Number(loanPreview?.loanDetails?.totalSanctionedAmount ?? 0) -
                Number(loanPreview?.loanDetails?.totalProcessingChargesValuation ?? 0)
              }`}
            />
          </Box>
        </RequiredSideBarLayout>
        <LoanApplicationPrintContent ref={printComponentRef} />
      </>
    );
  }

  if (mode === 'payment') {
    return <CBSLoanDisbursePayment setMode={setMode} />;
  }

  return null;
};

export const CBSLoanDisburseSuccess = () => {
  const router = useRouter();
  const printComponentRef = useRef<HTMLInputElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    onAfterPrint: () => {},
    documentTitle: `${router.query?.['id']}.pdf`,
  });
  
  return (
    <Container minW="container.lg" p="0" bg="white" pt="3.125rem">
      <Box display="flex" flexDirection="column" gap="s32" p="s16" minH="calc(100vh - 220px)">
        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap="s16">
          <Icon as={AiFillCheckCircle} size="xl" color="primary.500" />
          <Text fontSize="r2" color="gray.800" fontWeight="600">
            Loan Disbursed Successfully
          </Text>
          <Text fontSize="r1" color="gray.800">
            Loan Account {router.query['id']} has been disbursed successfully.
          </Text>
        </Box>
        <LoanGeneralInformation />
        <LoanDetails />
        <LoanPaymentSchedule />
      </Box>
      <Box position="sticky" bottom="0" zIndex={10}>
        <FormFooter
          mainButtonLabel="Done"
          mainButtonHandler={() => router.push(ROUTES.CBS_LOAN_ACCOUNTS_LIST)}
          draftButton={
              <Button onClick={handlePrint} variant="ghost" shade="neutral">
                <Icon as={IoMdPrint} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  Print
                </Text>
              </Button>
            }
        />
      </Box>
      <LoanApplicationPrintContent ref={printComponentRef} />
    </Container>
  );
};

interface IProps {
  setMode: Dispatch<SetStateAction<'details' | 'payment' | 'success'>>;
}

export const CBSLoanDisbursePayment = ({ setMode }: IProps) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const methods = useForm<LoanDisbursementInput>({
    defaultValues: {
      method: LoanDisbursementMethod?.Account,
    },
  });
  const { watch, getValues, setValue } = methods;

  const selectedPaymentMode = watch('method');
  const { mutateAsync } = useSetDisburseLoanMutation();
  const id = String(router?.query?.['id']);

  const disburseLoan = () => {
    const values = getValues();
    let filteredValues = {
      ...values,
    };
    if (values.method === LoanDisbursementMethod?.Account) {
      filteredValues = omit({ ...filteredValues }, ['bankChequePayment']);
    }

    if (values.method === LoanDisbursementMethod?.BankCheque) {
      filteredValues = omit({ ...filteredValues }, ['accountPayment']);
    }
    asyncToast({
      id: 'loan-account-disperse-id',
      msgs: {
        success: 'Loan has been Disbursed',
        loading: 'Disbursing Loan',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanList']);

        setMode('success');
      },
      promise: mutateAsync({
        loanAccountId: id,
        data: {
          ...(filteredValues as LoanDisbursementInput),
        },
      }),
    });
    // setMode('details');
  };

  const previousButtonHandler = () => {
    setMode('details');
  };

  const { loanPreview } = useLoanDetails();
  const memberId = loanPreview?.memberId as string;
  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

  const productId = loanPreview?.productId as string;
  const totalDisbursedAmount =
    Number(loanPreview?.loanDetails?.totalSanctionedAmount) -
    Number(loanPreview?.loanDetails?.totalProcessingChargesValuation);

  const totalDisbursedAmountUnknown = totalDisbursedAmount as unknown;
  const totalDisbursedAmountString = String(totalDisbursedAmountUnknown);

  useEffect(() => {
    setValue('amount', totalDisbursedAmountString);
  }, [totalDisbursedAmountString]);

  const { data: loanData } = useGetLoanApplicationDetailsQuery({ id: id as string });
  const linkedAccountId = loanData?.loanAccount?.formState?.data?.linkedAccountId;
  useEffect(() => {
    methods.setValue('accountPayment.destinationAccount', String(linkedAccountId));
  }, [linkedAccountId]);

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Loan Application" />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box p="s16">
            <FormSwitchTab label="Disbursement Method" options={paymentModes} name="method" />

            {selectedPaymentMode === LoanDisbursementMethod?.Account && (
              <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                <GridItem colSpan={2}>
                  <FormAccountSelect
                    name="accountPayment.destinationAccount"
                    label="Destination Account"
                    memberId={memberId}
                    isDisabled
                    isLinkedAccounts
                  />
                </GridItem>
                <FormAmountInput name="amount" label="Amount" isDisabled />
                <GridItem colSpan={2}>
                  <Divider />
                </GridItem>
                <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                  <FormTextArea name="accountPayment.note" label="Note" />
                </GridItem>
              </Grid>
            )}

            {selectedPaymentMode === LoanDisbursementMethod?.BankCheque && (
              <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                <GridItem colSpan={2}>
                  <FormBankSelect
                    name="bankChequePayment.bankAccountId"
                    label="Bank Name"
                    currentBranchOnly
                  />
                </GridItem>
                <FormInput
                  name="bankChequePayment.chequeNo"
                  label="Cheque No"
                  placeholder="Cheque No"
                />
                <FormAmountInput name="amount" label="Amount" isDisabled />
                <GridItem colSpan={2}>
                  <Divider />
                </GridItem>
                <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                  <FormTextArea name="bankChequePayment.note" label="Note" />
                </GridItem>
              </Grid>
            )}
          </Box>
        </FormLayout.Form>

        <FormLayout.Sidebar>
          <Box display="flex" flexDirection="column" gap="s16">
            <MemberCard
              memberDetails={{
                name: memberDetailData?.name,
                avatar: memberDetailData?.profilePicUrl ?? '',
                memberID: memberDetailData?.id,
                gender: memberDetailData?.gender,
                age: memberDetailData?.age,
                maritalStatus: memberDetailData?.maritalStatus as string,
                dateJoined: memberDetailData?.dateJoined,
                phoneNo: memberDetailData?.contact,
                email: memberDetailData?.email,
                address: memberDetailData?.address,
              }}
              signaturePath={memberSignatureUrl as string}
              citizenshipPath={memberCitizenshipUrl as string}
            />
            <Box p="s16" display="flex" flexDirection="column" gap="s16">
              <LoanProductCard productId={productId} />
              <Box border="1px solid" borderColor="border.layout" borderRadius="br2">
                <Box p="s8" display="flex" flexDirection="column" gap="s8">
                  <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Text fontSize="s3" fontWeight="400">
                      Applied Loan Amount
                    </Text>
                    <Text fontSize="s2" fontWeight="600">
                      {amountConverter(loanPreview?.loanDetails?.totalSanctionedAmount || 0)}
                    </Text>
                  </Box>
                  {loanPreview?.loanDetails?.processingCharges?.map((charge) => (
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      key={charge?.name}
                    >
                      <Text fontSize="s3" fontWeight="400">
                        {charge?.name}
                      </Text>
                      <Text fontSize="s2" fontWeight="600" color="danger.500">
                        {amountConverter(charge?.amount)}
                      </Text>
                    </Box>
                  ))}
                </Box>
                <Box display="flex" justifyContent="space-between" p="s8" bg="border.layout">
                  <Text fontSize="s3" fontWeight="400">
                    Total Disbursed Amount
                  </Text>
                  <Text fontSize="s2" fontWeight="600">
                    {amountConverter(
                      Number(loanPreview?.loanDetails?.totalSanctionedAmount) -
                        Number(loanPreview?.loanDetails?.totalProcessingChargesValuation)
                    )}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </FormLayout.Sidebar>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Disburse Loan"
        mainButtonHandler={disburseLoan}
        status={
          <Button
            onClick={previousButtonHandler}
            variant="outline"
            leftIcon={<IoChevronBackOutline />}
          >
            Previous
          </Button>
        }
      />
    </FormLayout>
  );
};
