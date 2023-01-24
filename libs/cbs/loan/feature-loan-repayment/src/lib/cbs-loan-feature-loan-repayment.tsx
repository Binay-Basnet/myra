import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  Grid,
  MemberCard,
  Modal,
  ResponseDialog,
  Text,
} from '@myra-ui';

import { SuspiciousTransaction } from '@coop/cbs/components';
import {
  CashValue,
  KymMemberTypesEnum,
  LoanInstallment,
  LoanRepaymentAccountMode,
  LoanRepaymentBankVoucher,
  LoanRepaymentInput,
  LoanRepaymentMethod,
  useGetIndividualMemberDetails,
  useGetLoanPreviewQuery,
  useGetMemberLoanAccountsQuery,
  useSetLoanRepaymentMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { FormAmountInput, FormMemberSelect, FormSelect } from '@coop/shared/form';
import { amountConverter, featureCode } from '@coop/shared/utils';

import { InstallmentData, LoanPaymentScheduleTable, LoanProductCard, Payment } from '../components';

export type LoanRepaymentInputType = Omit<LoanRepaymentInput, 'cash'> & {
  cash?:
    | {
        cashPaid: string;
        disableDenomination: boolean;
        total: string;
        returned_amount: string;
        denominations: { value?: string; quantity?: number; amount?: string }[];
      }
    | undefined
    | null;
};
const cashOptions: Record<string, string> = {
  '1000': CashValue.Cash_1000,
  '500': CashValue.Cash_500,
  '100': CashValue.Cash_100,
  '50': CashValue.Cash_50,
  '25': CashValue.Cash_25,
  '20': CashValue.Cash_20,
  '10': CashValue.Cash_10,
  '5': CashValue.Cash_5,
  '2': CashValue.Cash_2,
  '1': CashValue.Cash_1,
};

export const LoanRepayment = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const queryClient = useQueryClient();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const [triggerLoanQuery, setTriggerLoanQuery] = useState(false);
  const { mutateAsync } = useSetLoanRepaymentMutation();

  const router = useRouter();

  const [mode, setMode] = useState('0');

  const methods = useForm<LoanRepaymentInputType>({
    defaultValues: {
      paymentMethod: LoanRepaymentMethod?.Cash,
      cash: {
        disableDenomination: true,
      },
    },
  });

  const { getValues, watch } = methods;
  const memberId = watch('memberId');
  const loanAccountId = watch('loanAccountId');
  const isDisableDenomination = watch('cash.disableDenomination');
  const amountPaid = watch('amountPaid') as unknown;

  const cashPaid = watch('cash.cashPaid');

  const denominations = watch('cash.denominations');
  // const amountPaid = watch('amountPaid');

  const denominationTotal = useMemo(
    () =>
      denominations?.reduce(
        (accumulator, current) => accumulator + Number(current.amount),
        0 as number
      ) ?? 0,
    [denominations]
  );

  const totalCashPaid = isDisableDenomination ? cashPaid : denominationTotal;
  const returnAmount = watch('cash.returned_amount');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });
  const { data, isFetching } = useGetMemberLoanAccountsQuery(
    {
      memberId,
    },
    { enabled: triggerQuery }
  );
  useEffect(() => {
    if (memberId) {
      setTriggerQuery(true);
    }
  }, [memberId]);

  const memberLoanData = data?.loanAccount?.memberDisbursedLoanAccounts;

  const loanAccountOptions = memberLoanData?.map((mem) => ({
    label: mem?.name as string,
    value: mem?.id as string,
  }));

  const proceedButtonHandler = () => {
    if (amountPaid) {
      setMode('1');
    }
  };
  const previousButtonHandler = () => {
    setMode('0');
  };
  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...values,
    };
    if (values.paymentMethod === LoanRepaymentMethod.Cash) {
      filteredValues = omit({ ...filteredValues }, ['account', 'bankVoucher']);
      filteredValues.cash = {
        ...values.cash,
        cashPaid: values.cash?.cashPaid as string,
        disableDenomination: Boolean(values.cash?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        denominations:
          values.cash?.denominations?.map(({ value, quantity }) => ({
            value: cashOptions[value as string],
            quantity,
          })) ?? [],
      };
    }

    if (values.paymentMethod === LoanRepaymentMethod.BankVoucher) {
      filteredValues = {
        ...omit({ ...filteredValues }, ['account', 'cash']),
        bankVoucher: omit({ ...filteredValues.bankVoucher }, [
          'amount',
        ]) as LoanRepaymentBankVoucher,
      };
    }

    if (values.paymentMethod === LoanRepaymentMethod.Account) {
      filteredValues = {
        ...omit({ ...filteredValues }, ['bankVoucher', 'cash']),
        account: omit({ ...filteredValues.account }, ['amount']) as LoanRepaymentAccountMode,
      };
    }
    // asyncToast({
    //   id: 'share-settings-transfer-id',
    //   msgs: {
    //     success: 'Loan has been Repayed',
    //     loading: 'Repaying Loan',
    //   },
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(['getLoanPreview']);
    //     router.push('/loan/accounts');
    //   },
    //   promise: mutateAsync({
    //     data: {
    //       ...(filteredValues as LoanRepaymentInput),
    //     },
    //   }),
    // });
    return filteredValues as LoanRepaymentInput;
  };
  const loanPreview = useGetLoanPreviewQuery(
    {
      id: loanAccountId,
    },
    {
      enabled: triggerLoanQuery,
    }
  );

  const loanData = loanPreview?.data?.loanAccount?.loanPreview?.data;
  const loanTry = loanData?.paymentSchedule?.installments;
  const nextInstallmentNumber = loanData?.repaymentDetails?.nextInstallmentNo as number;
  const loanPaymentSchedule =
    loanTry?.map((value, index) => ({
      installmentDate: value?.installmentDate,
      installmentNo: value?.installmentNo,
      interest: value?.interest,
      payment: value?.payment,
      principal: value?.principal,
      remainingPrincipal: value?.remainingPrincipal,
      paid: nextInstallmentNumber > index + 1,
    })) || [];
  const loanPaymentScheduleSplice =
    nextInstallmentNumber > 5
      ? loanPaymentSchedule?.slice(nextInstallmentNumber - 5, nextInstallmentNumber + 5) || []
      : loanPaymentSchedule?.slice(0, 11) || [];

  useEffect(() => {
    if (loanAccountId) {
      setTriggerLoanQuery(true);
    }
  }, [loanAccountId]);

  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  const redirectLoanMemberId = router.query['redirectMemberId'];
  const redirectloanAccountId = router.query['loanAccountId'];
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  useEffect(() => {
    if (redirectLoanMemberId && redirectloanAccountId) {
      methods.setValue('memberId', String(redirectLoanMemberId));
      methods.setValue('loanAccountId', String(redirectloanAccountId));
    }
  }, [redirectMemberId, redirectLoanMemberId]);

  const isSuspicious = watch('isSuspicious');

  const suspicionRemarks = watch('suspicionRemarks');

  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="0" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title={`New Loan Repayment - ${featureCode.newLoanRepayment} `} />
      </Box>
      <Box display="flex" flexDirection="row" minH="calc(100vh - 230px)">
        <Box
          display="flex"
          flexDirection="column"
          w="100%"
          borderRight="1px solid"
          borderColor="border.layout"
        >
          <FormProvider {...methods}>
            <form>
              <Box
                flexDirection="column"
                gap="s16"
                p="s20"
                w="100%"
                display={mode === '0' ? 'flex' : 'none'}
              >
                <FormMemberSelect isRequired name="memberId" label="Member" />
                {memberId && (
                  <FormSelect
                    name="loanAccountId"
                    label="Loan Account Name"
                    isLoading={isFetching}
                    options={loanAccountOptions}
                  />
                )}
                {memberId && loanAccountId && loanPaymentScheduleSplice && loanPaymentSchedule && (
                  <Box display="flex" flexDirection="column" gap="s16" w="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontSize="r1" fontWeight="600">
                        Loan Payment Schedule
                      </Text>
                      <Button variant="ghost" onClick={onToggle}>
                        View full schedule{' '}
                      </Button>
                    </Box>
                    <LoanPaymentScheduleTable
                      data={loanPaymentScheduleSplice as LoanInstallment[]}
                      nextInstallmentNumber={nextInstallmentNumber}
                      total={loanData?.paymentSchedule?.total as string}
                      totalInterest={loanData?.paymentSchedule?.totalInterest ?? 0}
                      totalPrincipal={loanData?.paymentSchedule?.totalPrincipal ?? 0}
                    />
                    <Modal
                      onClose={onClose}
                      open={isOpen}
                      title="Payment Schedule"
                      scrollBehavior="inside"
                      blockScrollOnMount
                      width="4xl"
                    >
                      <LoanPaymentScheduleTable
                        data={loanPaymentSchedule as LoanInstallment[]}
                        nextInstallmentNumber={nextInstallmentNumber}
                        total={loanData?.paymentSchedule?.total as string}
                        totalInterest={loanData?.paymentSchedule?.totalInterest ?? 0}
                        totalPrincipal={loanData?.paymentSchedule?.totalPrincipal ?? 0}
                      />
                    </Modal>
                    <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
                      <FormAmountInput isRequired name="amountPaid" label="Amount to Pay" />
                    </Grid>

                    {memberDetailData?.type === KymMemberTypesEnum.Individual && (
                      <SuspiciousTransaction />
                    )}

                    <Box mt="s20">
                      <InstallmentData loanAccountId={loanAccountId} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box display={mode === '1' ? 'flex' : 'none'}>
                <Payment loanTotal={amountPaid as string} />
              </Box>
            </form>
          </FormProvider>
        </Box>

        {memberId && (
          <Box position="sticky" top="170px" right="0" w="320px">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  code: memberDetailData?.code,
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
            </Box>
            {loanAccountId && (
              <Box p="s16">
                <LoanProductCard loanAccountId={loanAccountId} />
              </Box>
            )}
          </Box>
        )}
      </Box>
      <Box position="sticky" bottom={0}>
        <Box>
          {mode === '0' && (
            <FormFooter
              mainButtonLabel="Proceed Transactions"
              mainButtonHandler={proceedButtonHandler}
              isMainButtonDisabled={Boolean(!amountPaid || (isSuspicious && !suspicionRemarks))}
            />
          )}
          {mode === '1' && (
            <FormFooter
              mainButton={
                <ResponseDialog
                  onSuccess={() => {
                    queryClient.invalidateQueries(['getLoanPreview']);
                    router.push(ROUTES.CBS_LOAN_REPAYMENTS_LIST);
                  }}
                  promise={() => mutateAsync({ data: handleSubmit() })}
                  successCardProps={(response) => {
                    const result = response?.loanAccount?.repayment?.record;

                    return {
                      type: 'Loan Repayment',
                      total: amountConverter(result?.totalAmount || 0) as string,
                      title: 'Loan Repayment Successful',
                      details: {
                        'Loan Repayment Id': (
                          <Text fontSize="s3" color="primary.500" fontWeight="600">
                            {result?.transactionId}
                          </Text>
                        ),
                        Date: localizedDate(result?.date),
                        'Installment No': result?.installmentNo,
                        'Principal Amount': result?.principalAmount,
                        'Interest Amount': result?.interestAmount,
                        'Penalty Amount': result?.penaltyAmount,
                        'Rebate Amount': result?.rebateAmount,

                        'Payment Mode': result?.paymentMethod,
                      },
                      subTitle:
                        'Loan amount has been repayed successfully. Details of the transaction is listed below.',
                      meta: {
                        memberId: result?.memberId,
                        member: result?.memberName?.local,
                        accountId: result?.accountId,
                        accountName: result?.accountName,
                      },
                    };
                  }}
                  errorCardProps={{
                    title: 'Loan Repayment Failed',
                  }}
                >
                  <Button width="160px">Confirm Payment</Button>
                </ResponseDialog>
              }
              status={<Button onClick={previousButtonHandler}> Previous</Button>}
              mainButtonLabel="Confirm Payment"
              mainButtonHandler={handleSubmit}
            />
          )}
        </Box>
      </Box>
    </Container>
  );
};
