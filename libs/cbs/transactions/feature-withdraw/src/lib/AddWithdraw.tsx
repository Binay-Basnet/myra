import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  Arrange,
  CashValue,
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useGetMemberListQuery,
  useSetWithdrawDataMutation,
  WithdrawBy,
  WithdrawInput,
  WithdrawPaymentType,
  WithdrawWith,
} from '@coop/cbs/data-access';
import {
  FormCustomSelect,
  MemberSelect,
} from '@coop/cbs/transactions/ui-components';
import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  MemberCard,
  Text,
} from '@coop/shared/ui';

import { Payment } from '../components';

type WithdrawFormInput = Omit<WithdrawInput, 'cash'> & {
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
  withdrawBy?: string;
};

/* eslint-disable-next-line */
export interface AddWithdrawProps {}

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

const withdrawTypes = [
  { label: 'Cheque', value: WithdrawWith.Cheque },
  { label: 'Withdraw Slip', value: WithdrawWith.WithdrawSlip },
];

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

const FINE = '0';

const CURRENT_BALANCE = '2000';

export function AddWithdraw() {
  // const { t } = useTranslation();

  const router = useRouter();

  const methods = useForm<WithdrawFormInput>({
    defaultValues: {
      payment_type: WithdrawPaymentType.Cash,
      cash: { disableDenomination: false },
      withdrawnBy: WithdrawBy.Self,
      withdrawWith: WithdrawWith.Cheque,
    },
  });

  const { watch, resetField, getValues } = methods;

  // const { data } = useGetMemberIndividualDataQuery(
  //   {
  //     id: memberId,
  //   },
  //   {
  //     enabled: !!memberId,
  //   }
  // );

  // const memberData = data?.members?.details?.data;

  const { mutateAsync } = useSetWithdrawDataMutation();

  const memberId = watch('memberId');

  useEffect(() => {
    resetField('accountId');
  }, [memberId]);

  const { data: memberListData } = useGetMemberListQuery(
    {
      first: 100,
      after: '',
      column: 'ID',
      arrange: Arrange.Desc,
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const memberDetail = useMemo(
    () =>
      memberListData?.members?.list?.edges?.find(
        (member) => member?.node?.id === memberId
      ),
    [memberId]
  );

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const accountId = watch('accountId');

  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find(
        (account) => account.node?.id === accountId
      ),
    [accountId]
  );

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const withdrawn = watch('withdrawWith');

  const amountToBeWithdrawn = watch('amount') ?? 0;

  const totalWithdraw = useMemo(
    () =>
      amountToBeWithdrawn ? Number(amountToBeWithdrawn) - Number(FINE) : 0,
    [amountToBeWithdrawn]
  );

  const denominations = watch('cash.denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator, curr) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = Number(totalCashPaid) - Number(totalWithdraw);

  const handleSubmit = () => {
    const values = getValues();

    let filteredValues;

    if (values.payment_type === WithdrawPaymentType.Cash) {
      filteredValues = omit({ ...values }, [
        'bankCheque',
        'file',
        'withdrawBy',
      ]);

      filteredValues['cash'] = {
        ...values['cash'],
        cashPaid: values.cash?.cashPaid as string,
        disableDenomination: Boolean(values.cash?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        denominations:
          filteredValues['cash']?.['denominations']?.map(
            ({ value, quantity }) => ({
              value: cashOptions[value as string],
              quantity,
            })
          ) ?? [],
      };

      mutateAsync({ data: filteredValues as WithdrawInput }).then((res) => {
        if (res?.transaction?.withdraw?.recordId) {
          router.push('/transactions/withdraw/list');
        }
      });
    }

    if (values.payment_type === WithdrawPaymentType.BankCheque) {
      filteredValues = omit({ ...filteredValues }, [
        'cash',
        'file',
        'withdrawBy',
      ]);

      mutateAsync({ data: filteredValues as WithdrawInput }).then((res) => {
        if (res?.transaction?.withdraw?.recordId) {
          router.push('/transactions/withdraw/list');
        }
      });
    }

    // mutate({ data: filteredValues });

    // const proccessedValues = {...values, cash:{...values.cash,denominations:}
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box
          position="sticky"
          top="110px"
          bg="gray.100"
          width="100%"
          zIndex="10"
        >
          <FormHeader
            title={'New Withdraw'}
            closeLink="/transactions/withdraw/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box
                minH="calc(100vh - 170px)"
                display={mode === 0 ? 'flex' : 'none'}
              >
                <Box
                  p="s16"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s24"
                  borderRight="1px"
                  borderColor="border.layout"
                >
                  <MemberSelect
                    name="memberId"
                    label="Member"
                    placeholder="Select Member"
                  />

                  {memberId && (
                    <FormCustomSelect
                      name="accountId"
                      label="Select Withdraw Account"
                      placeholder="Select Account"
                      options={accountListData?.account?.list?.edges?.map(
                        (account) => ({
                          accountInfo: {
                            accountName: account.node?.product.productName,
                            accountId: account.node?.product?.id,
                            accountType: account?.node?.product?.nature
                              ? accountTypes[account?.node?.product?.nature]
                              : '',
                            // balance: account.balance,
                            // fine: account.fine,
                          },
                          value: account.node?.id as string,
                        })
                      )}
                    />
                  )}

                  {memberId && accountId && (
                    <FormSwitchTab
                      name="withdrawWith"
                      label="Withdraw By"
                      options={withdrawTypes}
                    />
                  )}

                  {memberId && accountId && withdrawn === WithdrawWith.Cheque && (
                    <InputGroupContainer>
                      <FormInput
                        name="chequeNo"
                        label="Cheque No"
                        placeholder="Cheque No"
                      />
                    </InputGroupContainer>
                  )}

                  {memberId &&
                    accountId &&
                    withdrawn === WithdrawWith.WithdrawSlip && (
                      <InputGroupContainer>
                        <FormInput
                          name="withdrawSlipNo"
                          label="Withdraw Slip No"
                          placeholder="Withdraw Slip No"
                        />
                      </InputGroupContainer>
                    )}

                  {memberId && accountId && (
                    <FormInput
                      type="number"
                      min={0}
                      name="amount"
                      label="Withdraw Amount"
                      textAlign="right"
                      placeholder="0.0"
                    />
                  )}

                  {memberId && accountId && (
                    <Box
                      bg="background.500"
                      borderRadius="br2"
                      px="s16"
                      py="s18"
                      display="flex"
                      flexDirection="column"
                      gap="s14"
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          Withdraw Amount
                        </Text>

                        <Text
                          fontSize="s3"
                          fontWeight={500}
                          color="neutralColorLight.Gray-80"
                        >
                          {amountToBeWithdrawn}
                        </Text>
                      </Box>

                      {
                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            Fine
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="danger.500"
                          >
                            {`- ${FINE}`}
                          </Text>
                        </Box>
                      }

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          Total Withdraw
                        </Text>

                        <Text
                          fontSize="s3"
                          fontWeight={500}
                          color="neutralColorLight.Gray-80"
                        >
                          {totalWithdraw}
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>

                {memberId && (
                  <Box>
                    <MemberCard
                      memberDetails={{
                        name: memberDetail?.node?.name?.local,
                        avatar: 'https://bit.ly/dan-abramov',
                        memberID: memberDetail?.node?.id,
                        // gender: 'Male',
                        // age: '43',
                        // maritalStatus: 'Unmarried',
                        dateJoined: memberDetail?.node?.dateJoined,
                        // branch: 'Basantapur',
                        phoneNo: memberDetail?.node?.contact,
                        // email: 'ajitkumar.345@gmail.com',
                        // address: 'Basantapur',
                      }}
                      // notice="KYM needs to be updated"
                      // signaturePath="/signature.jpg"
                      citizenshipPath="/citizenship.jpeg"
                      accountInfo={
                        selectedAccount
                          ? {
                              name: selectedAccount?.node?.product?.productName,
                              type: selectedAccount?.node?.product?.nature
                                ? accountTypes[
                                    selectedAccount?.node?.product?.nature
                                  ]
                                : '',
                              ID: selectedAccount?.node?.product?.id,
                              currentBalance: CURRENT_BALANCE,
                              minimumBalance: '1000',
                              guaranteeBalance: '1000',
                              overdrawnBalance: '0',
                              fine: '500',
                              branch: 'Kumaripati',
                              openDate: '2022-04-03',
                              expiryDate: '2022-04-03',
                              lastTransactionDate: '2022-04-03',
                            }
                          : null
                      }
                      viewProfileHandler={() => null}
                      viewAccountTransactionsHandler={() => null}
                    />
                  </Box>
                )}
              </Box>

              <Payment mode={mode} totalWithdraw={totalWithdraw} />
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              status={
                mode === 0 ? (
                  <Box display="flex" gap="s32">
                    <Text
                      fontSize="r1"
                      fontWeight={600}
                      color="neutralColorLight.Gray-50"
                    >
                      {'Total Deposit Amount'}
                    </Text>
                    <Text
                      fontSize="r1"
                      fontWeight={600}
                      color="neutralColorLight.Gray-70"
                    >
                      {totalWithdraw ?? '---'}
                    </Text>
                  </Box>
                ) : (
                  <Button variant="solid" onClick={() => setMode(0)}>
                    Previous
                  </Button>
                )
              }
              mainButtonLabel={mode === 0 ? 'Proceed to Payment' : 'Submit'}
              mainButtonHandler={mode === 0 ? () => setMode(1) : handleSubmit}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default AddWithdraw;
