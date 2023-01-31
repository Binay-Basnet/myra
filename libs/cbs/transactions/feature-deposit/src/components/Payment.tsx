import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, GridItem } from '@myra-ui';

import {
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
  totalDeposit: number;
  // rebate: number;
  // selectedAccount?: DepositAccount;
}

export const Payment = ({ mode, totalDeposit }: PaymentProps) => {
  const { t } = useTranslation();

  const paymentModes = [
    {
      label: t['depositPaymentCash'],
      value: DepositPaymentType.Cash,
    },
    {
      label: 'Withdraw Slip',
      value: DepositPaymentType.WithdrawSlip,
    },
    {
      label: t['depositPaymentBankVoucher'],
      value: DepositPaymentType.BankVoucher,
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

  const accountId = watch('accountId');

  useEffect(() => {
    if (totalDeposit) {
      setValue('cash.cashPaid', String(totalDeposit));
      setValue('withdrawSlip.amount', String(totalDeposit));
      setValue('bankVoucher.amount', String(totalDeposit));
    }
  }, [totalDeposit]);

  const memberId = watch('memberId');

  const isDiffMember = watch('withdrawSlip.isDifferentMember');

  const dmemberId = watch('withdrawSlip.memberId');

  const selectedPaymentMode = watch('payment_type');

  const depositedBy = watch('depositedBy');

  const denominations = watch('cash.denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = totalCashPaid - totalDeposit;

  const withdrawSlipAccountId = watch('withdrawSlip.accId');

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
    if (watch('cash.disableDenomination') === undefined) setValue('cash.disableDenomination', true);
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
          name="payment_type"
        />
        {selectedPaymentMode === DepositPaymentType.BankVoucher && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              {/* <FormSelect
                name="bankVoucher.bankId"
                label={t['depositPaymentBankName']}
                options={bankList}
              /> */}
              <FormBankSelect
                isRequired
                name="bankVoucher.bankId"
                label={t['depositPaymentBankName']}
                currentBranchOnly
              />
            </GridItem>

            <FormInput isRequired name="bankVoucher.voucherId" label={t['addDepositVoucherId']} />

            <FormAmountInput
              type="number"
              name="bankVoucher.amount"
              label={t['depositPaymentAmount']}
            />

            <FormDatePicker
              isRequired
              name="bankVoucher.depositedAt"
              label={t['depositPaymentDepositedDate']}
              maxToday
            />

            <FormInput
              isRequired
              type="text"
              name="bankVoucher.depositedBy"
              label={t['depositPaymentDepositedBy']}
            />
          </InputGroupContainer>
        )}
        {selectedPaymentMode === DepositPaymentType.WithdrawSlip && (
          <InputGroupContainer>
            <GridItem colSpan={3}>
              <FormCheckbox
                name="withdrawSlip.isDifferentMember"
                label="Withdraw Slip is from different member"
              />
            </GridItem>

            {isDiffMember && (
              <GridItem colSpan={3}>
                <FormMemberSelect isRequired name="withdrawSlip.memberId" label="Member" />
              </GridItem>
            )}

            <GridItem colSpan={2}>
              <FormAccountSelect
                isRequired
                name="withdrawSlip.accId"
                memberId={isDiffMember ? dmemberId : memberId}
                label="Account Name"
                filterBy={ObjState.Active}
                excludeIds={[accountId]}
              />
            </GridItem>

            <FormSelect
              isRequired
              name="withdrawSlip.withdrawSlipNo"
              label="Withdraw Slip No."
              options={availableSlipListOptions}
            />

            <FormAmountInput
              type="number"
              name="withdrawSlip.amount"
              label={t['depositPaymentAmount']}
            />
          </InputGroupContainer>
        )}
        {selectedPaymentMode === DepositPaymentType.Cash && (
          <>
            <InputGroupContainer>
              <FormAmountInput isRequired name="cash.cashPaid" label={t['depositPaymentCash']} />
            </InputGroupContainer>
            <FormSwitch
              name="cash.disableDenomination"
              label={t['depositPaymentDisableDenomination']}
            />

            <GridItem colSpan={3}>
              <DenominationTable
                fieldName="cash.denominations"
                cashPaid={cashPaid ?? '0'}
                totalCashPaid={totalDeposit}
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
            name="sourceOfFund"
            label={t['depositPaymentSourceOfFund']}
            options={sourceOfFundsList.map((source) => ({
              label: source,
              value: source,
            }))}
          /> */}
          <FormInput name="sourceOfFund" label={t['depositPaymentSourceOfFund']} />

          <FormFileInput size="md" label={t['depositPaymentFileUpload']} name="doc_identifiers" />
        </Grid>
      </BoxContainer>
      <BoxContainer>
        <FormSwitchTab
          label={t['depositPaymentDepositedBy']}
          options={depositors}
          name="depositedBy"
        />

        {depositedBy === DepositedBy.Agent && (
          <InputGroupContainer>
            <FormAgentSelect name="agentId" label={t['depositPaymentMarketRepresentative']} />
          </InputGroupContainer>
        )}

        {depositedBy === DepositedBy.Other && (
          <>
            <InputGroupContainer>
              <FormInput name="other_name" label={t['depositPaymentName']} />
            </InputGroupContainer>

            <Box width="50%">
              <FormFileInput
                name="other_doc_identifiers"
                label={t['depositPaymentCitizenshipDocument']}
                size="md"
              />
            </Box>
          </>
        )}
      </BoxContainer>
      <BoxContainer>
        <FormTextArea name="notes" label={t['depositPaymentNote']} rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
