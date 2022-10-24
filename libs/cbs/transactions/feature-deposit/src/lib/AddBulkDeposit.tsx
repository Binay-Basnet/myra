import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  CashValue,
  DepositedBy,
  DepositInput,
  DepositPaymentType,
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useSetDepositDataMutation,
} from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

import { Payment } from '../components';

/* eslint-disable-next-line */
export interface AddBulkDepositProps {}

type DepositFormInput = Omit<DepositInput, 'cash'> & {
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
  accounts: {
    accountId: string;
    noOfInstallments: string;
    amount: string;
    rebate: string;
  }[];
};

type DepositAccountTable = {
  accountId: string;
  noOfInstallments: string;
  amount: string;
  rebate: string;
  accountName: string;
  accountType: string;
  accountBalance: string;
  accountFine: string;
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

const REBATE = '0';

export const AddBulkDeposit = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const methods = useForm<DepositFormInput>({
    defaultValues: {
      payment_type: DepositPaymentType.Cash,
      cash: { disableDenomination: false },
      depositedBy: DepositedBy.Self,
    },
  });

  const { watch, reset, getValues } = methods;

  // const { data } = useGetMemberIndividualDataQuery(
  //   {
  //     id: memberId,
  //   },
  //   {
  //     enabled: !!memberId,
  //   }
  // );

  // const memberData = data?.members?.details?.data;

  const memberId = watch('memberId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

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

  const accountListDefaultData = useMemo(
    () =>
      accountListData?.account?.list?.edges?.map((account) => ({
        accountId: account?.node?.id as string,
        noOfInstallments:
          account?.node?.product?.nature === NatureOfDepositProduct.RecurringSaving ? '' : 'N/A',
        amount: '',
        rebate: '',
        accountName: account?.node?.product?.productName ?? '',
        accountType: account?.node?.product?.nature
          ? accountTypes[account?.node?.product?.nature]
          : '',
        accountBalance: account?.node?.balance ?? '',
        accountFine: account?.node?.dues?.fine ?? '',
      })) ?? [],
    [accountListData]
  );

  const accountListSearchOptions = useMemo(
    () =>
      accountListData?.account?.list?.edges?.map((account) => ({
        label: account?.node?.product?.productName as string,
        value: account?.node?.id as string,
      })) ?? [],
    [accountListData]
  );

  useEffect(() => {
    reset({ memberId, accountId: '', voucherId: '', amount: '' });
  }, [memberId]);

  const accountId = watch('accountId');

  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find((account) => account.node?.id === accountId)
        ?.node,
    [accountId]
  );

  const FINE = useMemo(() => selectedAccount?.dues?.fine ?? '0', [selectedAccount]);

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  const amountToBeDeposited = watch('amount') ?? 0;

  const totalDeposit = useMemo(
    () => (amountToBeDeposited ? Number(amountToBeDeposited) + Number(FINE) - Number(REBATE) : 0),
    [amountToBeDeposited]
  );

  const { mutateAsync } = useSetDepositDataMutation();

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const denominations = watch('cash.denominations');

  const denominationTotal = useMemo(
    () =>
      denominations?.reduce(
        (accumulator, curr) => accumulator + Number(curr.amount),
        0 as number
      ) ?? 0,
    [denominations]
  );

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = Number(totalCashPaid) - totalDeposit;

  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...values,
      fine: FINE,
      rebate: REBATE,
    };

    if (values['payment_type'] === DepositPaymentType.Cash) {
      filteredValues = omit({ ...filteredValues }, ['cheque', 'bankVoucher']);
      filteredValues['cash'] = {
        ...values['cash'],
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

    if (values['payment_type'] === DepositPaymentType.BankVoucher) {
      filteredValues = omit({ ...filteredValues }, ['cheque', 'cash']);
    }

    if (values['payment_type'] === DepositPaymentType.Cheque) {
      filteredValues = omit({ ...filteredValues }, ['bankVoucher', 'cash']);
    }

    mutateAsync({ data: filteredValues as DepositInput }).then((res) => {
      if (res?.transaction?.deposit?.recordId) {
        router.push('/transactions/deposit/list');
      }
    });
  };

  const accounts = watch('accounts');

  const accountInfoData = useMemo(
    () =>
      accounts?.map(({ accountId: item, amount }) => {
        const filteredAccount = accountListData?.account?.list?.edges?.find(
          (accountData) => accountData.node?.id === item
        )?.node;

        return {
          accountName: filteredAccount?.product?.productName,
          amount,
          fine: filteredAccount?.dues?.fine,
          rebate: '0',
        };
      }),
    [accounts]
  );

  const totalDepositAmount = useMemo(() => {
    let total = 0;
    accounts?.forEach(({ accountId: item, amount }) => {
      const filteredAccount = accountListData?.account?.list?.edges?.find(
        (accountData) => accountData.node?.id === item
      )?.node;

      total = Number(amount) - (Number(filteredAccount?.dues?.fine) || 0);
    });

    return total;
  }, [accounts]);

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Deposit"
            closeLink="/transactions/deposit/list"
            buttonLabel="Add Deposit"
            buttonHandler={() => router.push('/transactions/deposit/add')}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box display={mode === 0 ? 'flex' : 'none'} minH="calc(100vh - 170px)">
                <Box
                  p="s16"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s24"
                >
                  <FormMemberSelect name="memberId" label="Member" />

                  {memberId && (
                    <MemberCard
                      isInline
                      memberDetails={{
                        name: memberDetailData?.name,
                        avatar: memberDetailData?.profilePicUrl ?? '',
                        memberID: memberDetailData?.id,
                        gender: memberDetailData?.gender,
                        age: memberDetailData?.age,
                        maritalStatus: memberDetailData?.maritalStatus,
                        dateJoined: memberDetailData?.dateJoined,
                        // branch: 'Basantapur',
                        phoneNo: memberDetailData?.contact,
                        email: memberDetailData?.email,
                        address: memberDetailData?.address,
                      }}
                      // notice="KYM needs to be updated"
                      signaturePath={memberSignatureUrl}
                      showSignaturePreview={false}
                      citizenshipPath={memberCitizenshipUrl}
                      accountInfo={
                        selectedAccount
                          ? {
                              name: selectedAccount?.product?.productName,
                              type: selectedAccount?.product?.nature
                                ? accountTypes[selectedAccount?.product?.nature]
                                : '',
                              ID: selectedAccount?.id,
                              currentBalance: selectedAccount?.balance ?? '0',
                              minimumBalance: selectedAccount?.product?.minimumBalance ?? '0',
                              interestAccured: selectedAccount?.interestAccured ?? '0',
                              guaranteeBalance: selectedAccount?.guaranteedAmount ?? '',
                              overdrawnBalance: selectedAccount?.overDrawnBalance ?? '0',
                              fine: FINE,
                              // branch: 'Kumaripati',
                              openDate: selectedAccount?.accountOpenedDate ?? 'N/A',
                              expiryDate: selectedAccount?.accountExpiryDate ?? 'N/A',
                              lastTransactionDate: selectedAccount?.lastTransactionDate ?? 'N/A',
                            }
                          : null
                      }
                      viewProfileHandler={() => null}
                      viewAccountTransactionsHandler={() => null}
                      cardBg="neutralColorLight.Gray-10"
                    />
                  )}

                  {memberId && (
                    <FormEditableTable<DepositAccountTable>
                      name="accounts"
                      columns={[
                        {
                          accessor: 'accountId',
                          header: 'Accounts',
                          cellWidth: 'auto',
                          fieldType: 'search',
                          searchOptions: accountListSearchOptions,
                          cell: (row) => (
                            <Box display="flex" justifyContent="space-between" p="s12" width="100%">
                              <Box display="flex" flexDirection="column" gap="s4">
                                <Text
                                  fontSize="r1"
                                  fontWeight={500}
                                  color="neutralColorLight.Gray-80"
                                >
                                  {row?.accountName}
                                </Text>
                                <Text
                                  fontSize="s3"
                                  fontWeight={500}
                                  color="neutralColorLight.Gray-60"
                                >
                                  {row?.accountId}
                                </Text>
                                <Text
                                  fontSize="s3"
                                  fontWeight={400}
                                  color="neutralColorLight.Gray-60"
                                >
                                  {row?.accountType}
                                </Text>
                              </Box>

                              <Box
                                display="flex"
                                flexDirection="column"
                                gap="s4"
                                alignItems="flex-end"
                              >
                                <Text
                                  fontSize="s3"
                                  fontWeight={500}
                                  color="neutralColorLight.Gray-80"
                                >
                                  {row?.accountBalance}
                                </Text>

                                {row?.accountFine && (
                                  <Text fontSize="s3" fontWeight={500} color="danger.500">
                                    Fine: {row?.accountFine}
                                  </Text>
                                )}
                              </Box>
                            </Box>
                          ),
                        },
                        {
                          accessor: 'noOfInstallments',
                          header: 'No of Installments',
                          isNumeric: true,
                        },
                        {
                          accessor: 'amount',
                          header: 'Amount',
                          isNumeric: true,
                          // accessorFn: (row) =>
                          //   row.quantity
                          //     ? Number(row.value) * Number(row.quantity)
                          //     : '0',
                        },
                        {
                          accessor: 'rebate',
                          header: 'Rebate',
                          isNumeric: true,
                          accessorFn: (row) => row.rebate || 'N/A',
                        },
                      ]}
                      defaultData={accountListDefaultData}
                      searchPlaceholder="Search for a/c name or number"
                      // canDeleteRow={false}
                      // canAddRow={false}
                    />
                  )}

                  {accountInfoData?.length && (
                    <Box
                      bg="background.500"
                      p="s16"
                      display="flex"
                      flexDirection="column"
                      gap="s10"
                    >
                      {accountInfoData?.map((accountInfo) => (
                        <Box display="flex" flexDirection="column" gap="s10">
                          <Box display="flex" justifyContent="space-between">
                            <Text fontSize="s3" fontWeight={500} color="gray.600">
                              {accountInfo?.accountName}
                            </Text>
                            <Text fontSize="s3" fontWeight={500} color="gray.800">
                              {accountInfo?.amount}
                            </Text>
                          </Box>

                          {accountInfo?.fine && (
                            <Box display="flex" justifyContent="space-between">
                              <Text fontSize="s3" fontWeight={500} color="gray.600">
                                Fine
                              </Text>
                              <Text fontSize="s3" fontWeight={500} color="danger.500">
                                {`+ ${accountInfo?.fine}`}
                              </Text>
                            </Box>
                          )}

                          {accountInfo?.rebate && (
                            <Box display="flex" justifyContent="space-between">
                              <Text fontSize="s3" fontWeight={500} color="gray.600">
                                Rebate
                              </Text>
                              <Text fontSize="s3" fontWeight={500} color="success.500">
                                {`- ${accountInfo?.rebate}`}
                              </Text>
                            </Box>
                          )}
                        </Box>
                      ))}

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          Total Deposit
                        </Text>
                        <Text fontSize="s3" fontWeight={500} color="gray.800">
                          {totalDepositAmount}
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>

              <Payment mode={mode} totalDeposit={Number(totalDeposit)} rebate={0} />
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
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                      Total Deposit Amount
                    </Text>
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                      {totalDepositAmount ?? '---'}
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

      {/* <InstallmentModel isOpen={isModalOpen} onClose={handleModalClose} /> */}
    </>
  );
};

export default AddBulkDeposit;
