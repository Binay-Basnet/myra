import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  CashValue,
  DepositAccount,
  DepositedBy,
  DepositInput,
  DepositPaymentType,
  InstallmentState,
  NatureOfDepositProduct,
  ObjState,
  useGetAccountTableListQuery,
  useGetInstallmentsListDataQuery,
  useSetDepositDataMutation,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  Divider,
  FormAccountSelect,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  Grid,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { featureCode, useGetIndividualMemberDetails, useTranslation } from '@coop/shared/utils';

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
  const router = useRouter();

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
      cash: { disableDenomination: false },
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
    [accountId]
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

  const chequeAmount = watch('cheque.amount');

  const bankVoucherAmount = watch('bankVoucher.amount');

  const selectedPaymentMode = watch('payment_type');

  const checkIsSubmitButtonDisabled = () => {
    if (mode === 0) {
      return false;
    }

    if (selectedPaymentMode === DepositPaymentType.Cash) {
      if (rebate && Number(totalCashPaid ?? 0) < Number(amountToBeDeposited)) {
        return true;
      }

      if (!rebate && Number(totalCashPaid ?? 0) < Number(totalDeposit)) return true;
    }

    if (
      selectedPaymentMode === DepositPaymentType.BankVoucher &&
      Number(bankVoucherAmount ?? 0) < Number(totalDeposit)
    ) {
      return true;
    }

    if (
      selectedPaymentMode === DepositPaymentType.Cheque &&
      Number(chequeAmount ?? 0) < Number(totalDeposit)
    ) {
      return true;
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
      firstMonth: pendingInstallments[0]?.monthName,
      lastMonth: pendingInstallments[pendingInstallments.length - 1]?.monthName,
      fine: String(tempFine),
      rebate: String(tempRebate),
    };
  }, [noOfInstallments, installmentsListQueryData]);

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
      fine: fine ?? FINE,
      rebate: rebate ?? REBATE,
    };

    if (values.payment_type === DepositPaymentType.Cash) {
      filteredValues = omit({ ...filteredValues }, ['cheque', 'bankVoucher']);
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
      filteredValues = omit({ ...filteredValues }, ['cheque', 'cash']);
    }

    if (values.payment_type === DepositPaymentType.Cheque) {
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

        if (values.payment_type === DepositPaymentType.Cheque) {
          filteredValues.amount = filteredValues?.cheque?.amount;
        }
      }
    }

    asyncToast({
      id: 'add-new-deposit',
      msgs: {
        success: t['addDepositNewDepositAdded'],
        loading: t['addDepositAddingNewDeposit'],
      },
      promise: mutateAsync({ data: filteredValues as DepositInput }),
      onSuccess: () => {
        queryClient.invalidateQueries('getDepositListData');
        router.push('/transactions/deposit/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title={`${t['addDepositNewDeposit']} - ${featureCode?.newDeposit}`}
            closeLink="/transactions/deposit/list"
            buttonLabel={t['addDepositAddBulkDeposit']}
            buttonHandler={() => router.push('/transactions/deposit/add-bulk-deposit')}
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
                  <FormMemberSelect name="memberId" label="Member" />

                  {memberId && (
                    <FormAccountSelect
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
                          <FormInput name="voucherId" label={t['addDepositVoucherId']} />

                          <Box />

                          <FormInput
                            name="noOfInstallments"
                            label={t['addDepositNoOfInstallments']}
                          />

                          <Box>
                            <Button variant="outline" onClick={handleModalOpen}>
                              {t['addDepositViewAllInstallments']}
                            </Button>
                          </Box>
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
                            {t['addDepositPaymentRange']}
                          </Text>
                          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
                            {`Payment made from ${firstMonth} to ${lastMonth}`}
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    selectedAccount?.product?.nature === NatureOfDepositProduct.TermSavingOrFd && (
                      <>
                        <Grid templateColumns="repeat(2, 1fr)" gap="s24" alignItems="flex-end">
                          <FormInput name="voucherId" label={t['addDepositVoucherId']} />

                          <FormInput
                            name="amount"
                            textAlign="right"
                            type="number"
                            min={0}
                            label={t['addDepositAmountToBeDeposited']}
                          />
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
                            {t['addDepositTotalAmountAfterDeposit']}
                          </Text>
                          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
                            {`${t['rs']} ${
                              Number(selectedAccount?.balance ?? 0) + Number(totalDeposit)
                            }`}
                          </Text>
                        </Box>
                      </>
                    )}

                  {accountId &&
                    (selectedAccount?.product?.nature === NatureOfDepositProduct.Current ||
                      (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
                        !selectedAccount?.product?.isMandatorySaving)) && (
                      <>
                        <Grid templateColumns="repeat(2, 1fr)" gap="s24" alignItems="flex-end">
                          <FormInput name="voucherId" label={t['addDepositVoucherId']} />

                          <FormInput name="amount" label={t['addDepositAmountToBeDeposited']} />
                        </Grid>

                        <Box display="flex" flexDirection="column" gap="s4">
                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
                            {t['addDepositTotalAmountAfterDeposit']}
                          </Text>
                          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
                            {`${t['rs']} ${
                              Number(selectedAccount?.balance ?? 0) + Number(totalDeposit)
                            }`}
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
                            {amountToBeDeposited}
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
                              {`+ ${fine ?? FINE}`}
                            </Text>
                          </Box>
                        )}

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            {t['addDepositRebate']}
                          </Text>

                          <Text fontSize="s3" fontWeight={500} color="success.500">
                            {`+ ${rebate ?? REBATE}`}
                          </Text>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                          <Text fontSize="s3" fontWeight={500} color="gray.600">
                            {t['addDepositTotalDeposit']}
                          </Text>

                          <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
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
                              fine: fine ?? FINE,
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

              <Payment
                mode={mode}
                totalDeposit={rebate ? Number(totalDeposit) - Number(rebate) : Number(totalDeposit)}
                rebate={Number(rebate ?? 0)}
                selectedAccount={selectedAccount as DepositAccount}
              />
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
                      {t['addDepositTotalDepositAmount']}
                    </Text>
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                      {totalDeposit ?? '---'}
                    </Text>
                  </Box>
                ) : (
                  <Button variant="solid" onClick={() => setMode(0)}>
                    {t['addDepositPrevious']}
                  </Button>
                )
              }
              mainButtonLabel={mode === 0 ? t['addDepositProceedPayment'] : t['addDepositSubmit']}
              isMainButtonDisabled={mode === 0 ? !accountId : checkIsSubmitButtonDisabled()}
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
