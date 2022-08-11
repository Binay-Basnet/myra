import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  Arrange,
  CashValue,
  DepositedBy,
  DepositInput,
  DepositPaymentType,
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useGetMemberListQuery,
  useSetDepositDataMutation,
} from '@coop/cbs/data-access';
import {
  FormCustomSelect,
  MemberSelect,
} from '@coop/cbs/transactions/ui-components';
import { FormInput } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  MemberCard,
  Text,
} from '@coop/shared/ui';

import { InstallmentModel, Payment } from '../components';

/* eslint-disable-next-line */
export interface AddDepositProps {}

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
};

const accountTypes = {
  [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
};

// const memberAccountsList = [
//   {
//     accountName: 'Kopila Karnadhar Saving',
//     accountId: '100300010001324',
//     accountType: accountTypes[NatureOfDepositProduct.Mandatory],
//     balance: '1,30,000.43',
//     fine: '40,000.32',
//   },
//   {
//     accountName: 'Youth Saving',
//     accountId: '100300010001325',
//     accountType: accountTypes[NatureOfDepositProduct.VoluntaryOrOptional],
//     balance: '1,30,000.43',
//     fine: '40,000.32',
//   },
//   {
//     accountName: 'Term Saving (Fixed Saving)',
//     accountId: '100300010001326',
//     accountType: accountTypes[NatureOfDepositProduct.TermSavingOrFd],
//     balance: '1,30,000.43',
//   },
//   {
//     accountName: 'Double Payment Saving Scheme',
//     accountId: '100300010001327',
//     accountType: accountTypes[NatureOfDepositProduct.RecurringSaving],
//     balance: '1,30,000.43',
//   },
// ];

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
const REBATE = '0';

export function AddDeposit() {
  // const { t } = useTranslation();

  const router = useRouter();

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

  useEffect(() => {
    reset({ memberId, accountId: '', voucherId: '', amount: '' });
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

  const memberDetail = useMemo(() => {
    return memberListData?.members?.list?.edges?.find(
      (member) => member?.node?.id === memberId
    );
  }, [memberId, memberListData]);

  const accountId = watch('accountId');

  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find(
        (account) => account.node?.product?.id === accountId
      ),
    [accountId]
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const amountToBeDeposited = watch('amount') ?? 0;

  const totalDeposit = useMemo(
    () =>
      amountToBeDeposited
        ? Number(amountToBeDeposited) + Number(FINE) - Number(REBATE)
        : 0,
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
            title={'New Deposit'}
            closeLink="/transactions/deposit/list"
            buttonLabel="Add Bulk Deposit"
            buttonHandler={() => null}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box
                display={mode === 0 ? 'flex' : 'none'}
                minH="calc(100vh - 170px)"
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
                      label="Select Deposit Account"
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
                            // fine: FINE,
                          },
                          value: account.node?.product.id as string,
                        })
                      )}
                    />
                  )}

                  {accountId &&
                    (selectedAccount?.node?.product?.nature ===
                      accountTypes[NatureOfDepositProduct.RecurringSaving] ||
                      selectedAccount?.node?.product?.nature ===
                        NatureOfDepositProduct.Mandatory) && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherId" label="Voucher ID" />

                          <Box></Box>

                          <FormInput
                            name="noOfInstallments"
                            label="No of Installments"
                          />

                          <Box>
                            <Button variant="outline" onClick={handleModalOpen}>
                              View all installments
                            </Button>
                          </Box>
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-70"
                          >
                            Payment Range
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-70"
                          >
                            Payment made from Bhadra to Asoj
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    selectedAccount?.node?.product?.nature ===
                      NatureOfDepositProduct.TermSavingOrFd && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherId" label="Voucher ID" />

                          <FormInput
                            name="amount"
                            type="number"
                            min={0}
                            textAlign="right"
                            label="Amount to be Deposited"
                          />
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-70"
                          >
                            Total amount in the account after deposit
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-70"
                          >
                            Rs. 1,20,000.00
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    selectedAccount?.node?.product?.nature ===
                      NatureOfDepositProduct.VoluntaryOrOptional && (
                      <>
                        <Grid
                          templateColumns="repeat(2, 1fr)"
                          gap="s24"
                          alignItems="flex-end"
                        >
                          <FormInput name="voucherId" label="Voucher ID" />

                          <FormInput
                            name="amount"
                            label="Amount to be Deposited"
                          />
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-70"
                          >
                            Total amount in the account after deposit
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight={400}
                            color="neutralColorLight.Gray-70"
                          >
                            Rs. 1,20,000.00
                          </Text>
                        </Box>
                      </>
                    )}

                  {memberId && accountId && (
                    <>
                      <Divider
                        my="s8"
                        border="1px solid"
                        borderColor="background.500"
                      />

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
                            Deposit Amount
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-80"
                          >
                            {amountToBeDeposited}
                          </Text>
                        </Box>

                        {selectedAccount?.node?.product?.nature !==
                          NatureOfDepositProduct.VoluntaryOrOptional && (
                          <Box display="flex" justifyContent="space-between">
                            <Text
                              fontSize="s3"
                              fontWeight={500}
                              color="gray.600"
                            >
                              Fine
                            </Text>

                            <Text
                              fontSize="s3"
                              fontWeight={500}
                              color="danger.500"
                            >
                              {`+ ${FINE}`}
                            </Text>
                          </Box>
                        )}

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            Rebate
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="success.500"
                          >
                            {`- ${REBATE}`}
                          </Text>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            Total Deposit
                          </Text>

                          <Text
                            fontSize="s3"
                            fontWeight={500}
                            color="neutralColorLight.Gray-80"
                          >
                            {totalDeposit}
                          </Text>
                        </Box>
                      </Box>
                    </>
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
                      notice="KYM needs to be updated"
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
                              currentBalance: '1,04,000.45',
                              minimumBalance: '1000',
                              guaranteeBalance: '1000',
                              overdrawnBalance: '0',
                              fine: FINE,
                              branch: 'Kumaripati',
                              openDate: '2022-04-03',
                              expiryDate: '2022-12-03',
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

              <Payment mode={mode} totalDeposit={Number(totalDeposit)} />
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
                      {totalDeposit ?? '---'}
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

      <InstallmentModel isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

export default AddDeposit;
