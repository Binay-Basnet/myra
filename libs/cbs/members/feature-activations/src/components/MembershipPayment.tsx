import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import { Box, Button, FormSection, Grid, GridItem, ResponseDialog, Text } from '@myra-ui';

import {
  DepositedBy,
  DepositPaymentType,
  MembershipPaymentInput,
  ObjState,
  PaymentDepositedBy,
  useGetAvailableSlipsListQuery,
  useGetMembershipFeeQuery,
  usePayMembershipMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
import { localizedDate } from '@coop/cbs/utils';
import { CashOptions, DenominationTable } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormAgentSelect,
  FormAmountInput,
  FormBankSelect,
  FormCheckbox,
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormLayout,
  FormMemberSelect,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type CashPaid =
  | {
      cash: string;
      disableDenomination: boolean;
      total: string;
      returned_amount: string;
      denominations: { value?: string; quantity?: number; amount?: string }[];
    }
  | undefined
  | null;

type CustomMembershipPaymentInput = Omit<MembershipPaymentInput, 'cashData'> & {
  cashData: CashPaid;
};

interface MembershipPaymentProps {
  setMode: Dispatch<SetStateAction<'details' | 'payment'>>;
}

export const MembershipPayment = ({ setMode }: MembershipPaymentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query['id'] as string;

  const [totalAmount, setTotalAmount] = useState('');

  const { mutateAsync: payFee } = usePayMembershipMutation();
  useGetMembershipFeeQuery(
    {
      memberID: id,
    },
    {
      enabled: !!id,
      onSuccess: (response) =>
        setTotalAmount(
          String(response?.members?.activateMember?.getMembershipFee?.data?.charge ?? 0)
        ),
    }
  );

  const methods = useForm<CustomMembershipPaymentInput>({
    defaultValues: {
      paymentMode: DepositPaymentType.Cash,
      cashData: {
        cash: String(totalAmount ?? 0),
        disableDenomination: true,
      },
      withdrawSlipData: {
        amount: String(totalAmount ?? 0),
      },
      bankDeposit: {
        amount: String(totalAmount ?? 0),
      },
    },
  });
  const { watch } = methods;

  const { t } = useTranslation();

  const selectedPaymentMode = watch('paymentMode');
  const disableDenomination = watch('cashData.disableDenomination');
  const denominations = watch('cashData.denominations');

  const denominationTotal =
    denominations?.reduce((accumulator, curr) => accumulator + Number(curr?.amount), 0 as number) ??
    0;

  const cashPaid = watch('cashData.cash');
  const totalCashPaid = Number((disableDenomination ? cashPaid : denominationTotal) ?? 0);
  const returnAmount = totalCashPaid - Number(totalAmount) ?? 0;

  const isDiffMember = watch('withdrawSlipData.isDifferentMember');
  const dmemberId = watch('withdrawSlipData.memberId');
  const depositedBy = watch('withdrawSlipData.depositedBy');

  const memberId = id;

  const paymentModes = [
    {
      label: t['depositPaymentCash'],
      value: DepositPaymentType.Cash,
    },
    {
      label: t['addWithdrawWithdrawSlip'],
      value: DepositPaymentType.WithdrawSlip,
    },
    {
      label: t['depositPaymentBankVoucher'],
      value: DepositPaymentType.BankVoucher,
    },
  ];

  const withdrawSlipAccountId = watch('withdrawSlipData.accountId');

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId: withdrawSlipAccountId },
    { enabled: !!withdrawSlipAccountId }
  );

  const availableSlipListOptions = useMemo(
    () =>
      availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.map((withdrawSlip) => ({
        label: String(withdrawSlip?.slipNumber).padStart(10, '0'),
        value: withdrawSlip?.slipNumber as string,
      })) ?? [],
    [availableSlipsListQueryData]
  );

  useEffect(() => {
    if (totalAmount) {
      methods.setValue('bankDeposit.amount', String(totalAmount));
      methods.setValue('cashData.cash', String(totalAmount));
      methods.setValue('withdrawSlipData.amount', String(totalAmount));
    }
  }, [totalAmount]);

  const onSubmit = () => {
    const values = methods.getValues();
    let updatedData;

    if (values.paymentMode === DepositPaymentType.Cash) {
      updatedData = {
        ...omit({ ...values }, ['withdrawSlipData', 'bankDeposit']),
        cashData: {
          ...values.cashData,
          disableDenomination: Boolean(values.cashData?.disableDenomination),
          total: String(totalCashPaid),
          returned_amount: String(returnAmount),
          denominations:
            values.cashData?.denominations?.map(({ value, quantity }) => ({
              value: CashOptions[value as string],
              quantity,
            })) ?? [],
        },
      };
    }

    if (values.paymentMode === DepositPaymentType.BankVoucher) {
      updatedData = {
        ...omit(values, ['withdrawSlipData', 'cashData']),
        bankDeposit: { ...values.bankDeposit },
      };
    }

    if (values.paymentMode === DepositPaymentType.WithdrawSlip) {
      updatedData = {
        ...omit(values, ['cashData', 'bankDeposit']),
        withdrawSlipData: { ...values.withdrawSlipData },
      };
    }

    // await asyncToast({
    //   id: 'membership-payment',
    //   msgs: {
    //     success: 'Paid for Membership',
    //     loading: 'Paying for Membership',
    //   },
    //   onSuccess: () => {
    //     if (values.paymentMode === DepositPaymentType.WithdrawSlip) {
    //       queryClient.invalidateQueries(['getAvailableSlipsList']);
    //       queryClient.invalidateQueries(['getPastSlipsList']);
    //     }
    //     queryClient.invalidateQueries(['getMemberCheck']);
    //     setMode('details');
    //   },
    //   promise: payFee({ memberId: id, data: updatedData as MembershipPaymentInput }),

    // });

    return updatedData as MembershipPaymentInput;
  };

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Membership Payment" />
      <FormLayout.Content>
        <FormLayout.Form>
          <Box display="flex" flexDirection="column" gap="s16">
            <Box px="s20" pt="s20">
              <FormSwitchTab
                label={t['depositPaymentPaymentMode']}
                options={paymentModes}
                name="paymentMode"
              />
            </Box>

            {selectedPaymentMode === DepositPaymentType.WithdrawSlip && (
              <Box>
                <GridItem colSpan={3} px="s20">
                  <FormCheckbox
                    name="withdrawSlipData.isDifferentMember"
                    label="Withdraw slip is from different member"
                  />
                </GridItem>

                <FormSection>
                  {isDiffMember && (
                    <GridItem colSpan={3}>
                      <FormMemberSelect name="withdrawSlipData.memberId" label="Member" />
                    </GridItem>
                  )}

                  <GridItem colSpan={2}>
                    <FormAccountSelect
                      name="withdrawSlipData.accountId"
                      memberId={String(isDiffMember ? dmemberId : memberId)}
                      label="Account Name"
                      filterBy={ObjState.Active}
                    />
                  </GridItem>

                  <FormSelect
                    name="withdrawSlipData.withdrawSlipNo"
                    label="Withdraw Slip No"
                    options={availableSlipListOptions}
                  />

                  <FormInput
                    name="withdrawSlipData.amount"
                    type="number"
                    label={t['depositPaymentAmount']}
                    textAlign="right"
                  />
                </FormSection>

                <FormSection flexLayout>
                  <Box display="flex" flexDir="column" gap="s16">
                    <FormSwitchTab
                      label="Deposited By"
                      name="withdrawSlipData.depositedBy"
                      options={[
                        {
                          label: t['depositPaymentSelf'],
                          value: DepositedBy.Self,
                        },
                        {
                          label: t['depositPaymentOther'],
                          value: DepositedBy.Other,
                        },
                        {
                          label: t['depositPaymentMarketRepresentative'],
                          value: DepositedBy.Agent,
                        },
                      ]}
                    />

                    {depositedBy === DepositedBy.Agent && (
                      <InputGroupContainer>
                        <FormAgentSelect
                          name="openingPayment.agentId"
                          label={t['depositPaymentMarketRepresentative']}
                        />
                      </InputGroupContainer>
                    )}
                  </Box>
                </FormSection>
              </Box>
            )}

            {selectedPaymentMode === DepositPaymentType.BankVoucher && (
              <Box>
                <Grid px="s20" templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20">
                  <GridItem colSpan={3}>
                    <FormBankSelect
                      name="bankDeposit.bankId"
                      label={t['depositPaymentBankName']}
                      currentBranchOnly
                    />
                  </GridItem>

                  <FormInput name="bankDeposit.voucherId" label={t['addDepositVoucherId']} />

                  <FormInput
                    name="bankDeposit.amount"
                    type="number"
                    label={t['depositPaymentAmount']}
                    textAlign="right"
                  />

                  <FormDatePicker
                    name="bankDeposit.depositedDate"
                    label={t['depositPaymentDepositedDate']}
                  />
                </Grid>
                <FormSection>
                  <FormSwitchTab
                    label="Deposited By"
                    name="bankDeposit.depositedBy"
                    options={[
                      {
                        label: t['depositPaymentSelf'],
                        value: PaymentDepositedBy.Self,
                      },
                      {
                        label: t['depositPaymentOther'],
                        value: PaymentDepositedBy.Other,
                      },
                    ]}
                  />
                </FormSection>
              </Box>
            )}

            {selectedPaymentMode === DepositPaymentType.Cash && (
              <>
                <Grid px="s20" templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20">
                  <FormAmountInput
                    name="cashData.cash"
                    type="number"
                    label={t['depositPaymentCash']}
                    textAlign="right"
                  />
                </Grid>
                <Box px="s20">
                  <Box display="flex" flexDir="column" gap="s8">
                    <FormSwitch
                      name="cashData.disableDenomination"
                      label={t['depositPaymentDisableDenomination']}
                      defaultChecked={false}
                    />

                    <GridItem colSpan={3}>
                      <DenominationTable
                        fieldName="cashData.denominations"
                        cashPaid={cashPaid ?? '0'}
                        totalCashPaid={totalCashPaid - returnAmount}
                        returnAmount={returnAmount}
                        denominationTotal={denominationTotal}
                        disableDenomination={disableDenomination}
                      />
                    </GridItem>
                  </Box>
                </Box>
              </>
            )}

            <FormSection templateColumns={2}>
              <FormInput name="sourceFund" label={t['depositPaymentSourceOfFund']} />
              <FormFileInput
                size="md"
                label={t['depositPaymentFileUpload']}
                name="doc_identifiers"
              />
            </FormSection>
            <FormSection flexLayout>
              <FormTextArea name="remark" label={t['depositPaymentNote']} rows={5} />
            </FormSection>
          </Box>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        status={
          <Button variant="outline" onClick={() => setMode('details')}>
            Previous
          </Button>
        }
        mainButton={
          <ResponseDialog
            onSuccess={() => {
              const values = methods.getValues();
              if (values.paymentMode === DepositPaymentType.WithdrawSlip) {
                queryClient.invalidateQueries(['getAvailableSlipsList']);
                queryClient.invalidateQueries(['getPastSlipsList']);
              }
              queryClient.invalidateQueries(['getMemberCheck']);
              setMode('details');
            }}
            promise={() =>
              payFee({
                memberId: id,
                data: onSubmit(),
              })
            }
            successCardProps={(response) => {
              const result = response?.members?.activateMember?.membershipPayment?.record;
              const total = result?.amount;

              return {
                type: 'Membership Payment',
                total: amountConverter(total || 0) as string,
                title: 'Membership Payment successful',
                details: {
                  'Transaction Id': (
                    <Text fontSize="s3" color="primary.500" fontWeight="600">
                      {result?.id}
                    </Text>
                  ),
                  'Member Name': (
                    <Text fontSize="s3" color="primary.500" fontWeight="600">
                      {result?.memberName?.local}
                    </Text>
                  ),
                  Date: localizedDate(result?.date),
                  'Payment Mode': result?.paymentMode,

                  'Deposited By':
                    result?.depositedBy === 'OTHER'
                      ? `Other --${result?.depositedOther}`
                      : result?.depositedBy,
                },
                subTitle:
                  'Membership Payment successfull. Details of the transaction is listed below.',
                meta: {
                  memberId: result?.memberCode,
                  member: result?.memberName?.local,
                },
                dublicate: true,
              };
            }}
            errorCardProps={{
              title: 'Payment Failed',
            }}
          >
            <Button width="160px">Confirm Payment</Button>
          </ResponseDialog>
        }
        mainButtonLabel="Confirm Payment"
        mainButtonHandler={onSubmit}
      />
    </FormLayout>
  );
};
