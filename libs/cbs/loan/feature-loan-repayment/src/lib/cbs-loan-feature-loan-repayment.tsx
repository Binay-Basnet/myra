import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import omit from 'lodash/omit';

import {
  CashValue,
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
import { FormInput, FormSelect } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  ChakraModal,
  Container,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  Grid,
  MemberCard,
  Text,
} from '@myra-ui';

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
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [triggerLoanQuery, setTriggerLoanQuery] = useState(false);
  const { mutateAsync } = useSetLoanRepaymentMutation();

  const router = useRouter();

  const [mode, setMode] = useState('0');

  const methods = useForm<LoanRepaymentInputType>({
    defaultValues: {
      paymentMethod: LoanRepaymentMethod?.Cash,
    },
  });

  const { getValues, watch } = methods;
  const memberId = watch('memberId');
  const loanAccountId = watch('loanAccountId');
  const isDisableDenomination = watch('cash.disableDenomination');
  const amountPaid = watch('amountPaid') as unknown;

  const cashPaid = watch('cash.cashPaid');

  const denominations = watch('cash.denominations');

  const denominationTotal = useMemo(
    () =>
      denominations?.reduce(
        (accumulator, current) => accumulator + Number(current.amount),
        0 as number
      ) ?? 0,
    [denominations]
  );

  const totalCashPaid = isDisableDenomination ? cashPaid : denominationTotal;
  const returnAmount = Number(totalCashPaid) - Number(amountPaid);

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
    asyncToast({
      id: 'share-settings-transfer-id',
      msgs: {
        success: 'Loan has been Repayed',
        loading: 'Repaying Loan',
      },
      onSuccess: () => router.push('/loan/accounts'),
      promise: mutateAsync({
        data: {
          ...(filteredValues as LoanRepaymentInput),
        },
      }),
    });
  };
  const loanPreview = useGetLoanPreviewQuery(
    {
      id: loanAccountId,
    },
    {
      enabled: triggerLoanQuery,
    }
  );

  const loanTotal =
    loanPreview?.data?.loanAccount?.loanPreview?.data?.repaymentDetails?.totalInstallmentAmount;
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
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);
  return (
    <Container minW="container.xl" p="0" bg="white">
      <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
        <FormHeader title="Loan Repayment" />
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
                <FormMemberSelect name="memberId" label="Member" />
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
                      total={loanData?.paymentSchedule?.total as string}
                    />
                    <ChakraModal
                      onClose={onClose}
                      open={isOpen}
                      title="Payment Schedule"
                      scrollBehavior="inside"
                      blockScrollOnMount
                      width="3xl"
                    >
                      <LoanPaymentScheduleTable
                        data={loanPaymentSchedule as LoanInstallment[]}
                        total={loanData?.paymentSchedule?.total as string}
                      />
                    </ChakraModal>
                    <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
                      <FormInput name="amountPaid" label="Amount to Pay" textAlign="right" />
                    </Grid>
                    <Box mt="s20">
                      <InstallmentData loanAccountId={loanAccountId} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box display={mode === '1' ? 'flex' : 'none'}>
                <Payment loanTotal={loanTotal as string} totalDeposit={amountPaid as number} />
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
                showSignaturePreview={false}
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
              mainButtonLabel="Proceed to Payment"
              mainButtonHandler={proceedButtonHandler}
              isMainButtonDisabled={!amountPaid}
            />
          )}
          {mode === '1' && (
            <FormFooter
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
