import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { Box, Button, Divider, Grid, GridItem, MemberCard, ResponseDialog, Text } from '@myra-ui';

import { SuspiciousTransaction } from '@coop/cbs/components';
import {
  AccountObjState,
  DepositedBy,
  DepositInput,
  DepositPaymentType,
  InstallmentState,
  KymMemberTypesEnum,
  MemberAccountDetails,
  NatureOfDepositProduct,
  useAppSelector,
  useGetAccountDetailsDataQuery,
  useGetIndividualMemberDetails,
  useGetInstallmentsListDataQuery,
  useSetDepositDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate, localizedTime, ROUTES } from '@coop/cbs/utils';
import { CashOptions } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormAmountInput,
  FormCheckbox,
  FormInput,
  FormLayout,
  FormMemberSelect,
  FormMFGroupSelect,
  FormNumberInput,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  decimalAdjust,
  featureCode,
  useTranslation,
} from '@coop/shared/utils';

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
  isFinePaid: boolean;
  memberOrGroup: 'member' | 'group';
  groupId: string;
};

const REBATE = '0';

const depositedByObj: Record<DepositedBy, string> = {
  [DepositedBy.Agent]: 'Market Representative',
  [DepositedBy.Other]: 'Other',
  [DepositedBy.Self]: 'Self',
};

