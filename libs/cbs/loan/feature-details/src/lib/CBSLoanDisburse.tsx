import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import {
  asyncToast,
  Button,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Icon,
  MemberCard,
  Text,
} from '@myra-ui';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';
import { FormAccountSelect } from '@coop/shared/form';

import {
  LoanDisbursementInput,
  LoanDisbursementMethod,
  useGetCoaBankListQuery,
  useGetIndividualMemberDetails,
  useGetLoanApplicationDetailsQuery,
  useSetDisburseLoanMutation,
} from '@coop/cbs/data-access';
import { LoanListLayout } from '@coop/cbs/loan/layouts';
import { FormInput, FormSelect, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

import CBSLoanDetails from './CbsLoanFeatureDetails';
import {
  LoanDetails,
  LoanDetailsHeader,
  LoanGeneralInformation,
  LoanPaymentSchedule,
  LoanProductCard,
} from '../components';
import { useLoanDetails } from '../hooks/useLoanDetails';

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

export const CBSLoanDisburse = () => {
  const { loanPreview } = useLoanDetails();
  const [mode, setMode] = useState<'details' | 'payment' | 'success'>('details');

  const continueToPayment = () => {
    setMode('payment');
  };

  if (mode === 'success') {
    return <CBSLoanDisburseSuccess />;
  }

  if (mode === 'details') {
    return (
      <LoanListLayout>
        <LoanDetailsHeader title="Loan Application List" />
        <CBSLoanDetails />
        <Box position="fixed" bottom="0" w="calc(100% - 260px)">
          <FormFooter
            mainButtonLabel="Disburse Loan"
            mainButtonHandler={continueToPayment}
            status={`Total Disbursed Amount: ${
              Number(loanPreview?.loanDetails?.totalSanctionedAmount ?? 0) -
              Number(loanPreview?.loanDetails?.totalProcessingChargesValuation ?? 0)
            }`}
          />
        </Box>
      </LoanListLayout>
    );
  }

  if (mode === 'payment') {
    return <CBSLoanDisbursePayment setMode={setMode} />;
  }

  return null;
};

export const CBSLoanDisburseSuccess = () => {
  const router = useRouter();
  return (
    <Container minW="container.lg" p="0" bg="white" pt="50px">
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
      <Box position="sticky" bottom="0">
        <FormFooter
          mainButtonLabel="Done"
          mainButtonHandler={() => router.push('/loan/accounts')}
        />
      </Box>
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

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

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
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="Loan Application" />
      </Box>
      <Box display="flex" flexDirection="row" minH="calc(100vh - 220px)">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          borderRight="1px solid"
          borderColor="border.layout"
          p="s16"
        >
          <FormProvider {...methods}>
            <form>
              <FormSwitchTab label="Disbursement Method" options={paymentModes} name="method" />

              {selectedPaymentMode === LoanDisbursementMethod?.Account && (
                <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                  <GridItem colSpan={2}>
                    <FormAccountSelect
                      name="accountPayment.destinationAccount"
                      label="Destination Account"
                      memberId={memberId}
                      loanLinkedAccounts
                    />
                  </GridItem>
                  <FormInput
                    name="amount"
                    label="Amount"
                    textAlign="right"
                    placeholder="0.00"
                    isDisabled
                  />
                  <Divider />
                  <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                    {' '}
                    <FormTextArea name="accountPayment.note" label="Note" />
                  </GridItem>
                </Grid>
              )}

              {selectedPaymentMode === LoanDisbursementMethod?.BankCheque && (
                <Grid templateColumns="repeat(2,1fr)" gap="s20" pt="s16">
                  {' '}
                  <GridItem colSpan={2}>
                    <FormSelect
                      name="bankChequePayment.bankAccountId"
                      label="Bank Name"
                      options={bankList}
                    />
                  </GridItem>
                  <FormInput
                    name="bankChequePayment.chequeNo"
                    label="Cheque No"
                    placeholder="Cheque No"
                  />
                  <FormInput
                    name="amount"
                    label="Amount"
                    isDisabled
                    textAlign="right"
                    placeholder="0.00"
                  />
                  <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
                    <FormTextArea name="bankChequePayment.note" label="Note" />
                  </GridItem>
                </Grid>
              )}
            </form>
          </FormProvider>
        </Box>

        <Box>
          <Box position="sticky" top="170px" right="0" w="320px" overflowX="hidden">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus,
                  dateJoined: memberDetailData?.dateJoined,
                  phoneNo: memberDetailData?.contact,
                  email: memberDetailData?.email,
                  address: memberDetailData?.address,
                }}
                signaturePath={memberSignatureUrl}
                citizenshipPath={memberCitizenshipUrl}
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
                        {loanPreview?.loanDetails?.totalSanctionedAmount}{' '}
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
                          {charge?.amount}{' '}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                  <Box display="flex" justifyContent="space-between" p="s8" bg="border.layout">
                    <Text fontSize="s3" fontWeight="400">
                      Total Disbursed Amount{' '}
                    </Text>
                    <Text fontSize="s2" fontWeight="600">
                      {Number(loanPreview?.loanDetails?.totalSanctionedAmount) -
                        Number(loanPreview?.loanDetails?.totalProcessingChargesValuation)}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box position="sticky" bottom="0">
        <FormFooter
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
      </Box>
    </Container>
  );
};
