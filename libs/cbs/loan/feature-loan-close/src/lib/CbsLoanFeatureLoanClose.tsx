import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { Box, Button, MemberCard, ResponseDialog, Text } from '@myra-ui';

import {
  CashValue,
  LoanRepaymentAccountMode,
  LoanRepaymentBankVoucher,
  LoanRepaymentInput,
  LoanRepaymentMethod,
  useGetIndividualMemberDetails,
  useGetLoanCloseDataQuery,
  useGetLoanPreviewQuery,
  useGetMemberLoanAccountsQuery,
  useSetLoanCloseMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormMemberSelect, FormSelect, FormTextArea } from '@coop/shared/form';
import { amountConverter, amountToWordsConverter } from '@coop/shared/utils';

import { LoanProductCard, Payment } from '../components';
import { OutstandingPayments } from '../components/OutStandingPayments';

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
  PAISA: CashValue.Paisa,
};

export const LoanCloseForm = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const queryClient = useQueryClient();

  // const { isOpen, onClose, onToggle } = useDisclosure();

  const [triggerLoanQuery, setTriggerLoanQuery] = useState(false);
  const { mutateAsync } = useSetLoanCloseMutation();

  // const [totalPayableAmount, setTotalPayableAmount] = useState<number>(0);

  // const tableRef = useRef<HTMLTableElement>(null);

  const router = useRouter();

  const [mode, setMode] = useState('0');
  const methods = useForm<LoanRepaymentInputType>({
    defaultValues: {
      paymentMethod: LoanRepaymentMethod?.Cash,
      cash: {
        disableDenomination: true,
        denominations: [
          { value: '1000', quantity: 0, amount: '0' },
          { value: '500', quantity: 0, amount: '0' },
          { value: '100', quantity: 0, amount: '0' },
          { value: '50', quantity: 0, amount: '0' },
          { value: '25', quantity: 0, amount: '0' },
          { value: '20', quantity: 0, amount: '0' },
          { value: '10', quantity: 0, amount: '0' },
          { value: '5', quantity: 0, amount: '0' },
          { value: '2', quantity: 0, amount: '0' },
          { value: '1', quantity: 0, amount: '0' },
          { value: 'PAISA', quantity: 0, amount: '0' },
        ],
      },
    },
  });

  const { getValues, watch } = methods;
  const memberId = watch('memberId');
  const loanAccountId = watch('loanAccountId');
  const isDisableDenomination = watch('cash.disableDenomination');

  // const amountPaid = watch('amountPaid') as unknown;

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
  const loanPreview = useGetLoanCloseDataQuery(
    { loanAccountId: loanAccountId as string },
    {
      enabled: triggerLoanQuery,
    }
  );
  const totalPayableAmount =
    loanPreview?.data?.loanAccount?.remainingPayments?.data?.totalPayableAmount;

  const proceedButtonHandler = () => {
    setMode('1');
  };
  const previousButtonHandler = () => {
    setMode('0');
  };
  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...values,
      amountPaid:
        values.paymentMethod === LoanRepaymentMethod.Cash
          ? String(totalCashPaid)
          : String(totalPayableAmount || '0'),
    };
    // if (values.paymentMethod === LoanRepaymentMethod.LocSaving) {
    //   filteredValues = omit({ ...filteredValues }, ['account', 'bankVoucher', 'cash']);
    // }
    if (values.paymentMethod === LoanRepaymentMethod.Cash) {
      filteredValues = {
        ...omit({ ...filteredValues }, ['account', 'bankVoucher']),
        // amountPaid: String(totalCashPaid),
      };

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
        // amountPaid: filteredValues?.bankVoucher?.amount as string,
        bankVoucher: omit({ ...filteredValues.bankVoucher }, [
          'amount',
        ]) as LoanRepaymentBankVoucher,
      };
    }

    if (values.paymentMethod === LoanRepaymentMethod.Account) {
      filteredValues = {
        ...omit({ ...filteredValues }, ['bankVoucher', 'cash']),
        // amountPaid: totalPayableAmount as string,
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

  useEffect(() => {
    if (loanAccountId) {
      setTriggerLoanQuery(true);
    }
  }, [loanAccountId]);

  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  // const redirectLoanMemberId = router.query['redirectMemberId'];
  const redirectloanAccountId = router.query['loanAccountId'];
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  useEffect(() => {
    if (redirectMemberId && redirectloanAccountId) {
      // methods.setValue('memberId', String(redirectLoanMemberId));
      methods.setValue('loanAccountId', String(redirectloanAccountId));
    }
  }, [redirectloanAccountId, redirectMemberId]);

  // to check if it is LOC type loan for not disabling close button
  const loanDataPreview = useGetLoanPreviewQuery({ id: loanAccountId as string });
  const isLocLoan =
    loanDataPreview?.data?.loanAccount?.loanPreview?.data?.loanDetails?.loanRepaymentScheme;

  // const isLocLoan = true;
  return (
    <FormLayout methods={methods} hasSidebar={Boolean(memberId)}>
      <FormLayout.Header title="Loan Account Close" />
      <FormLayout.Content>
        <FormLayout.Form>
          <Box display="flex" flexDirection="column" w="100%">
            <Box
              flexDirection="column"
              gap="s16"
              p="s20"
              w="100%"
              display={mode === '0' ? 'flex' : 'none'}
            >
              <FormMemberSelect
                isRequired
                name="memberId"
                label="Member"
                isCurrentBranchMember

                // isDisabled={!!redirectMemberId}
              />
              {memberId && (
                <FormSelect
                  name="loanAccountId"
                  label="Loan Account Name"
                  isLoading={isFetching}
                  options={loanAccountOptions}
                />
              )}
              {memberId && loanAccountId && (
                <OutstandingPayments loanAccountId={loanAccountId as string} />
              )}
              {memberId && loanAccountId && <FormTextArea name="closeNotes" />}
            </Box>

            <Box display={mode === '1' ? 'flex' : 'none'}>
              <Payment amountPaid={totalPayableAmount ?? '0'} />
            </Box>
          </Box>
        </FormLayout.Form>
        {memberId && (
          <FormLayout.Sidebar borderPosition="left">
            <Box display="flex" flexDirection="column" gap="s16">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  memberID: memberDetailData?.id,
                  code: memberDetailData?.code,
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

              {loanAccountId && (
                <Box p="s16">
                  <LoanProductCard loanAccountId={loanAccountId} />
                </Box>
              )}
            </Box>
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>
      {mode === '0' && (
        <FormLayout.Footer
          mainButtonLabel="Close Account"
          mainButtonHandler={proceedButtonHandler}
          isMainButtonDisabled={!memberId || !loanAccountId || (!totalPayableAmount && !isLocLoan)}
          dangerButton
        />
      )}
      {mode === '1' && (
        <FormLayout.Footer
          mainButton={
            <ResponseDialog
              onSuccess={() => {
                queryClient.invalidateQueries(['getLoanPreview']);
                router.push(ROUTES.CBS_LOAN_REPAYMENTS_LIST);
              }}
              promise={() => mutateAsync({ data: handleSubmit() })}
              successCardProps={(response) => {
                const result = response?.loanAccount?.close?.record;

                return {
                  type: 'Loan Account Close',
                  total: amountConverter(result?.totalAmount || 0) as string,
                  totalWords: amountToWordsConverter(
                    result?.totalAmount ? Number(result?.totalAmount) : 0
                  ),
                  title: 'Account Close Successful',
                  details: {
                    'Account Id': (
                      <Text fontSize="s3" color="primary.500" fontWeight="600">
                        {result?.accountID}
                      </Text>
                    ),
                    'Account Close Date': localizedDate(result?.closedDate),
                    'Account Name': result?.accountName,
                    'Total Principal': result?.totalPrincipal,
                    'Total Interest': result?.totalInterest,
                    'Total Fine': result?.totalFine,
                    'Payment Mode': result?.paymentMode,
                  },
                  subTitle: 'Account closed successfully. Details of the account is listed below.',
                  dublicate: true,
                  showSignatures: true,
                };
              }}
              errorCardProps={{
                title: 'Loan Close Failed',
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
    </FormLayout>
  );
};