export const AddDeposit = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const router = useRouter();

  const redirectMemberId = router.query['memberId'];

  const redirectAccountId = router.query['accountId'];

  const redirectGroupId = router.query['groupId'];

  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const methods = useForm<DepositFormInput>({
    defaultValues: {
      memberOrGroup: 'member',
      payment_type: DepositPaymentType.Cash,
      cash: { disableDenomination: true },
      depositedBy: DepositedBy.Self,
    },
  });

  const { watch, reset, getValues } = methods;

  const memberId = watch('memberId');

  const { memberDetailData, memberCitizenshipUrl } = useGetIndividualMemberDetails({
    memberId: memberId || '',
  });

  const noOfInstallments = watch('noOfInstallments');

  useEffect(() => {
    reset({
      ...getValues(),
      memberId,
      accountId: '',
      voucherId: '',
      noOfInstallments: null,
    });
  }, [memberId]);

  const accountId = watch('accountId');

  useEffect(() => {
    reset({
      ...getValues(),
      accountId,
      voucherId: '',
      noOfInstallments: null,
    });
  }, [accountId]);

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: accountId as string },
    { enabled: !!accountId }
  );

  const selectedAccount = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data,
    [accountDetailQueryData]
  );

  const FINE = useMemo(() => selectedAccount?.dues?.fine ?? '0', [selectedAccount]);

  useEffect(() => {
    if (Number(FINE)) {
      methods.reset({ ...getValues(), isFinePaid: true, fine: FINE });
    } else {
      methods.reset({ ...getValues(), fine: FINE });
    }
  }, [FINE]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  let amountToBeDeposited: string | number = watch('amount') ?? 0;

  const { mutateAsync } = useSetDepositDataMutation();

  const disableDenomination = watch('cash.disableDenomination');

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

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const withdrawSlipAmount = watch('withdrawSlip.amount');

  const bankVoucherAmount = watch('bankVoucher.amount');

  const selectedPaymentMode = watch('payment_type');

  const isSuspicious = watch('isSuspicious');

  const suspicionRemarks = watch('suspicionRemarks');

  const isFinePaid = watch('isFinePaid');

  const payableFine = Number(watch('fine') || 0);

  const checkIsSubmitButtonDisabled = () => {
    if (mode === 0) {
      return Boolean(!totalDeposit || (isSuspicious && !suspicionRemarks));
    }

    if (selectedPaymentMode === DepositPaymentType.Cash) {
      if (rebate && Number(totalCashPaid ?? 0) < Number(amountToBeDeposited)) {
        return true;
      }

      if (!rebate && Number(totalCashPaid ?? 0) < Number(totalDeposit)) return true;
    }

    if (selectedPaymentMode === DepositPaymentType.BankVoucher) {
      if (rebate && Number(bankVoucherAmount ?? 0) < Number(amountToBeDeposited)) {
        return true;
      }

      if (!rebate && Number(bankVoucherAmount ?? 0) < Number(totalDeposit)) return true;
    }

    if (selectedPaymentMode === DepositPaymentType.WithdrawSlip) {
      if (rebate && Number(withdrawSlipAmount ?? 0) < Number(amountToBeDeposited)) {
        return true;
      }

      if (!rebate && Number(withdrawSlipAmount ?? 0) < Number(totalDeposit)) return true;
    }

    return false;
  };

  const { data: installmentsListQueryData, refetch } = useGetInstallmentsListDataQuery(
    { id: accountId as string },
    {
      enabled: !!(
        accountId && selectedAccount?.product?.nature === NatureOfDepositProduct.RecurringSaving
      ),
    }
  );

  useEffect(() => {
    if (accountId && selectedAccount?.product?.nature === NatureOfDepositProduct.RecurringSaving) {
      refetch();
    }
  }, [accountId, selectedAccount?.product?.nature]);

  const { firstMonth, lastMonth, rebate } = useMemo(() => {
    const installmentData = installmentsListQueryData?.account?.getInstallments?.data;

    if (!installmentData?.length || !noOfInstallments) {
      return { firstMonth: '', lastMonth: '' };
    }

    const filteredInstallments = installmentData?.filter(
      (installment) =>
        installment?.status === InstallmentState.Cancelled ||
        installment?.status === InstallmentState.Paid
    );

    const pendingInstallments = installmentData.slice(
      filteredInstallments.length,
      filteredInstallments.length + Number(noOfInstallments)
    );

    const tempRebate = pendingInstallments.reduce(
      (accumulator, curr) => accumulator + Number(curr?.rebate),
      0
    );

    return {
      firstMonth: localizedDate(pendingInstallments[0]?.dueDate),
      lastMonth: localizedDate(pendingInstallments[pendingInstallments.length - 1]?.dueDate),
      rebate: decimalAdjust('floor', tempRebate, -2),
    };
  }, [noOfInstallments, installmentsListQueryData, preferenceDate]);

  amountToBeDeposited = useMemo(() => {
    if (noOfInstallments && selectedAccount?.installmentAmount) {
      return Number(noOfInstallments) * Number(selectedAccount?.installmentAmount);
    }
    return amountToBeDeposited;
  }, [noOfInstallments, selectedAccount, amountToBeDeposited]);

  const totalDeposit = useMemo(
    () => (amountToBeDeposited ? Number(amountToBeDeposited) + Number(rebate ?? REBATE) : 0),
    [amountToBeDeposited, isFinePaid, payableFine, FINE, rebate, REBATE]
  );

  const totalPayable = useMemo(
    () => (amountToBeDeposited ? Number(amountToBeDeposited) + Number(payableFine) : 0),
    [amountToBeDeposited, isFinePaid, payableFine, FINE, rebate, REBATE]
  );

  const returnAmount =
    selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
    selectedAccount?.product?.isMandatorySaving
      ? 0
      : Number(totalCashPaid) - totalPayable;

  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...omit(values, ['isFinePaid', 'memberOrGroup', 'groupId']),
      fine: String(payableFine),
      rebate: String(rebate ?? REBATE),
    };

    if (values.payment_type === DepositPaymentType.Cash) {
      filteredValues = omit({ ...filteredValues }, ['withdrawSlip', 'bankVoucher']);
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

    if (values.payment_type === DepositPaymentType.BankVoucher) {
      filteredValues = omit({ ...filteredValues }, ['withdrawSlip', 'cash']);
    }

    if (values.payment_type === DepositPaymentType.WithdrawSlip) {
      filteredValues = omit({ ...filteredValues }, ['bankVoucher', 'cash']);
    }

    if (
      selectedAccount?.product?.nature === NatureOfDepositProduct.RecurringSaving ||
      (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
        selectedAccount?.product?.isMandatorySaving === true)
    ) {
      if (noOfInstallments) {
        filteredValues.amount = String(amountToBeDeposited);
      } else {
        if (values.payment_type === DepositPaymentType.Cash) {
          filteredValues.amount = filteredValues?.cash?.total;
        }

        if (values.payment_type === DepositPaymentType.BankVoucher) {
          filteredValues.amount = filteredValues?.bankVoucher?.amount;
        }

        if (values.payment_type === DepositPaymentType.WithdrawSlip) {
          filteredValues.amount = filteredValues?.withdrawSlip?.amount;
        }
      }
    }

    return filteredValues as DepositInput;
  };
  // redirect from member details
  useEffect(() => {
    if (redirectMemberId) {
      methods.setValue('memberId', String(redirectMemberId));
    }
  }, [redirectMemberId]);

  useEffect(() => {
    if (redirectAccountId && memberId) {
      methods.setValue('accountId', String(redirectAccountId));
    }
  }, [memberId, redirectAccountId]);

  useEffect(() => {
    if (redirectGroupId) {
      methods.setValue('memberOrGroup', 'group');
      methods.setValue('groupId', String(redirectGroupId));
    }
  }, [redirectGroupId]);

  const memberOrGroup = watch('memberOrGroup');

  const groupId = watch('groupId');

  useEffect(() => {
    if (!redirectAccountId) {
      if (memberOrGroup === 'member') {
        methods.setValue('groupId', '');
      } else {
        methods.setValue('memberId', '');
      }
    }
  }, [memberOrGroup]);

  const isMfGroupDisabled = () => {
    if (!!redirectMemberId === false && !!redirectGroupId === false) {
      return false;
    }
    if (!!redirectMemberId === true && !!redirectGroupId === false) {
      return true;
    }

    return false;
  };

  return (
    <>
      <FormLayout methods={methods} hasSidebar={Boolean(memberDetailData && mode === 0)}>
        <FormLayout.Header
          title={`${t['addDepositNewDeposit']} - ${featureCode?.newDeposit}`}
          buttonLabel={t['addDepositAddBulkDeposit']}
          buttonHandler={() => router.push(ROUTES.CBS_TRANS_BULK_DEPOSIT_ADD)}
        />

        <FormLayout.Content>
          <FormLayout.Form>
            <Box display={mode === 0 ? 'flex' : 'none'}>
              <Box p="s16" width="100%" display="flex" flexDirection="column" gap="s24">
                <FormSwitchTab
                  name="memberOrGroup"
                  options={[
                    { label: 'Member', value: 'member', isDisabled: !!redirectGroupId },
                    {
                      label: 'MF Group',
                      value: 'group',
                      isDisabled: isMfGroupDisabled(),
                    },
                  ]}
                />

                {memberOrGroup === 'group' && (
                  <>
                    <FormMFGroupSelect
                      name="groupId"
                      label="MF Group"
                      isRequired
                      isDisabled={!!redirectGroupId}
                    />

                    <FormMemberSelect isRequired name="memberId" label="Member" groupId={groupId} />
                  </>
                )}

                {memberOrGroup === 'member' && (
                  <FormMemberSelect
                    isRequired
                    name="memberId"
                    label="Member"
                    isDisabled={!!redirectMemberId}
                  />
                )}

                {memberId && (
                  <FormAccountSelect
                    isRequired
                    name="accountId"
                    label={t['addDepositSelectDepositAccount']}
                    memberId={memberId}
                    includeLoc
                    filterBy={AccountObjState?.Active}
                    isDisabled={!!redirectAccountId}
                    groupId={groupId}
                  />
                )}

                {accountId &&
                  ((selectedAccount?.product?.nature === NatureOfDepositProduct.RecurringSaving &&
                    selectedAccount?.product?.depositFrequency) ||
                    (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                      selectedAccount?.product?.isMandatorySaving)) && (
                    <>
                      <Grid templateColumns="repeat(2, 1fr)" gap="s24" alignItems="flex-end">
                        <FormInput isRequired name="voucherId" label="Deposit Slip No" />

                        <Box />

                        <GridItem colSpan={2}>
                          <Grid
                            templateColumns="repeat(2, 1fr)"
                            gap="s24"
                            alignItems={
                              methods.formState?.errors?.noOfInstallments ? 'center' : 'flex-end'
                            }
                          >
                            <FormNumberInput
                              isRequired
                              name="noOfInstallments"
                              label={t['addDepositNoOfInstallments']}
                              max={100}
                              rules={{
                                validate: {
                                  max: (value) =>
                                    value > 100 ? 'Maximum allowed installments is 100' : true,
                                },
                              }}
                            />

                            <Box>
                              <Button variant="outline" onClick={handleModalOpen}>
                                {t['addDepositViewAllInstallments']}
                              </Button>
                            </Box>
                          </Grid>
                        </GridItem>
                      </Grid>

                      <FormCheckbox
                        name="isFinePaid"
                        label="Fine to be paid"
                        onChangeAction={(val) => {
                          if (!val) {
                            methods.setValue('fine', '');
                          } else {
                            methods.setValue('fine', FINE);
                          }
                        }}
                      />

                      {isFinePaid && (
                        <Box
                          display="flex"
                          flexDirection="column"
                          gap="s16"
                          p="s16"
                          backgroundColor="highlight.500"
                        >
                          <Grid templateColumns="repeat(2, 1fr)" gap="s16">
                            <FormAmountInput name="fine" label="Payable Fine" />
                          </Grid>
                        </Box>
                      )}

                      {memberDetailData?.type === KymMemberTypesEnum.Individual && (
                        <SuspiciousTransaction />
                      )}

                      <Box display="flex" flexDirection="column" gap="s4">
                        <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-70">
                          {t['addDepositPaymentRange']}
                        </Text>
                        <Text fontSize="s3" fontWeight="Regular" color="neutralColorLight.Gray-70">
                          {`Payment made from ${firstMonth} to ${lastMonth}`}
                        </Text>
                      </Box>
                    </>
                  )}

                {accountId &&
                  (selectedAccount?.product?.nature === NatureOfDepositProduct.Current ||
                    (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                      !selectedAccount?.product?.isMandatorySaving) ||
                    (selectedAccount?.product?.nature === NatureOfDepositProduct.RecurringSaving &&
                      !selectedAccount?.product?.depositFrequency) ||
                    selectedAccount?.product?.nature === NatureOfDepositProduct.TermSavingOrFd ||
                    !selectedAccount?.product?.nature) && (
                    <>
                      <Grid templateColumns="repeat(2, 1fr)" gap="s24" alignItems="flex-start">
                        <FormInput name="voucherId" label="Deposit Slip No" />

                        <FormAmountInput
                          isRequired
                          type="number"
                          name="amount"
                          label={t['addDepositAmountToBeDeposited']}
                        />
                      </Grid>

                      {memberDetailData?.type === KymMemberTypesEnum.Individual && (
                        <SuspiciousTransaction />
                      )}

                      <Box display="flex" flexDirection="column" gap="s4">
                        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
                          {t['addDepositTotalAmountAfterDeposit']}
                        </Text>
                        <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
                          {`${t['rs']} ${amountConverter(
                            Number(selectedAccount?.accountBalance ?? 0) + Number(totalDeposit)
                          )}`}
                        </Text>
                      </Box>
                    </>
                  )}

                {memberId && accountId && (
                  <>
                    <Divider my="s8" border="1px solid" borderColor="background.500" />

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
                          {t['addDepositDepositAmount']}
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
                          {amountConverter(amountToBeDeposited)}
                        </Text>
                      </Box>

                      {(selectedAccount?.product?.nature ===
                        NatureOfDepositProduct.RecurringSaving ||
                        (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                          selectedAccount?.product?.isMandatorySaving === true)) && (
                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            {t['addDepositFine']}
                          </Text>

                          <Text fontSize="s3" fontWeight={500} color="danger.500">
                            {`+ ${amountConverter(payableFine)}`}
                          </Text>
                        </Box>
                      )}

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          {t['addDepositRebate']}
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="success.500">
                          {`+ ${amountConverter(rebate ?? REBATE)}`}
                        </Text>
                      </Box>

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          {t['addDepositTotalDeposit']}
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
                          {amountConverter(totalDeposit)}
                        </Text>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>

            <Payment
              mode={mode}
              totalDeposit={Number(totalPayable)}
              // rebate={Number(rebate ?? 0)}
              // selectedAccount={selectedAccount as DepositAccount}
            />
          </FormLayout.Form>

          {memberDetailData && mode === 0 && (
            <FormLayout.Sidebar borderPosition="left">
              <MemberCard
                memberDetails={{
                  name: memberDetailData?.name,
                  avatar: memberDetailData?.profilePicUrl ?? '',
                  code: memberDetailData?.code,
                  memberID: memberDetailData?.id,
                  gender: memberDetailData?.gender,
                  age: memberDetailData?.age,
                  maritalStatus: memberDetailData?.maritalStatus as string,
                  dateJoined: memberDetailData?.dateJoined,
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
                        fine: FINE,
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
                        lastInstallmentUpdatedDate: selectedAccount?.lastInstallmentUpdatedDate,
                      }
                    : null
                }
                redirectUrl={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${selectedAccount?.accountId}`}
              />
            </FormLayout.Sidebar>
          )}
        </FormLayout.Content>

        <FormLayout.Footer
          mainButton={
            mode === 1 ? (
              <ResponseDialog
                onSuccess={() => {
                  if (methods.getValues().payment_type === DepositPaymentType.WithdrawSlip) {
                    queryClient.invalidateQueries(['getAvailableSlipsList']);
                    queryClient.invalidateQueries(['getPastSlipsList']);
                  }
                  queryClient.invalidateQueries(['getDepositListData']);
                  router.push(ROUTES.CBS_TRANS_DEPOSIT_LIST);
                }}
                promise={() => mutateAsync({ data: handleSubmit() })}
                successCardProps={(response) => {
                  const result = response?.transaction?.deposit?.record;

                  const totalTxnAmount = Number(result?.amount || 0) + Number(result?.fine || 0);
                  let tempObj: Record<string, string> = {};

                  if (result?.from) {
                    tempObj = {
                      'Installment From': String(localizedDate(result?.from?.date)),
                      'Installment To': String(localizedDate(result?.to?.date)),
                    };
                  }
                  return {
                    type: 'Deposit',
                    total: amountConverter(totalTxnAmount),
                    totalWords: amountToWordsConverter(totalTxnAmount),
                    title: 'Deposit Successful',
                    receiptTitle: 'Deposit Receipt',
                    details: {
                      'Transaction Id': (
                        <Text fontSize="s3" color="primary.500" fontWeight="600">
                          {result?.transactionID}
                        </Text>
                      ),
                      Date: localizedDate(result?.date),
                      'Transaction Time': localizedTime(result?.createdAt),
                      'Deposit Amount': amountConverter(result?.amount || 0),
                      'Actual Fine': amountConverter(
                        Number(result?.fine ?? 0) + Number(result?.discount || 0)
                      ),
                      'Paid Fine': amountConverter(result?.fine || 0),
                      Rebate: amountConverter(result?.rebate || 0),
                      'Payment Mode': result?.paymentMode,
                      'Deposited By': result?.depositedOther
                        ? `${depositedByObj[result?.depositedBy as DepositedBy]}-(${
                            result?.depositedOther
                          })`
                        : depositedByObj[result?.depositedBy as DepositedBy],
                      ...tempObj,
                      'Actual Balance': amountConverter(result?.newAmount || 0),
                    },
                    subTitle:
                      'Amount deposited successfully. Details of the transaction is listed below.',
                    meta: {
                      memberId: result?.memberId,
                      accountId: result?.accountId,
                      accountName: result?.accountName,
                      member: result?.memberName?.local,
                    },
                    dublicate: true,
                    showSignatures: true,
                  };
                }}
                errorCardProps={{
                  title: 'New Deposit Failed',
                }}
                onError={(error) => {
                  if (error.__typename === 'ValidationError') {
                    Object.keys(error.validationErrorMsg).map((key) =>
                      methods.setError(key as keyof DepositFormInput, {
                        message: error.validationErrorMsg[key][0] as string,
                      })
                    );
                  }
                }}
              >
                <Button width="160px">Add New Deposit</Button>
              </ResponseDialog>
            ) : undefined
          }
          status={
            mode === 0 ? (
              <Box display="flex" gap="s32">
                <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                  Total Payable Amount
                </Text>
                <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                  {amountConverter(totalPayable) ?? '---'}
                </Text>
              </Box>
            ) : (
              <Button variant="solid" onClick={() => setMode(0)}>
                {t['addDepositPrevious']}
              </Button>
            )
          }
          mainButtonLabel={mode === 0 ? t['addDepositProceedPayment'] : t['addDepositSubmit']}
          isMainButtonDisabled={checkIsSubmitButtonDisabled()}
          mainButtonHandler={mode === 0 ? methods.handleSubmit(() => setMode(1)) : handleSubmit}
        />
      </FormLayout>

      <InstallmentModel
        isOpen={isModalOpen}
        onClose={handleModalClose}
        accountId={selectedAccount?.accountId as string}
        productType={selectedAccount?.product?.nature}
        selectedAccount={selectedAccount as MemberAccountDetails}
      />
    </>
  );
};

export default AddDeposit;
