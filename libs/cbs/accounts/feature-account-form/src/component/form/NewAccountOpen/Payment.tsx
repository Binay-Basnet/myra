import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, GridItem } from '@myra-ui';

import {
  AccountOpenDepositVerify,
  DepositedBy,
  DepositPaymentType,
  ObjState,
  useGetAvailableSlipsListQuery,
} from '@coop/cbs/data-access';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import { DenominationTable } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormAgentSelect,
  FormAmountInput,
  FormBankSelect,
  FormCheckbox,
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormMemberSelect,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

// const sourceOfFundsList = [
//   'Personal Savings',
//   'Share Sales',
//   'Dividends',
//   'Property Sales',
//   'Inheritances',
//   'Compensation',
// ];

/* eslint-disable-next-line */
export interface PaymentProps {
  mode: number;
  totalAmount: number;
}

export const Payment = ({ mode, totalAmount }: PaymentProps) => {
  const { t } = useTranslation();

  const paymentModes = [
    {
      label: t['depositPaymentCash'],
      value: DepositPaymentType.Cash,
    },

    {
      label: t['depositPaymentBankVoucher'],
      value: DepositPaymentType.BankVoucher,
    },
    {
      label: 'Account',
      value: DepositPaymentType.WithdrawSlip,
    },
  ];

  const depositors = [
    {
      label: t['depositPaymentSelf'],
      value: DepositedBy.Self,
    },
    {
      label: t['depositPaymentMarketRepresentative'],
      value: DepositedBy.Agent,
    },
    {
      label: t['depositPaymentOther'],
      value: DepositedBy.Other,
    },
  ];

  const { watch, setValue } = useFormContext();

  useEffect(() => {
    if (totalAmount) {
      setValue('openingPayment.bankVoucher.amount', String(totalAmount));
      setValue('openingPayment.withdrawSlip.amount', String(totalAmount));
      setValue('openingPayment.cash.cashPaid', String(totalAmount));
    }
  }, [totalAmount]);

  const memberId = watch('memberId');

  const isDiffMember = watch('openingPayment.withdrawSlip.isDifferentMember');

  const dmemberId = watch('openingPayment.withdrawSlip.memberId');

  const selectedPaymentMode = watch('openingPayment.payment_type');

  const depositedBy = watch('openingPayment.depositedBy');

  const denominations = watch('openingPayment.cash.denominations');

  const withdrawSlipAccountId = watch('openingPayment.withdrawSlip.accId');
  const verifyWith = watch('openingPayment.withdrawSlip.verifyWith');

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

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('openingPayment.cash.disableDenomination');

  const cashPaid = watch('openingPayment.cash.cashPaid');

  const totalCashPaid = (disableDenomination ? cashPaid : denominationTotal) ?? 0;
  const returnAmount = totalCashPaid - totalAmount ?? 0;

  useEffect(() => {
    if (disableDenomination === undefined)
      setValue('openingPayment.cash.disableDenomination', true);
  });

  return (
    <ContainerWithDivider
      borderRight="1px"
      borderColor="border.layout"
      p="s16"
      display={mode === 1 ? 'flex' : 'none'}
      pb="100px"
    >
      <BoxContainer>
        <FormSwitchTab
          label={t['depositPaymentPaymentMode']}
          options={paymentModes}
          name="openingPayment.payment_type"
        />

        {selectedPaymentMode === DepositPaymentType.BankVoucher && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormBankSelect
                isRequired
                name="openingPayment.bankVoucher.bankId"
                label={t['depositPaymentBankName']}
                currentBranchOnly
              />
            </GridItem>

            <FormInput
              name="openingPayment.bankVoucher.voucherId"
              label={t['addDepositVoucherId']}
            />

            <FormAmountInput
              type="number"
              name="openingPayment.bankVoucher.amount"
              label={t['depositPaymentAmount']}
            />

            <FormDatePicker
              isRequired
              name="openingPayment.bankVoucher.depositedAt"
              label={t['depositPaymentDepositedDate']}
              maxToday
            />

            <FormInput
              isRequired
              type="text"
              name="openingPayment.bankVoucher.depositedBy"
              label={t['depositPaymentDepositedBy']}
            />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.WithdrawSlip && (
          <InputGroupContainer>
            <GridItem colSpan={3}>
              <FormCheckbox
                name="openingPayment.withdrawSlip.isDifferentMember"
                label="Withdraw slip is from different member"
              />
            </GridItem>

            {isDiffMember && (
              <GridItem colSpan={3}>
                <FormMemberSelect name="openingPayment.withdrawSlip.memberId" label="Member" />
              </GridItem>
            )}

            <GridItem colSpan={2}>
              <FormAccountSelect
                isRequired
                name="openingPayment.withdrawSlip.accId"
                memberId={isDiffMember ? dmemberId : memberId}
                label="Account Name"
                filterBy={ObjState.Active}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormSelect
                isRequired
                name="openingPayment.withdrawSlip.verifyWith"
                label="Verfiy with"
                options={[
                  { label: 'Withdraw Slip', value: AccountOpenDepositVerify?.WithdrawSlip },
                  { label: 'Other documents', value: AccountOpenDepositVerify?.OtherDocument },
                ]}
              />
            </GridItem>
            {verifyWith === AccountOpenDepositVerify?.WithdrawSlip && (
              <FormSelect
                isRequired
                name="openingPayment.withdrawSlip.withdrawSlipNo"
                label="Withdraw Slip No"
                options={availableSlipListOptions}
              />
            )}

            <FormAmountInput
              isRequired
              type="number"
              name="openingPayment.withdrawSlip.amount"
              label={t['depositPaymentAmount']}
            />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.Cash && (
          <>
            <InputGroupContainer>
              <FormAmountInput
                isRequired
                type="number"
                name="openingPayment.cash.cashPaid"
                label={t['depositPaymentCash']}
              />
            </InputGroupContainer>
            <FormSwitch
              name="openingPayment.cash.disableDenomination"
              label={t['depositPaymentDisableDenomination']}
              defaultChecked={false}
            />
            <GridItem colSpan={3}>
              <DenominationTable
                fieldName="openingPayment.cash.denominations"
                cashPaid={cashPaid ?? '0'}
                totalCashPaid={totalAmount}
                returnAmount={returnAmount}
                denominationTotal={denominationTotal}
                disableDenomination={disableDenomination}
              />
            </GridItem>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <Grid templateColumns="repeat(2, 1fr)" columnGap="s20">
          {/* <FormSelect
            name="openingPayment.sourceOfFund"
            label={t['depositPaymentSourceOfFund']}
            options={sourceOfFundsList.map((source) => ({
              label: source,
              value: source,
            }))}
          /> */}
          <FormInput name="openingPayment.sourceOfFund" label={t['depositPaymentSourceOfFund']} />

          <FormFileInput
            size="md"
            label={t['depositPaymentFileUpload']}
            name="openingPayment.doc_identifiers"
          />
        </Grid>
      </BoxContainer>

      <BoxContainer>
        <FormSwitchTab
          label={t['depositPaymentDepositedBy']}
          options={depositors}
          name="openingPayment.depositedBy"
        />

        {depositedBy === DepositedBy.Agent && (
          <InputGroupContainer>
            <FormAgentSelect
              name="openingPayment.agentId"
              label={t['depositPaymentMarketRepresentative']}
            />
          </InputGroupContainer>
        )}

        {depositedBy === DepositedBy.Other && (
          <>
            <InputGroupContainer>
              <FormInput name="openingPayment.other_name" label={t['depositPaymentName']} />
            </InputGroupContainer>

            <Box width="50%">
              <FormFileInput
                name="openingPayment.other_doc_identifiers"
                label={t['depositPaymentCitizenshipDocument']}
                size="md"
              />
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="openingPayment.notes" label={t['depositPaymentNote']} rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
