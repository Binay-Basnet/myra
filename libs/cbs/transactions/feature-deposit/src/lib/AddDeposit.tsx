import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import {
  Box,
  Button,
  Container,
  Divider,
  FormFooter,
  FormHeader,
  Grid,
  MemberCard,
  ResponseDialog,
  Text,
} from '@myra-ui';

import { SuspiciousTransaction } from '@coop/cbs/components';
import {
  CashValue,
  DateType,
  DepositAccount,
  DepositedBy,
  DepositInput,
  DepositPaymentType,
  InstallmentState,
  NatureOfDepositProduct,
  ObjState,
  useAppSelector,
  useGetAccountTableListQuery,
  useGetIndividualMemberDetails,
  useGetInstallmentsListDataQuery,
  useSetDepositDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { FormAccountSelect, FormAmountInput, FormInput, FormMemberSelect } from '@coop/shared/form';
import { amountConverter, decimalAdjust, featureCode, useTranslation } from '@coop/shared/utils';

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

export const AddDeposit = () => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const router = useRouter();

  const redirectMemberId = router.query['memberId'];

  const redirectAccountId = router.query['accountId'];

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
      payment_type: DepositPaymentType.Cash,
      cash: { disableDenomination: true },
      depositedBy: DepositedBy.Self,
    },
  });

  const { watch, reset, getValues } = methods;

  const memberId = watch('memberId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId: memberId || '' });

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

  const noOfInstallments = watch('noOfInstallments');

  useEffect(() => {
    reset({ memberId, accountId: '', voucherId: '', noOfInstallments: null });
  }, [memberId]);

  const accountId = watch('accountId');

  useEffect(() => {
    reset({ memberId, accountId, voucherId: '', noOfInstallments: null });
  }, [accountId]);

  const selectedAccount = useMemo(
    () =>
      accountListData?.account?.list?.edges?.find((account) => account.node?.id === accountId)
        ?.node,
    [accountId, accountListData]
  );

  const FINE = useMemo(() => selectedAccount?.dues?.fine ?? '0', [selectedAccount]);

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

  const { firstMonth, lastMonth, fine, rebate } = useMemo(() => {
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

    const tempFine = pendingInstallments.reduce(
      (accumulator, curr) => accumulator + Number(curr?.fine),
      0
    );
    const tempRebate = pendingInstallments.reduce(
      (accumulator, curr) => accumulator + Number(curr?.rebate),
      0
    );

    return {
      firstMonth:
        preferenceDate === DateType.Bs
          ? pendingInstallments[0]?.monthName?.np
          : pendingInstallments[0]?.monthName?.en,
      lastMonth:
        preferenceDate === DateType.Bs
          ? pendingInstallments[pendingInstallments.length - 1]?.monthName?.np
          : pendingInstallments[pendingInstallments.length - 1]?.monthName?.en,
      fine: decimalAdjust('ceil', tempFine, -2),
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
    () =>
      amountToBeDeposited
        ? Number(amountToBeDeposited) + Number(fine ?? FINE) + Number(rebate ?? REBATE)
        : 0,
    [amountToBeDeposited]
  );

  const returnAmount =
    selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
    selectedAccount?.product?.isMandatorySaving
      ? 0
      : Number(totalCashPaid) - totalDeposit;

  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...values,
      fine: String(fine ?? FINE),
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
            value: cashOptions[value as string],
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

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`${t['addDepositNewDeposit']} - ${featureCode?.newDeposit}`}
            buttonLabel={t['addDepositAddBulkDeposit']}
            buttonHandler={() => router.push(ROUTES.CBS_TRANS_BULK_DEPOSIT_ADD)}
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
                  borderRight="1px"
                  borderColor="border.layout"
                >
                  <FormMemberSelect isRequired name="memberId" label="Member" />

                  {memberId && (
                    <FormAccountSelect
                      isRequired
                      name="accountId"
                      label={t['addDepositSelectDepositAccount']}
                      memberId={memberId}
                      filterBy={ObjState.Active}
                    />
                  )}

                  {accountId &&
                    (selectedAccount?.product?.nature === NatureOfDepositProduct.RecurringSaving ||
                      (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                        selectedAccount?.product?.isMandatorySaving)) && (
                      <>
                        <Grid templateColumns="repeat(2, 1fr)" gap="s24" alignItems="flex-end">
                          <FormInput isRequired name="voucherId" label="Deposit Slip No" />

                          <Box />

                          <FormInput
                            isRequired
                            name="noOfInstallments"
                            label={t['addDepositNoOfInstallments']}
                          />

                          <Box>
                            <Button variant="outline" onClick={handleModalOpen}>
                              {t['addDepositViewAllInstallments']}
                            </Button>
                          </Box>
                        </Grid>

                        <SuspiciousTransaction />

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontSize="s3" fontWeight="Medium" color="neutralColorLight.Gray-70">
                            {t['addDepositPaymentRange']}
                          </Text>
                          <Text
                            fontSize="s3"
                            fontWeight="Regular"
                            color="neutralColorLight.Gray-70"
                          >
                            {`Payment made from ${firstMonth} to ${lastMonth}`}
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    (selectedAccount?.product?.nature === NatureOfDepositProduct.Current ||
                      (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                        !selectedAccount?.product?.isMandatorySaving) ||
                      selectedAccount?.product?.nature ===
                        NatureOfDepositProduct.TermSavingOrFd) && (
                      <>
                        <Grid templateColumns="repeat(2, 1fr)" gap="s24" alignItems="flex-start">
                          <FormInput isRequired name="voucherId" label="Deposit Slip No" />

                          <FormAmountInput
                            isRequired
                            type="number"
                            name="amount"
                            label={t['addDepositAmountToBeDeposited']}
                          />
                        </Grid>

                        <SuspiciousTransaction />

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
                            {t['addDepositTotalAmountAfterDeposit']}
                          </Text>
                          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
                            {`${t['rs']} ${amountConverter(
                              Number(selectedAccount?.balance ?? 0) + Number(totalDeposit)
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
                              {`+ ${amountConverter(fine ?? FINE)}`}
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

                {memberDetailData && (
                  <Box>
                    <MemberCard
                      memberDetails={{
                        name: memberDetailData?.name,
                        avatar: memberDetailData?.profilePicUrl ?? '',
                        code: memberDetailData?.code,
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
                              fine: fine ?? FINE,
                              // branch: 'Kumaripati',
                              openDate: selectedAccount?.accountOpenedDate ?? 'N/A',
                              expiryDate: selectedAccount?.accountExpiryDate ?? 'N/A',
                              lastTransactionDate: selectedAccount?.lastTransactionDate ?? 'N/A',
                              productName: selectedAccount?.product?.productName,
                              installmentAmount:
                                selectedAccount?.product?.nature ===
                                  NatureOfDepositProduct.RecurringSaving ||
                                (selectedAccount?.product?.nature ===
                                  NatureOfDepositProduct.Saving &&
                                  selectedAccount?.product?.isMandatorySaving)
                                  ? selectedAccount?.installmentAmount
                                  : null,
                            }
                          : null
                      }
                    />
                  </Box>
                )}
              </Box>

              <Payment
                mode={mode}
                totalDeposit={rebate ? Number(totalDeposit) - Number(rebate) : Number(totalDeposit)}
                // rebate={Number(rebate ?? 0)}
                // selectedAccount={selectedAccount as DepositAccount}
              />
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
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

                      return {
                        type: 'Deposit',
                        total: amountConverter(result?.amount || 0) as string,
                        title: 'Deposit Successful',
                        details: {
                          'Transaction Id': (
                            <Text fontSize="s3" color="primary.500" fontWeight="600">
                              {result?.transactionID}
                            </Text>
                          ),
                          Date: localizedDate(result?.date),
                          'Deposit Amount': amountConverter(result?.amount || 0),
                          Rebate: amountConverter(result?.rebate || 0),
                          'Payment Mode': result?.paymentMode,
                          'Deposited By': result?.depositedBy,
                        },
                        subTitle:
                          'Amount deposited successfully. Details of the transaction is listed below.',
                        meta: {
                          memberId: result?.memberId,
                          accountId: result?.accountId,
                          accountName: result?.accountName,
                          member: result?.memberName?.local,
                        },
                      };
                    }}
                    errorCardProps={{
                      title: 'New Deposit Failed',
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
                      {t['addDepositTotalDepositAmount']}
                    </Text>
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                      {amountConverter(totalDeposit) ?? '---'}
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
              mainButtonHandler={mode === 0 ? () => setMode(1) : handleSubmit}
            />
          </Container>
        </Box>
      </Box>

      <InstallmentModel
        isOpen={isModalOpen}
        onClose={handleModalClose}
        accountId={selectedAccount?.id}
        productType={selectedAccount?.product?.nature}
        selectedAccount={selectedAccount as DepositAccount}
      />
    </>
  );
};

export default AddDeposit;
