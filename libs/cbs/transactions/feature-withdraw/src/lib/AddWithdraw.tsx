import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import { Alert, Box, Button, MemberCard, ResponseDialog, Text } from '@myra-ui';

import { SuspiciousTransaction } from '@coop/cbs/components';
import {
  AccountObjState,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  useGetAccountDetailsDataQuery,
  useGetAvailableSlipsListQuery,
  useGetIndividualMemberDetails,
  useSetWithdrawDataMutation,
  WithdrawBy,
  WithdrawInput,
  WithdrawPaymentType,
  WithdrawWith,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { localizedDate, localizedTime, ROUTES } from '@coop/cbs/utils';
import { CashOptions } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormAmountInput,
  FormInput,
  FormLayout,
  FormMemberSelect,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  amountConverter,
  amountToWordsConverter,
  featureCode,
  useTranslation,
} from '@coop/shared/utils';

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

const withdranByObj: Record<WithdrawBy, string> = {
  [WithdrawBy.Agent]: 'Market Representative',
  [WithdrawBy.Other]: 'Other',
  [WithdrawBy.Self]: 'Self',
};

/* eslint-disable-next-line */
export interface AddWithdrawProps {}

export const AddWithdraw = () => {
  // const queryClient = useQueryClient();

  const { t } = useTranslation();

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const withdrawTypes = [
    { label: t['addWithdrawWithdrawSlip'], value: WithdrawWith.WithdrawSlip },
    { label: 'Counter Slip', value: WithdrawWith.CounterSlip },
  ];

  const router = useRouter();

  const methods = useForm<WithdrawFormInput>({
    defaultValues: {
      payment_type: WithdrawPaymentType.Cash,
      cash: { disableDenomination: true },
      withdrawnBy: WithdrawBy.Self,
      withdrawWith: WithdrawWith.WithdrawSlip,
    },
  });

  const { watch, resetField, getValues } = methods;

  const { mutateAsync } = useSetWithdrawDataMutation();

  const memberId = watch('memberId');

  const { memberDetailData, memberCitizenshipUrl } = useGetIndividualMemberDetails({ memberId });

  useEffect(() => {
    resetField('accountId');
  }, [memberId]);

  const accountId = watch('accountId');

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId },
    { enabled: !!accountId }
  );

  const availableSlipListOptions = useMemo(
    () =>
      availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.map((withdrawSlip) => ({
        label: String(withdrawSlip?.slipNumber).padStart(10, '0'),
        value: withdrawSlip?.slipNumber as string,
      })) ?? [],
    [availableSlipsListQueryData]
  );

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: accountId as string },
    { enabled: !!accountId }
  );

  const selectedAccount = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data,
    [accountDetailQueryData]
  );

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const withdrawn = watch('withdrawWith');

  const withdrawSlipNo = watch('withdrawSlipNo');

  const counterSlipNo = watch('counterSlipNo');

  const amountToBeWithdrawn = watch('amount') ?? 0;

  const paymentType = watch('payment_type');

  const fine = useMemo(() => {
    if (!amountToBeWithdrawn) {
      return 0;
    }

    if (selectedAccount?.product?.withdrawRestricted) {
      return 0;
    }

    const withdrawPenalty = selectedAccount?.product?.withdrawPenalty;

    let tempFine = 0;

    if (withdrawPenalty?.penaltyAmount) {
      tempFine += Number(withdrawPenalty?.penaltyAmount);
    }

    if (withdrawPenalty?.penaltyRate) {
      tempFine += Number(withdrawPenalty.penaltyRate / 100) * Number(amountToBeWithdrawn);
    }

    return tempFine;
  }, [amountToBeWithdrawn, selectedAccount]);

  const totalWithdraw = useMemo(
    () => (amountToBeWithdrawn ? Number(amountToBeWithdrawn) - fine : 0),
    [amountToBeWithdrawn, fine]
  );

  const denominations = watch('cash.denominations');

  const denominationTotal =
    denominations?.reduce((accumulator, curr) => accumulator + Number(curr.amount), 0 as number) ??
    0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = Number(totalCashPaid) - Number(totalWithdraw);

  const bankChequeAmount = watch('bankCheque.amount');

  const handleSubmit = () => {
    const values = getValues();

    let filteredValues;

    if (values.payment_type === WithdrawPaymentType.Cash) {
      filteredValues = omit({ ...values }, ['bankCheque', 'file', 'withdrawBy']);

      filteredValues['cash'] = {
        ...values['cash'],
        cashPaid: values.cash?.cashPaid as string,
        disableDenomination: Boolean(values.cash?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        denominations:
          filteredValues['cash']?.['denominations']?.map(({ value, quantity }) => ({
            value: CashOptions[value as string],
            quantity,
          })) ?? [],
      };

      // asyncToast({
      //   id: 'add-new-withdraw',
      //   msgs: {
      //     success: t['addWithdrawNewWithdrawAdded'],
      //     loading: t['addWithdrawAddingNewWithdraw'],
      //   },
      //   onSuccess: () => {
      //     if (values.withdrawWith === WithdrawWith.WithdrawSlip) {
      //       queryClient.invalidateQueries(['getAvailableSlipsList']);
      //       queryClient.invalidateQueries(['getPastSlipsList']);
      //     }
      //     queryClient.invalidateQueries(['getWithdrawListData']);
      //     router.push('/transactions/withdraw/list');
      //   },
      //   promise: mutateAsync({ data: filteredValues as WithdrawInput }),
      // });
    }

    if (values.payment_type === WithdrawPaymentType.BankCheque) {
      filteredValues = omit({ ...values }, ['cash', 'file', 'withdrawBy']);

      // asyncToast({
      //   id: 'add-new-withdraw',
      //   msgs: {
      //     success: t['addWithdrawNewWithdrawAdded'],
      //     loading: t['addWithdrawAddingNewWithdraw'],
      //   },
      //   onSuccess: () => {
      //     if (values.withdrawWith === WithdrawWith.WithdrawSlip) {
      //       queryClient.invalidateQueries(['getAvailableSlipsList']);
      //       queryClient.invalidateQueries(['getPastSlipsList']);
      //     }
      //     queryClient.invalidateQueries(['getWithdrawListData']);
      //     router.push('/transactions/withdraw/list');
      //   },
      //   promise: mutateAsync({ data: filteredValues as WithdrawInput }),
      // });
    }
    return filteredValues as WithdrawInput;
  };
  //  get redirect id from url
  const redirectMemberId = router.query['memberId'];
  const redirectAccountId = router.query['accountId'];

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

  const isSuspicious = watch('isSuspicious');

  const suspicionRemarks = watch('suspicionRemarks');

  const checkIsSubmitButtonDisabled = () => {
    if (mode === 0) {
      if (selectedAccount?.product?.withdrawRestricted) {
        return true;
      }

      if (!totalWithdraw) {
        return true;
      }

      if (withdrawn === WithdrawWith.WithdrawSlip && !withdrawSlipNo) {
        return true;
      }

      if (withdrawn === WithdrawWith.CounterSlip && !counterSlipNo) {
        return true;
      }

      if (isSuspicious) {
        return !suspicionRemarks;
      }
    }

    if (paymentType === WithdrawPaymentType.Cash && Number(totalCashPaid) < Number(totalWithdraw)) {
      return true;
    }

    if (
      paymentType === WithdrawPaymentType.BankCheque &&
      Number(bankChequeAmount) < totalWithdraw
    ) {
      return true;
    }

    return false;
  };

  return (
    <FormLayout methods={methods} hasSidebar={Boolean(memberId && mode === 0)}>
      <FormLayout.Header title={`${t['addWithdrawNewWithdraw']} - ${featureCode?.newWithdraw}`} />

      <FormLayout.Content>
        <FormLayout.Form>
          <Box display={mode === 0 ? 'flex' : 'none'}>
            <Box p="s16" width="100%" display="flex" flexDirection="column" gap="s24">
              <FormMemberSelect
                isRequired
                name="memberId"
                label={t['addWithdrawMember']}
                isDisabled={!!redirectMemberId}
              />
              {memberId && (
                <FormAccountSelect
                  isRequired
                  name="accountId"
                  label={t['addDepositSelectDepositAccount']}
                  memberId={memberId}
                  natureOfDepositProduct={[
                    NatureOfDepositProduct?.Current,
                    NatureOfDepositProduct?.RecurringSaving,
                    NatureOfDepositProduct?.Saving,
                  ]}
                  filterBy={AccountObjState?.Active}
                  includeLoc
                  isDisabled={!!redirectAccountId}
                />
              )}
              {selectedAccount?.product?.withdrawRestricted && (
                <Alert
                  status="info"
                  hideCloseIcon
                  title="Withdraw Restricted"
                  subtitle="Withdraw is restricted for this account."
                />
              )}
              {memberId && accountId && !selectedAccount?.product?.withdrawRestricted && (
                <>
                  <FormSwitchTab
                    name="withdrawWith"
                    label={t['addWithdrawWithdrawBy']}
                    options={withdrawTypes}
                  />

                  {withdrawn === WithdrawWith.WithdrawSlip && (
                    <InputGroupContainer>
                      <FormSelect
                        isRequired
                        name="withdrawSlipNo"
                        label="Withdraw Slip No"
                        options={availableSlipListOptions}
                      />
                    </InputGroupContainer>
                  )}

                  {withdrawn === WithdrawWith.CounterSlip && (
                    <InputGroupContainer>
                      <FormInput isRequired name="counterSlipNo" label="Counter Slip No" />
                    </InputGroupContainer>
                  )}

                  <FormAmountInput
                    isRequired
                    type="number"
                    min={0}
                    name="amount"
                    label={t['addWithdrawWithdrawAmount']}
                  />

                  {memberDetailData?.type === KymMemberTypesEnum.Individual && (
                    <SuspiciousTransaction />
                  )}

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
                        {t['addWithdrawWithdrawAmount']}
                      </Text>

                      <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
                        {amountConverter(amountToBeWithdrawn)}
                      </Text>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={500} color="gray.600">
                        {t['addWithdrawFine']}
                      </Text>

                      <Text fontSize="s3" fontWeight={500} color="danger.500">
                        {`- ${amountConverter(fine)}`}
                      </Text>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Text fontSize="s3" fontWeight={500} color="gray.600">
                        {t['addWithdrawTotalWithdraw']}
                      </Text>

                      <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
                        {amountConverter(totalWithdraw)}
                      </Text>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          <Payment mode={mode} totalWithdraw={totalWithdraw} />
        </FormLayout.Form>

        {memberId && mode === 0 && (
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
                dateJoined: memberDetailData?.dateJoined,
                // branch: 'Basantapur',
                phoneNo: memberDetailData?.contact,
                email: memberDetailData?.email,
                address: memberDetailData?.address,
              }}
              // notice="KYM needs to be updated"
              signaturePath={selectedAccount?.member?.signaturePicUrl ?? ''}
              showSignaturePreview
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
                      fine: selectedAccount?.dues?.fine ?? '0',
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
                router.push(ROUTES.CBS_TRANS_WITHDRAW_LIST);
              }}
              promise={() => mutateAsync({ data: handleSubmit() })}
              successCardProps={(response) => {
                const result = response?.transaction?.withdraw?.record;

                return {
                  type: 'Withdraw',
                  receiptTitle: 'Withdraw Receipt',
                  total: amountConverter(result?.amount || 0) as string,
                  totalWords: amountToWordsConverter(result?.amount || 0),
                  title: 'Withdraw Successful',
                  details: {
                    'Transaction Id': (
                      <Text fontSize="s3" color="primary.500" fontWeight="600">
                        {result?.transactionID}
                      </Text>
                    ),
                    Date: localizedDate(result?.date),
                    'Transaction Time': localizedTime(result?.createdAt),
                    'Withdraw Amount': amountConverter(result?.amount || 0),
                    Fine: amountConverter(result?.fine || '0'),
                    'Payment Mode': result?.paymentMode,
                    'Withdraw By': `${result?.withdrawWith} (${
                      result?.withdrawWith === WithdrawWith.WithdrawSlip
                        ? result?.slipNo?.padStart(10, '0') ?? 'N/A'
                        : result?.slipNo ?? 'N/A'
                    })`,
                    'Withdrawn By': result?.withdrawOther
                      ? `${withdranByObj[result?.withdrawnBy as WithdrawBy]}-(${
                          result?.withdrawOther
                        })`
                      : withdranByObj[result?.withdrawnBy as WithdrawBy],

                    // ...(isWithdrawOther && { 'Withdrawer Name': result?.withdrawOther }),
                  },
                  subTitle:
                    'Amount withdrawn successfully. Details of the transaction is listed below.',
                  meta: {
                    memberId: result?.memberId,
                    accountId: result?.accountId,
                    accountName: result?.accountName,
                    member: result?.memberName?.local,
                  },
                  dublicate: true,
                };
              }}
              errorCardProps={{
                title: 'New Withdraw Failed',
              }}
            >
              <Button width="160px">{t['addWithdrawSubmit']}</Button>
            </ResponseDialog>
          ) : undefined
        }
        status={
          mode === 0 ? (
            <Box display="flex" gap="s32">
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                {t['addWithdrawTotalWithdrawAmount']}
              </Text>
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                {amountConverter(totalWithdraw) ?? '---'}
              </Text>
            </Box>
          ) : (
            <Button variant="solid" onClick={() => setMode(0)}>
              {t['addWithdrawPrevious']}
            </Button>
          )
        }
        mainButtonLabel={mode === 0 ? t['addWithdrawProceedToPayment'] : t['addWithdrawSubmit']}
        mainButtonHandler={mode === 0 ? () => setMode(1) : handleSubmit}
        isMainButtonDisabled={checkIsSubmitButtonDisabled()}
      />
    </FormLayout>
  );
};

export default AddWithdraw;
