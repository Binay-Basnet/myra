/* eslint-disable-next-line */
import {
  Box,
  Container,
  FormHeader,
  FormMemberSelect,
  FormAccountSelect,
  DEFAULT_PAGE_SIZE,
  MemberCard,
  FormFooter,
  Divider,
  Text,
  Grid,
  asyncToast,
  Button,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import omit from 'lodash/omit';

import { FormInput, FormRadioGroup, FormTextArea } from '@coop/shared/form';

import { useState } from 'react';
import {
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useSetAccountCloseDataMutation,
  DepositAccountClose,
  AccountCloseReason,
  AccountClosePaymentMode,
  CashValue,
} from '@coop/cbs/data-access';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Payment } from '../component/AccountCloseForm/payment';

export type AccountCloseInput = Omit<DepositAccountClose, 'cash'> & {
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

const radioList = [
  {
    label: 'Death',
    value: AccountCloseReason?.Death,
  },
  {
    label: 'Migration',
    value: AccountCloseReason?.Migration,
  },
  {
    label: 'Personal Reason',
    value: AccountCloseReason?.PersonalReason,
  },
  {
    label: 'Others',
    value: AccountCloseReason?.Other,
  },
];
const loanData = [
  {
    label: 'Loan Amount',
    amount: '200',
  },
];
const interestData = [
  {
    label: 'Interest Payable',
    amount: '200',
  },
  {
    label: 'Interest Receivable',
    amount: '200',
  },
  {
    label: 'Total Interest Tax',
    amount: '200',
  },
];
const OtherChargesData = [
  {
    label: 'Administration Fees',
    amount: '200',
  },
  {
    label: 'Printing Fees',
    amount: '200',
  },
  {
    label: 'Closing Charge',
    amount: '200',
  },
  {
    label: 'Minimum Balance Charge',
    amount: '200',
  },
];
// const switchTabsOptions = [
//   {
//     label: 'Account Transfer',
//     value: AccountClosePaymentMode?.AccountTransfer,
//   },
//   { label: 'Bank Cheque', value: AccountClosePaymentMode?.BankCheque },
//   { label: 'Cash', value: AccountClosePaymentMode?.Cash },
// ];

export function CbsAccountClose() {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm<AccountCloseInput>();
  const [mode, setMode] = useState('0');
  const { watch, getValues } = methods;
  const memberId = watch('memberID');
  const { mutateAsync } = useSetAccountCloseDataMutation();
  // const { data: bankData } = useGetBankListQuery();

  // const bankListArr = bankData?.bank?.bank?.list;

  // const bankList = bankListArr?.map((item) => {
  //   return {
  //     label: item?.name as string,
  //     value: item?.id as string,
  //   };
  // });

  const FINE = '0';
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
  const accountTypes = {
    [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
    [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
    [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
    [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
  };
  const accountId = watch('accountID');
  const radioOther = watch('reason');
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
  const totalDeposit = 650;

  const returnAmount = Number(totalCashPaid) - totalDeposit;
  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find(
        (account) => account.node?.id === accountId
      )?.node,
    [accountId]
  );

  const mainButtonHandlermode0 = () => {
    if (memberId) {
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
    if (values['paymentMode'] === AccountClosePaymentMode.Cash) {
      filteredValues = omit({ ...filteredValues }, [
        'accountTransfer',
        'bankCheque',
      ]);
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

    if (values['paymentMode'] === AccountClosePaymentMode?.BankCheque) {
      filteredValues = omit({ ...filteredValues }, ['accountTransfer', 'cash']);
    }

    if (values['paymentMode'] === AccountClosePaymentMode?.AccountTransfer) {
      filteredValues = omit({ ...filteredValues }, ['bankCheque', 'cash']);
    }
    asyncToast({
      id: 'share-settings-transfer-id',
      msgs: {
        success: 'Account has been deleted',
        loading: 'Deleting Account',
      },
      onSuccess: () => router.push('/settings/general/share/transfer'),
      promise: mutateAsync({
        data: {
          ...(filteredValues as DepositAccountClose),
        },
      }),
    });
  };
  return (
    <Container minW="container.xl" p="0" bg="white">
      <FormProvider {...methods}>
        <form>
          {' '}
          <Box
            position="sticky"
            top="110px"
            bg="gray.100"
            width="100%"
            zIndex="10"
          >
            <FormHeader title={t['accountClose']} />
          </Box>
          <Box display={'flex'} flexDirection="row" minH="calc(100vh - 230px)">
            <Box display={'flex'} flexDirection="column" w="100%">
              <Box
                display={mode === '0' ? 'flex' : 'none'}
                flexDirection={'column'}
                gap="s16"
                p="s20"
                w="100%"
                minH={'100%'}
                borderRight={'1px solid'}
                borderColor="border.layout"
              >
                <FormMemberSelect name="memberID" label="Member" />

                {memberId && (
                  <FormAccountSelect
                    name="accountID"
                    label="Select Deposit Account"
                    placeholder="Select Account"
                    options={accountListData?.account?.list?.edges?.map(
                      (account) => ({
                        accountInfo: {
                          accountName: account.node?.product.productName,
                          accountId: account.node?.id,
                          accountType: account?.node?.product?.nature
                            ? accountTypes[account?.node?.product?.nature]
                            : '',
                          balance: account?.node?.balance ?? '0',
                          fine:
                            account?.node?.product?.nature ===
                              NatureOfDepositProduct.RecurringSaving ||
                            account?.node?.product?.nature ===
                              NatureOfDepositProduct.Mandatory
                              ? FINE
                              : '',
                        },
                        value: account.node?.id as string,
                      })
                    )}
                  />
                )}
                {memberId && accountId && (
                  <Box>
                    {' '}
                    <Divider />
                    <Box
                      display={'flex'}
                      flexDirection="column"
                      gap="s4"
                      pt="s16"
                    >
                      <Text fontSize="s3" fontWeight="600">
                        Reason for closing
                      </Text>
                      <Box display={'flex'} flexDirection="column" gap="s16">
                        <FormRadioGroup
                          name="reason"
                          options={radioList}
                          direction={'row'}
                          pb="s16"
                        />
                        {radioOther === AccountCloseReason?.Other && (
                          <Grid templateColumns={'repeat(3,1fr)'}>
                            <FormInput
                              name="otherReason"
                              label="Specify Reason"
                            />
                          </Grid>
                        )}
                      </Box>
                    </Box>
                    <Divider />
                    <Box display={'flex'} flexDirection="column" gap="s16">
                      <Box
                        display="flex"
                        flexDirection={'column'}
                        gap="s4"
                        pt="s16"
                      >
                        <Text fontSize={'r1'} fontWeight="600">
                          Fees & Charges Summary
                        </Text>
                        <Text fontSize={'s2'} fontWeight="400">
                          All charges and fees must be paid to get approved.
                        </Text>
                      </Box>
                    </Box>
                    <Box bg="background.500" borderRadius="br2" mt="s16">
                      <Box
                        display="flex"
                        flexDirection={'column'}
                        gap="s16"
                        p="s16"
                      >
                        <Box display="flex" flexDirection={'column'} gap="s8">
                          <Text fontWeight={'600'} fontSize="s3">
                            Loan
                          </Text>
                          {loanData?.map(({ label, amount }) => {
                            return (
                              <Box
                                h="36px"
                                display={'flex'}
                                justifyContent="space-between"
                                alignItems={'center'}
                                key={`${label}${amount}`}
                              >
                                <Text fontWeight={'500'} fontSize="s3">
                                  {label}
                                </Text>
                                <Text fontWeight={'600'} fontSize="r1">
                                  {amount}
                                </Text>
                              </Box>
                            );
                          })}
                        </Box>
                        <Box display="flex" flexDirection={'column'} gap="s8">
                          <Text fontWeight={'600'} fontSize="s3">
                            Interest
                          </Text>
                          {interestData?.map(({ label, amount }) => {
                            return (
                              <Box
                                h="36px"
                                display={'flex'}
                                justifyContent="space-between"
                                alignItems={'center'}
                                key={`${label}${amount}`}
                              >
                                <Text fontWeight={'500'} fontSize="s3">
                                  {label}
                                </Text>
                                <Text fontWeight={'600'} fontSize="r1">
                                  {amount}
                                </Text>
                              </Box>
                            );
                          })}
                          <Box
                            h="36px"
                            display={'flex'}
                            justifyContent="space-between"
                            alignItems={'center'}
                          >
                            <Text fontWeight={'500'} fontSize="s3">
                              Adjusted Interest
                            </Text>
                            <Box>
                              {/* <FormInput
                                name="adjustedInput"
                                type={'number'}
                                textAlign="right"
                                size={'xs'}
                                w="160px"
                              /> */}
                            </Box>
                          </Box>
                          <Box
                            h="36px"
                            display={'flex'}
                            justifyContent="space-between"
                            alignItems={'center'}
                          >
                            <Text fontWeight={'500'} fontSize="s3">
                              Net Interest Payable{' '}
                            </Text>
                            <Text fontWeight={'600'} fontSize="r1">
                              250.00
                            </Text>
                          </Box>
                        </Box>
                        <Box display="flex" flexDirection={'column'} gap="s8">
                          <Text fontWeight={'600'} fontSize="s3">
                            Other Charges
                          </Text>
                          {OtherChargesData?.map(({ label, amount }) => {
                            return (
                              <Box
                                h="36px"
                                display={'flex'}
                                justifyContent="space-between"
                                alignItems={'center'}
                                key={`${label}${amount}`}
                              >
                                <Text fontWeight={'500'} fontSize="s3">
                                  {label}
                                </Text>
                                <Text fontWeight={'600'} fontSize="r1">
                                  {amount}
                                </Text>
                              </Box>
                            );
                          })}
                        </Box>
                        <Divider />
                        <Box
                          h="36px"
                          display={'flex'}
                          justifyContent="space-between"
                          alignItems={'center'}
                        >
                          <Text fontWeight={'600'} fontSize="s3">
                            Total Charges
                          </Text>
                          <Text fontWeight={'600'} fontSize="r1">
                            650.00
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                    <Box
                      display={'flex'}
                      flexDirection="column"
                      gap="s4"
                      pt="s16"
                    >
                      <Text fontWeight={'600'} fontSize="s3">
                        Notes{' '}
                      </Text>
                      <FormTextArea name="notes" minH={'180px'} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box
                display={mode === '1' ? 'flex' : 'none'}
                flexDirection={'column'}
                minH={'100%'}
                gap="s16"
                w="100%"
                borderRight={'1px solid'}
                borderColor="border.layout"
              >
                <Payment totalDeposit={650} />
                {/* <FormSwitchTab
                  name={'paymentMode'}
                  options={switchTabsOptions}
                />
                {accountTransferMode ===
                  AccountClosePaymentMode?.AccountTransfer && (
                  <Box display="flex" flexDirection={'column'} gap="s16">
                    <FormSelect
                      name="accountTransfer.destination_account"
                      label="Destination Account"
                    />
                    <Divider />
                    <Box
                      display={'flex'}
                      flexDirection="row"
                      gap="s20"
                      justifyContent={'space-between'}
                    >
                      <FormInput
                        name="accountTransfer.depositedDate"
                        label="Deposited Date"
                        type={'date'}
                      />{' '}
                      <FormInput
                        name="accountTransfer.depositedBy"
                        label="Deposited By"
                      />
                    </Box>
                    <Divider />
                    <Box display={'flex'} flexDirection="column" gap="s4">
                      <Text fontWeight={'600'} fontSize="s3">
                        Notes{' '}
                      </Text>
                      <FormTextArea name="accountTransfer.name" />
                    </Box>
                  </Box>
                )}
                {accountTransferMode ===
                  AccountClosePaymentMode?.BankCheque && (
                  <Box display="flex" flexDirection={'column'} gap="s16">
                    <FormSelect
                      name="bankCheque.bank"
                      label={t['sharePurchaseSelectBank']}
                      placeholder={t['sharePurchaseSelectBank']}
                      options={bankList}
                    />
                    <Divider />
                    <Box
                      display={'flex'}
                      flexDirection="row"
                      gap="s20"
                      justifyContent={'space-between'}
                    >
                      <FormInput
                        name="bankCheque.cheque_no"
                        label="Cheque Number"
                        type={'number'}
                      />{' '}
                      <FormInput
                        name="bankCheque.amount"
                        label="Amount"
                        type="number"
                      />
                    </Box>
                    <Divider />
                    <Box display={'flex'} flexDirection="column" gap="s4">
                      <Text fontWeight={'600'} fontSize="s3">
                        Note
                      </Text>
                      <FormTextArea name="bankCheque.note" />
                    </Box>
                  </Box>
                )} */}
              </Box>
            </Box>
            {memberId && (
              <Box position={'sticky'} top="170px" right={'0'} maxH="500px">
                <MemberCard
                  memberDetails={{
                    name: memberDetailData?.name,
                    avatar: 'https://bit.ly/dan-abramov',
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
                          ID: selectedAccount?.product?.id,
                          currentBalance: selectedAccount?.balance ?? '0',
                          minimumBalance:
                            selectedAccount?.product?.minimumBalance ?? '0',
                          guaranteeBalance: '1000',
                          overdrawnBalance:
                            selectedAccount?.overDrawnBalance ?? '0',
                          fine: FINE,
                          // branch: 'Kumaripati',
                          openDate: selectedAccount?.accountOpenedDate ?? 'N/A',
                          expiryDate:
                            selectedAccount?.accountExpiryDate ?? 'N/A',
                          lastTransactionDate:
                            selectedAccount?.lastTransactionDate ?? 'N/A',
                        }
                      : null
                  }
                  viewProfileHandler={() => null}
                  viewAccountTransactionsHandler={() => null}
                />
              </Box>
            )}
          </Box>
          <Box position={'sticky'} bottom={0}>
            {mode === '0' && (
              <FormFooter
                mainButtonLabel="Close Account"
                dangerButton={true}
                mainButtonHandler={mainButtonHandlermode0}
              />
            )}
            {mode === '1' && (
              <FormFooter
                status={
                  <Button onClick={previousButtonHandler}> Previous</Button>
                }
                mainButtonLabel="Confirm Payment"
                mainButtonHandler={handleSubmit}
              />
            )}
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
}
