import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  CashValue,
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useSetWithdrawDataMutation,
  WithdrawBy,
  WithdrawInput,
  WithdrawPaymentType,
  WithdrawWith,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import {
  Alert,
  asyncToast,
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  FormAccountSelect,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { featureCode, useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

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

export const AddWithdraw = () => {
  const { t } = useTranslation();

  const accountTypes = {
    [NatureOfDepositProduct.Saving]: t['addDepositSaving'],
    [NatureOfDepositProduct.RecurringSaving]: t['addDepositRecurringSavingAccount'],
    [NatureOfDepositProduct.TermSavingOrFd]: t['addDepositTermSavingAccount'],
    [NatureOfDepositProduct.Current]: t['addDepositCurrent'],
  };

  const withdrawTypes = [
    { label: t['addWithdrawCheque'], value: WithdrawWith.Cheque },
    { label: t['addWithdrawWithdrawSlip'], value: WithdrawWith.WithdrawSlip },
  ];

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

  const { mutateAsync } = useSetWithdrawDataMutation();

  const memberId = watch('memberId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });

  useEffect(() => {
    resetField('accountId');
  }, [memberId]);

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
      accountListData?.account?.list?.edges?.find((account) => account.node?.id === accountId)
        ?.node,
    [accountId]
  );

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const withdrawn = watch('withdrawWith');

  const amountToBeWithdrawn = watch('amount') ?? 0;

  const totalWithdraw = useMemo(
    () => (amountToBeWithdrawn ? Number(amountToBeWithdrawn) - Number(FINE) : 0),
    [amountToBeWithdrawn]
  );

  const denominations = watch('cash.denominations');

  const denominationTotal =
    denominations?.reduce((accumulator, curr) => accumulator + Number(curr.amount), 0 as number) ??
    0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = Number(totalCashPaid) - Number(totalWithdraw);

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
            value: cashOptions[value as string],
            quantity,
          })) ?? [],
      };

      asyncToast({
        id: 'add-new-withdraw',
        msgs: {
          success: t['addWithdrawNewWithdrawAdded'],
          loading: t['addWithdrawAddingNewWithdraw'],
        },
        onSuccess: () => router.push('/transactions/withdraw/list'),
        promise: mutateAsync({ data: filteredValues as WithdrawInput }),
      });
    }

    if (values.payment_type === WithdrawPaymentType.BankCheque) {
      filteredValues = omit({ ...values }, ['cash', 'file', 'withdrawBy']);

      asyncToast({
        id: 'add-new-withdraw',
        msgs: {
          success: t['addWithdrawNewWithdrawAdded'],
          loading: t['addWithdrawAddingNewWithdraw'],
        },
        onSuccess: () => router.push('/transactions/withdraw/list'),
        promise: mutateAsync({ data: filteredValues as WithdrawInput }),
      });
    }
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`${t['addWithdrawNewWithdraw']} - ${featureCode?.newWithdraw}`}
            closeLink="/transactions/withdraw/list"
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)" display={mode === 0 ? 'flex' : 'none'}>
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
                  <FormMemberSelect name="memberId" label={t['addWithdrawMember']} />

                  {memberId && (
                    <FormAccountSelect
                      name="accountId"
                      label={t['addWithdrawSelectWithdrawAccount']}
                      memberId={memberId}
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

                  {memberId && accountId && (
                    <FormSwitchTab
                      name="withdrawWith"
                      label={t['addWithdrawWithdrawBy']}
                      options={withdrawTypes}
                    />
                  )}

                  {memberId && accountId && withdrawn === WithdrawWith.Cheque && (
                    <InputGroupContainer>
                      <FormInput name="chequeNo" label={t['addWithdrawChequeNo']} />
                    </InputGroupContainer>
                  )}

                  {memberId && accountId && withdrawn === WithdrawWith.WithdrawSlip && (
                    <InputGroupContainer>
                      <FormInput name="withdrawSlipNo" label={t['addWithdrawWithdrawSlipNo']} />
                    </InputGroupContainer>
                  )}

                  {memberId && accountId && (
                    <FormInput
                      type="number"
                      min={0}
                      name="amount"
                      label={t['addWithdrawWithdrawAmount']}
                      textAlign="right"
                      __placeholder="0.0"
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
                          {t['addWithdrawWithdrawAmount']}
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
                          {amountToBeWithdrawn}
                        </Text>
                      </Box>

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          {t['addWithdrawFine']}
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="danger.500">
                          {`- ${FINE}`}
                        </Text>
                      </Box>

                      <Box display="flex" justifyContent="space-between">
                        <Text fontSize="s3" fontWeight={500} color="gray.600">
                          {t['addWithdrawTotalWithdraw']}
                        </Text>

                        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
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
                              guaranteeBalance: selectedAccount?.guaranteedAmount ?? '0',
                              overdrawnBalance: selectedAccount?.overDrawnBalance ?? '0',
                              fine: selectedAccount?.dues?.fine ?? '0',
                              // branch: 'Kumaripati',
                              openDate: selectedAccount?.accountOpenedDate ?? 'N/A',
                              expiryDate: selectedAccount?.accountExpiryDate ?? 'N/A',
                              lastTransactionDate: selectedAccount?.lastTransactionDate ?? 'N/A',
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
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                      {t['addWithdrawTotalWithdrawAmount']}
                    </Text>
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                      {totalWithdraw ?? '---'}
                    </Text>
                  </Box>
                ) : (
                  <Button variant="solid" onClick={() => setMode(0)}>
                    {t['addWithdrawPrevious']}
                  </Button>
                )
              }
              mainButtonLabel={
                mode === 0 ? t['addWithdrawProceedToPayment'] : t['addWithdrawSubmit']
              }
              mainButtonHandler={mode === 0 ? () => setMode(1) : handleSubmit}
              isMainButtonDisabled={mode === 0 && !accountId}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddWithdraw;
