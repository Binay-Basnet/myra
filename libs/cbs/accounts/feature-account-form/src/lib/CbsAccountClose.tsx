import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import rhtoast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Box,
  Button,
  Divider,
  findError,
  getError,
  Grid,
  MemberCard,
  ResponseDialog,
  Text,
  toast,
} from '@myra-ui';

import {
  AccountClosePaymentMode,
  AccountCloseReason,
  AccountTransferPaymentForAccountClose,
  DepositAccountClose,
  NatureOfDepositProduct,
  ObjState,
  useGetAccountDetailsDataQuery,
  useGetIndividualMemberDetails,
  useSetAccountCloseDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { CashOptions } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormAmountInput,
  FormInput,
  FormLayout,
  FormMemberSelect,
  FormRadioGroup,
  FormTextArea,
} from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  featureCode,
  useTranslation,
} from '@coop/shared/utils';

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
    defaultValues: {
      paymentMode: AccountClosePaymentMode.Cash,
      cash: {
        disableDenomination: true,
      },
    },
  });

  const { watch, getValues, setValue, reset } = methods;

  const [mode, setMode] = useState('0');

  const memberId = watch('memberID');
  const disableDenomination = watch('cash.disableDenomination');

  const { mutateAsync, mutate } = useSetAccountCloseDataMutation();

  const [totalCharge, setTotalCharge] = useState<number>(0);

  const [totalDeposit, setTotalDeposit] = useState<number>(0);

  const { memberDetailData, memberCitizenshipUrl } = useGetIndividualMemberDetails({ memberId });

  const accountId = watch('accountID');

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: accountId as string },
    { enabled: !!accountId }
  );

  const selectedAccount = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data,
    [accountDetailQueryData]
  );

  const radioOther = watch('reason');
  const totalAmount = watch('cash.cashPaid');
  const chequeNo = watch('bankCheque.cheque_no');
  const isDisableDenomination = watch('cash.disableDenomination');
  const bankSelected = watch('bankCheque.bank');
  const accountSelected = watch('accountTransfer.destination_account');

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
  const disableSubmitButtonFxn = (paymentMode: AccountClosePaymentMode | undefined | null) => {
    if (
      paymentMode === AccountClosePaymentMode.Cash &&
      !disableDenomination &&
      cashPaid === undefined
    ) {
      return !(Number(returnAmount) >= 0) || !(Number(cashPaid) >= Number(totalAmount));
    }
    if (
      (selectedPaymentMode === AccountClosePaymentMode.BankCheque && bankSelected === undefined) ||
      (selectedPaymentMode === AccountClosePaymentMode.BankCheque && chequeNo === undefined)
    ) {
      return true;
    }
    if (
      selectedPaymentMode === AccountClosePaymentMode.AccountTransfer &&
      accountSelected === undefined
    ) {
      return true;
    }
    return false;
  };

  const totalCashPaid = Number(isDisableDenomination ? cashPaid : denominationTotal);

  const returnAmount =
    selectedPaymentMode === AccountClosePaymentMode.Cash
      ? totalCashPaid - Math.floor(totalDeposit)
      : totalCashPaid - totalDeposit;

  const adjustedInterest = watch('adjustedInterest');

  const netInterestPayable = useMemo(
    () =>
      Number(selectedAccount?.interestAccrued ?? 0) -
        Number(selectedAccount?.interestTax ?? 0) -
        Number(adjustedInterest ?? 0) ?? 0,
    [adjustedInterest, selectedAccount?.interestAccrued, selectedAccount?.interestTax]
  );

  useEffect(() => {
    let tempCharge = 0;
    selectedAccount?.product?.accountClosingCharge?.forEach(({ serviceName, amount }: any) => {
      setValue(`serviceCharge.${serviceName}`, amount);

      tempCharge += Number(amount ?? 0);
    });

    tempCharge += Number(selectedAccount?.prematurePenalty ?? 0);

    setTotalCharge(tempCharge);
  }, [JSON.stringify(selectedAccount)]);

  const serviceCharge = watch('serviceCharge');

  useEffect(() => {
    if (serviceCharge) {
      setTotalCharge(
        Object.values(serviceCharge).reduce(
          (sum, amount) => sum + Number(amount),
          Number(selectedAccount?.prematurePenalty ?? 0)
        ) ?? 0
      );
    }
  }, [JSON.stringify(serviceCharge), JSON.stringify(selectedAccount)]);

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
                    queryClient.invalidateQueries(['getAccountInactiveCheck']);
                  } else {
                    router.push(ROUTES.CBS_ACCOUNT_CLOSE_LIST);
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
            value: CashOptions[value as string],
            quantity,
          })) ?? [],
      };
    }

    if (values.paymentMode === AccountClosePaymentMode?.BankCheque) {
      filteredValues = omit({ ...filteredValues }, ['accountTransfer', 'cash']);
    }

    if (values.paymentMode === AccountClosePaymentMode?.AccountTransfer) {
      filteredValues = omit(
        {
          ...filteredValues,
          accountTransfer: omit({ ...filteredValues?.accountTransfer }, [
            'isDifferentMember',
            'memberId',
          ]) as AccountTransferPaymentForAccountClose,
        },
        ['bankCheque', 'cash']
      );
    }

    // asyncToast({
    //   id: 'account-close-final-payment',
    //   msgs: {
    //     success: 'Account has been closed',
    //     loading: 'Closing Account',
    //   },
    //   promise: mutateAsync({
    //     data: {
    //       ...(filteredValues as DepositAccountClose),
    //     },
    //   }),
    // onSuccess: () => {
    //   if (redirectPath) {
    //     router.push(String(redirectPath));
    //     queryClient.invalidateQueries(['getAccountInactiveCheck']);
    //   } else {
    //     router.push(ROUTES.CBS_ACCOUNT_CLOSE_LIST);
    //   }
    // },
    // });

    return filteredValues as DepositAccountClose;
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

  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberID', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  return (
    <FormLayout methods={methods} hasSidebar={Boolean(memberId && memberId !== 'undefined')}>
      <FormLayout.Header title={`${t['accountClose']} - ${featureCode?.newAccountClose}`} />

      <FormLayout.Content>
        <FormLayout.Form>
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
              <FormMemberSelect isRequired name="memberID" label="Member" />

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
                  <Divider />
                  <Box display="flex" flexDirection="column" gap="s4" pt="s16">
                    <Text fontSize="s3" fontWeight="600">
                      Reason for closing *
                    </Text>
                    <Box display="flex" flexDirection="column" gap="s16">
                      <FormRadioGroup name="reason" options={radioList} direction="row" pb="s16" />
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
                      {selectedAccount?.guaranteedAmount &&
                        selectedAccount?.guaranteedAmount !== '0' && (
                          <Box display="flex" flexDirection="column" gap="s8">
                            <Text fontWeight="600" fontSize="s3">
                              Guarantee
                            </Text>
                            <Box
                              h="36px"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text color="gray.600" fontWeight="500" fontSize="s3">
                                Guarantee Amount
                              </Text>
                              <Text color="gray.600" fontWeight="600" fontSize="r1">
                                {amountConverter(selectedAccount?.guaranteedAmount ?? 0)}
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
                          <Text color="gray.600" fontWeight="500" fontSize="s3">
                            Interest Payable
                          </Text>
                          <Text color="gray.600" fontWeight="600" fontSize="r1">
                            {amountConverter(selectedAccount?.interestAccrued ?? 0)}
                          </Text>
                        </Box>

                        <Box
                          h="36px"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text color="gray.600" fontWeight="500" fontSize="s3">
                            Total Interest Tax
                          </Text>
                          <Text color="gray.600" fontWeight="600" fontSize="r1">
                            {amountConverter(selectedAccount?.interestTax ?? 0)}
                          </Text>
                        </Box>

                        <Box
                          h="36px"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text color="gray.600" fontWeight="500" fontSize="s3">
                            Adjusted Interest
                          </Text>
                          <Box>
                            <FormAmountInput
                              type="number"
                              size="sm"
                              name="adjustedInterest"
                              isDisabled
                            />
                          </Box>
                        </Box>

                        <Box
                          h="36px"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text color="gray.600" fontWeight="500" fontSize="s3">
                            Net Interest Payable
                          </Text>
                          <Text fontWeight="600" fontSize="r1">
                            {amountConverter(netInterestPayable ?? 0)}
                          </Text>
                        </Box>
                      </Box>
                      {selectedAccount?.product?.accountClosingCharge?.length ? (
                        <Box display="flex" flexDirection="column" gap="s8">
                          <Text fontWeight="600" fontSize="s3">
                            Other Charges
                          </Text>
                          {selectedAccount.product?.accountClosingCharge?.map(
                            ({ serviceName }: any) => (
                              <Box
                                // h="36px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                key={`${serviceName}`}
                              >
                                <Text color="gray.600" fontWeight="500" fontSize="s3">
                                  {serviceName}
                                </Text>
                                <FormAmountInput
                                  type="number"
                                  size="sm"
                                  name={`serviceCharge.${serviceName}`}
                                />
                              </Box>
                            )
                          )}

                          {(selectedAccount?.product?.nature ===
                            NatureOfDepositProduct.RecurringSaving ||
                            selectedAccount?.product?.nature ===
                              NatureOfDepositProduct.TermSavingOrFd) && (
                            <Box
                              h="36px"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text color="gray.600" fontWeight="500" fontSize="s3">
                                Premature Penalty
                              </Text>
                              <Text fontWeight="600" fontSize="r1">
                                {amountConverter(selectedAccount?.prematurePenalty ?? 0)}
                              </Text>
                            </Box>
                          )}
                        </Box>
                      ) : null}
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
                          {amountConverter(totalCharge)}
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
        </FormLayout.Form>

        {memberId && memberId !== 'undefined' && (
          <FormLayout.Sidebar borderPosition="left">
            <MemberCard
              memberDetails={{
                name: memberDetailData?.name,
                code: memberDetailData?.code,
                avatar: memberDetailData?.profilePicUrl ?? '',
                memberID: memberDetailData?.id,
                gender: memberDetailData?.gender,
                age: memberDetailData?.age,
                maritalStatus: memberDetailData?.maritalStatus as string,
                dateJoined: memberDetailData?.dateJoined?.en,
                // branch: 'Basantapur',
                phoneNo: memberDetailData?.contact,
                email: memberDetailData?.email,
                address: memberDetailData?.address,
              }}
              // notice="KYM needs to be updated"
              signaturePath={selectedAccount?.member?.signaturePicUrl ?? ''}
              citizenshipPath={memberCitizenshipUrl as string}
              accountInfo={
                selectedAccount
                  ? {
                      name: selectedAccount?.accountName as string,
                      type: selectedAccount?.product?.nature
                        ? accountTypes[selectedAccount?.product?.nature]
                        : '',
                      ID: selectedAccount?.accountId,
                      currentBalance: selectedAccount?.availableBalance ?? '0',
                      actualBalance: selectedAccount?.accountBalance ?? '0',
                      minimumBalance: selectedAccount?.product?.minimumBalance ?? '0',
                      interestAccured: selectedAccount?.interestAccrued ?? '0',
                      guaranteeBalance: selectedAccount?.guaranteedAmount ?? '0',
                      overdrawnBalance: selectedAccount?.overDrawnBalance ?? '0',
                      fine: selectedAccount?.dues?.fine ?? 0,
                      // branch: 'Kumaripati',
                      openDate: localizedDate(selectedAccount?.accountOpenDate) ?? 'N/A',
                      expiryDate: localizedDate(selectedAccount?.accountExpiryDate) ?? 'N/A',
                      // lastTransactionDate:
                      //   localizedDate(selectedAccount?.lastTransactionDate) ?? 'N/A',
                      productName: selectedAccount?.product?.productName,
                      installmentAmount:
                        selectedAccount?.product?.nature ===
                          NatureOfDepositProduct.RecurringSaving ||
                        (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                          selectedAccount?.product?.isMandatorySaving)
                          ? selectedAccount?.installmentAmount
                          : null,
                    }
                  : null
              }
            />
          </FormLayout.Sidebar>
        )}
      </FormLayout.Content>

      {mode === '0' && (
        <FormLayout.Footer
          mainButtonLabel={
            Number(selectedAccount?.accountBalance ?? 0) - netInterestPayable - totalCharge === 0
              ? 'Close Account'
              : 'Proceed Transaction'
          }
          isMainButtonDisabled={!radioOther}
          dangerButton={
            !!(
              Number(selectedAccount?.accountBalance ?? 0) - netInterestPayable - totalCharge ===
              0
            )
          }
          mainButtonHandler={mainButtonHandlermode0}
        />
      )}
      {mode === '1' && (
        <FormLayout.Footer
          status={<Button onClick={previousButtonHandler}>Previous</Button>}
          mainButton={
            <ResponseDialog
              onSuccess={() => {
                if (redirectPath) {
                  router.push(String(redirectPath));
                  queryClient.invalidateQueries(['getAccountInactiveCheck']);
                } else {
                  router.push(ROUTES.CBS_ACCOUNT_CLOSE_LIST);
                }
              }}
              promise={() => mutateAsync({ data: handleSubmit() })}
              successCardProps={(response) => {
                const result = response?.account?.close?.record;

                return {
                  type: 'Saving Account Close',
                  total: amountConverter(result?.amount || 0) as string,
                  totalWords: amountToWordsConverter(result?.amount ? Number(result?.amount) : 0),
                  title: 'Account Close Successful',
                  details: {
                    'Account Id': (
                      <Text fontSize="s3" color="primary.500" fontWeight="600">
                        {result?.accId}
                      </Text>
                    ),
                    'Account Closed Date': localizedDate(result?.accCloseDate),
                    'Reason For Closing': result?.closeReason,
                    'Account Name': result?.accName,
                    'Total Interest': result?.interest,
                    Charges: result?.charges,

                    'Payment Mode': result?.paymentMode,
                  },
                  subTitle: 'Account closed successfully. Details of the account is listed below.',
                };
              }}
              errorCardProps={{
                title: 'Saving Account Close Failed',
              }}
            >
              <Button width="160px">Confirm Payment</Button>
            </ResponseDialog>
          }
          mainButtonHandler={handleSubmit}
          isMainButtonDisabled={disableSubmitButtonFxn(selectedPaymentMode)}
        />
      )}
    </FormLayout>
  );
};
