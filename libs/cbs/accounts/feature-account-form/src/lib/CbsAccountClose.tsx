import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import rhtoast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  AccountClosePaymentMode,
  AccountCloseReason,
  CashValue,
  DepositAccountClose,
  NatureOfDepositProduct,
  ObjState,
  useGetAccountTableListQuery,
  useSetAccountCloseDataMutation,
} from '@coop/cbs/data-access';
import { FormAmountInput, FormInput, FormRadioGroup, FormTextArea } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  Container,
  Divider,
  findError,
  FormAccountSelect,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  getError,
  Grid,
  MemberCard,
  Text,
  toast,
} from '@coop/shared/ui';
import { featureCode, useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

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

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

type CustomAccountCloseInput = Omit<AccountCloseInput, 'serviceCharge'> & {
  serviceCharge?: Record<string, string>;
};

export const CbsAccountClose = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const redirectPath = router.query['redirect'];
  const id = String(router?.query?.['memberId']);
  const redirectAccountId = String(router?.query?.['accountId']);

  const methods = useForm<CustomAccountCloseInput>({
    defaultValues: { paymentMode: AccountClosePaymentMode.AccountTransfer },
  });

  const { watch, getValues, setValue, reset } = methods;

  const [mode, setMode] = useState('0');

  const memberId = watch('memberID');

  const { mutateAsync, mutate } = useSetAccountCloseDataMutation();

  const [totalCharge, setTotalCharge] = useState<number>(0);

  const [totalDeposit, setTotalDeposit] = useState<number>(0);

  const FINE = '0';
  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });
  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: -1,
        after: '',
      },
      filter: { memberId, objState: ObjState.Active },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const accountId = watch('accountID');
  const radioOther = watch('reason');
  const isDisableDenomination = watch('cash.disableDenomination');

  useEffect(() => {
    reset({ memberID: memberId, accountID: '', reason: undefined });
  }, [memberId]);

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

  const selectedPaymentMode = watch('paymentMode');

  const totalCashPaid = Number(isDisableDenomination ? cashPaid : denominationTotal);

  const returnAmount =
    selectedPaymentMode === AccountClosePaymentMode.Cash
      ? totalCashPaid - Math.floor(totalDeposit)
      : totalCashPaid - totalDeposit;

  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find((account) => account.node?.id === accountId)
        ?.node,
    [accountId]
  );

  const adjustedInterest = watch('adjustedInterest');

  const netInterestPayable = useMemo(
    () =>
      Number(selectedAccount?.interestAccured ?? 0) -
        Number(selectedAccount?.interestTax ?? 0) -
        Number(adjustedInterest ?? 0) ?? 0,
    [adjustedInterest, selectedAccount?.interestAccured, selectedAccount?.interestTax]
  );

  useEffect(() => {
    let tempCharge = 0;
    selectedAccount?.product?.accountClosingCharge?.forEach(({ serviceName, amount }) => {
      setValue(`serviceCharge.${serviceName}`, amount);

      tempCharge += Number(amount ?? 0);
    });

    setTotalCharge(tempCharge);
  }, [JSON.stringify(selectedAccount)]);

  const serviceCharge = watch('serviceCharge');

  useEffect(() => {
    if (serviceCharge) {
      setTotalCharge(
        Object.values(serviceCharge).reduce((sum, amount) => sum + Number(amount), 0) ?? 0
      );
    }
  }, [JSON.stringify(serviceCharge)]);

  const mainButtonHandlermode0 = () => {
    const values = getValues();

    const filteredValues = {
      ...omit({ ...values }, ['paymentMode', 'accountTransfer', 'bankCheque', 'cash']),
      serviceCharge: values.serviceCharge
        ? Object.keys(values.serviceCharge).map((serviceName) => ({
            name: serviceName,
            amount: values?.serviceCharge?.[serviceName],
          }))
        : [],
    };

    const toastId = toast({
      id: 'verifying-account-close-charges-loading',
      type: 'success',
      state: 'loading',
      message: 'Verifying account charges',
    });

    mutate(
      {
        data: filteredValues,
      },
      {
        onSuccess: (response) => {
          if (response) {
            toastId && rhtoast.dismiss(toastId);
            if ('error' in response) {
              toast({
                id: 'verifying-account-close-charges',
                type: 'error',
                message:
                  (response as unknown as { error: { message: string }[] }).error[0].message ??
                  'Something Went Wrong!!',
              });
            } else {
              const errorKeys = findError(response, 'error');

              if (errorKeys[0]) {
                const error = getError(errorKeys[0]);

                if (typeof error === 'string') {
                  toast({
                    id: 'verifying-account-close-charges-error',
                    type: 'error',
                    message: error,
                  });
                } else {
                  // onError && onError(errorKeys[0]);
                  toast({
                    id: 'verifying-account-close-charges-error',
                    type: 'error',
                    message: 'Some fields are empty or invalid',
                  });
                }
              }

              if (!errorKeys[0]) {
                // if amount to be paid is 0, close account else send to payment page
                if (Number(response?.account?.close?.calculatedAmount)) {
                  setTotalDeposit(Number(response?.account?.close?.calculatedAmount));
                  setMode('1');
                } else {
                  toast({
                    id: 'verifying-account-close-charges-success',
                    type: 'success',
                    message: 'Account closed',
                  });

                  if (redirectPath) {
                    router.push(String(redirectPath));
                    queryClient.invalidateQueries('getAccountInactiveCheck');
                  } else {
                    router.push('/accounts/account-close');
                  }
                }
              }
            }
          }
        },
      }
    );
  };

  const previousButtonHandler = () => {
    setMode('0');
  };

  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...values,
      serviceCharge: values.serviceCharge
        ? Object.keys(values.serviceCharge).map((serviceName) => ({
            name: serviceName,
            amount: values?.serviceCharge?.[serviceName],
          }))
        : [],
    };

    if (values.paymentMode === AccountClosePaymentMode.Cash) {
      filteredValues = omit({ ...filteredValues }, ['accountTransfer', 'bankCheque']);
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

    if (values.paymentMode === AccountClosePaymentMode?.BankCheque) {
      filteredValues = omit({ ...filteredValues }, ['accountTransfer', 'cash']);
    }

    if (values.paymentMode === AccountClosePaymentMode?.AccountTransfer) {
      filteredValues = omit({ ...filteredValues }, ['bankCheque', 'cash']);
    }
    asyncToast({
      id: 'account-close-final-payment',
      msgs: {
        success: 'Account has been closed',
        loading: 'Closing Account',
      },
      promise: mutateAsync({
        data: {
          ...(filteredValues as DepositAccountClose),
        },
      }),
      onSuccess: () => {
        if (redirectPath) {
          router.push(String(redirectPath));
          queryClient.invalidateQueries('getAccountInactiveCheck');
        } else {
          router.push('/accounts/account-close');
        }
      },
    });
  };

  useEffect(() => {
    if (id) {
      methods.setValue('memberID', String(id));
    }
  }, [id]);

  useEffect(() => {
    if (memberId) {
      methods.setValue('accountID', String(redirectAccountId));
    }
  }, [redirectAccountId, memberId]);

  return (
    <Container minW="container.xl" p="0" bg="white">
      <FormProvider {...methods}>
        <form>
          {' '}
          <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
            <FormHeader title={`${t['accountClose']} - ${featureCode?.newAccountClose}`} />
          </Box>
          <Box display="flex" flexDirection="row" minH="calc(100vh - 230px)">
            <Box display="flex" flexDirection="column" w="100%">
              <Box
                display={mode === '0' ? 'flex' : 'none'}
                flexDirection="column"
                gap="s16"
                p="s20"
                w="100%"
                minH="100%"
                borderRight="1px solid"
                borderColor="border.layout"
              >
                <FormMemberSelect name="memberID" label="Member" />

                {memberId && memberId !== 'undefined' && (
                  <FormAccountSelect
                    name="accountID"
                    memberId={memberId}
                    label="Select Deposit Account"
                    filterBy={ObjState.Active}
                  />
                )}
                {memberId && memberId !== 'undefined' && accountId && accountId !== 'undefined' && (
                  <Box>
                    {' '}
                    <Divider />
                    <Box display="flex" flexDirection="column" gap="s4" pt="s16">
                      <Text fontSize="s3" fontWeight="600">
                        Reason for closing
                      </Text>
                      <Box display="flex" flexDirection="column" gap="s16">
                        <FormRadioGroup
                          name="reason"
                          options={radioList}
                          direction="row"
                          pb="s16"
                        />
                        {radioOther === AccountCloseReason?.Other && (
                          <Grid templateColumns="repeat(3,1fr)">
                            <FormInput name="otherReason" label="Specify Reason" />
                          </Grid>
                        )}
                      </Box>
                    </Box>
                    <Divider />
                    <Box display="flex" flexDirection="column" gap="s16">
                      <Box display="flex" flexDirection="column" gap="s4" pt="s16">
                        <Text fontSize="r1" fontWeight="600">
                          Fees & Charges Summary
                        </Text>
                        <Text fontSize="s2" fontWeight="400">
                          All charges and fees must be paid to get approved.
                        </Text>
                      </Box>
                    </Box>
                    <Box bg="background.500" borderRadius="br2" mt="s16">
                      <Box display="flex" flexDirection="column" gap="s16" p="s16">
                        {selectedAccount?.guaranteedAmount && (
                          <Box display="flex" flexDirection="column" gap="s8">
                            <Text fontWeight="600" fontSize="s3">
                              Loan
                            </Text>
                            <Box
                              h="36px"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text fontWeight="500" fontSize="s3">
                                Loan Amount
                              </Text>
                              <Text fontWeight="600" fontSize="r1">
                                {selectedAccount?.guaranteedAmount}
                              </Text>
                            </Box>
                          </Box>
                        )}
                        <Box display="flex" flexDirection="column" gap="s8">
                          <Text fontWeight="600" fontSize="s3">
                            Interest
                          </Text>

                          <Box
                            h="36px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontWeight="500" fontSize="s3">
                              Interest Payable
                            </Text>
                            <Text fontWeight="600" fontSize="r1">
                              {selectedAccount?.interestAccured ?? '0'}
                            </Text>
                          </Box>

                          <Box
                            h="36px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontWeight="500" fontSize="s3">
                              Total Interest Tax
                            </Text>
                            <Text fontWeight="600" fontSize="r1">
                              {selectedAccount?.interestTax ?? '0'}
                            </Text>
                          </Box>

                          <Box
                            h="36px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontWeight="500" fontSize="s3">
                              Adjusted Interest
                            </Text>
                            <Box>
                              <FormAmountInput size="sm" name="adjustedInterest" isDisabled />
                            </Box>
                          </Box>

                          <Box
                            h="36px"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Text fontWeight="500" fontSize="s3">
                              Net Interest Payable
                            </Text>
                            <Text fontWeight="600" fontSize="r1">
                              {netInterestPayable}
                            </Text>
                          </Box>
                        </Box>
                        {selectedAccount?.product?.accountClosingCharge?.length && (
                          <Box display="flex" flexDirection="column" gap="s8">
                            <Text fontWeight="600" fontSize="s3">
                              Other Charges
                            </Text>
                            {selectedAccount.product?.accountClosingCharge?.map(
                              ({ serviceName }) => (
                                <Box
                                  // h="36px"
                                  display="flex"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  key={`${serviceName}`}
                                >
                                  <Text fontWeight="500" fontSize="s3">
                                    {serviceName}
                                  </Text>
                                  <FormAmountInput
                                    size="sm"
                                    name={`serviceCharge.${serviceName}`}
                                  />
                                </Box>
                              )
                            )}
                          </Box>
                        )}
                        <Divider />
                        <Box
                          h="36px"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text fontWeight="600" fontSize="s3">
                            Total Charges
                          </Text>
                          <Text fontWeight="600" fontSize="r1">
                            {totalCharge}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Divider />
                    <Box display="flex" flexDirection="column" gap="s4" pt="s16">
                      <FormTextArea name="notes" label="Notes" rows={5} />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box
                display={mode === '1' ? 'flex' : 'none'}
                flexDirection="column"
                minH="100%"
                gap="s16"
                w="100%"
                borderRight="1px solid"
                borderColor="border.layout"
              >
                <Payment totalDeposit={totalDeposit} />
              </Box>
            </Box>
            {memberId && memberId !== 'undefined' && (
              <Box position="sticky" top="170px" right="0" maxH="500px">
                <MemberCard
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
                          name: selectedAccount?.accountName as string,
                          type: selectedAccount?.product?.nature
                            ? accountTypes[selectedAccount?.product?.nature]
                            : '',
                          ID: selectedAccount?.id,
                          currentBalance: selectedAccount?.balance ?? '0',
                          minimumBalance: selectedAccount?.product?.minimumBalance ?? '0',
                          interestAccured: selectedAccount?.interestAccured ?? '0',
                          guaranteeBalance: selectedAccount?.guaranteedAmount ?? '0',
                          overdrawnBalance: selectedAccount?.overDrawnBalance ?? '0',
                          fine: FINE,
                          // branch: 'Kumaripati',
                          openDate: selectedAccount?.accountOpenedDate ?? 'N/A',
                          expiryDate: selectedAccount?.accountExpiryDate ?? 'N/A',
                          lastTransactionDate: selectedAccount?.lastTransactionDate ?? 'N/A',
                          productName: selectedAccount?.product?.productName,
                        }
                      : null
                  }
                  viewProfileHandler={() => null}
                  viewAccountTransactionsHandler={() => null}
                />
              </Box>
            )}
          </Box>
          <Box position="sticky" bottom={0}>
            {mode === '0' && (
              <FormFooter
                mainButtonLabel={
                  Number(selectedAccount?.balance ?? 0) - netInterestPayable - totalCharge === 0
                    ? 'Close Account'
                    : 'Proceed to Payment'
                }
                dangerButton={
                  !!(Number(selectedAccount?.balance ?? 0) - netInterestPayable - totalCharge === 0)
                }
                mainButtonHandler={mainButtonHandlermode0}
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
        </form>
      </FormProvider>
    </Container>
  );
};
