import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, GridItem } from '@myra-ui';

import { WithdrawBy, WithdrawPaymentType } from '@coop/cbs/data-access';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import { DenominationTable } from '@coop/shared/components';
import {
  FormAgentSelect,
  FormAmountInput,
  FormBankSelect,
  FormFileInput,
  FormInput,
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
  totalWithdraw: number;
}

type PaymentTableType = {
  value: string;
  quantity: number;
  amount: number;
};

export const Payment = ({ mode, totalWithdraw }: PaymentProps) => {
  const { t } = useTranslation();

  const paymentModes = [
    {
      label: t['withdrawPaymentCash'],
      value: WithdrawPaymentType.Cash,
    },
    {
      label: 'Bank Cheque',
      value: WithdrawPaymentType.BankCheque,
    },
  ];

  const withdrawnByOptions = [
    {
      label: t['withdrawPaymentSelf'],
      value: WithdrawBy.Self,
    },
    {
      label: t['withdrawPaymentMarketRepresentative'],
      value: WithdrawBy.Agent,
    },
    {
      label: 'Other',
      value: WithdrawBy.Other,
    },
  ];

  const { watch, setValue } = useFormContext();

  useEffect(() => {
    setValue('cash.cashPaid', String(totalWithdraw));
    setValue('bankCheque.amount', String(totalWithdraw));
  }, [totalWithdraw]);

  const selectedPaymentMode = watch('payment_type');

  const withdrawnBy = watch('withdrawnBy');

  const denominations = watch('cash.denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: PaymentTableType) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = Number(totalCashPaid) - Number(totalWithdraw);

  return (
    <ContainerWithDivider
      borderRight="1px"
      borderColor="border.layout"
      p="s16"
      pb="100px"
      display={mode === 1 ? 'flex' : 'none'}
    >
      <BoxContainer>
        <FormSwitchTab
          label={t['withdrawPaymentPaymentMode']}
          options={paymentModes}
          name="payment_type"
        />

        {selectedPaymentMode === WithdrawPaymentType.BankCheque && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormBankSelect
                isRequired
                name="bankCheque.bankId"
                label={t['withdrawPaymentBankName']}
                currentBranchOnly
              />
            </GridItem>

            <FormInput isRequired name="bankCheque.chequeNo" label={t['withdrawPaymentChequeNo']} />

            <FormAmountInput
              isDisabled
              type="number"
              name="bankCheque.amount"
              label={t['withdrawPaymentAmount']}
            />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === WithdrawPaymentType.Cash && (
          <>
            <InputGroupContainer>
              <FormAmountInput
                isRequired
                type="number"
                name="cash.cashPaid"
                label={t['withdrawPaymentCash']}
              />
            </InputGroupContainer>

            <FormSwitch
              name="cash.disableDenomination"
              label={t['withdrawPaymentDisableDenomination']}
            />

            <GridItem colSpan={3}>
              <DenominationTable
                fieldName="cash.denominations"
                cashPaid={cashPaid ?? '0'}
                totalCashPaid={totalWithdraw}
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
            label="Source of Fund"
            options={sourceOfFundsList.map((source) => ({
              label: source,
              value: source,
            }))}
          /> */}

          <FormFileInput size="md" label={t['withdrawPaymentFileUploade']} name="doc_identifiers" />
        </Grid>
      </BoxContainer>

      <BoxContainer>
        <FormSwitchTab
          label={t['withdrawPaymentWithdrawnBy']}
          options={withdrawnByOptions}
          name="withdrawnBy"
        />

        {withdrawnBy === WithdrawBy.Agent && (
          <InputGroupContainer>
            <FormAgentSelect name="agentId" label={t['withdrawPaymentMarketRepresentative']} />
          </InputGroupContainer>
        )}

        {withdrawnBy === WithdrawBy.Other && (
          <InputGroupContainer>
            <FormInput name="otherWithdrawerName" label="Name" />
          </InputGroupContainer>
        )}
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="notes" label={t['withdrawPaymentNote']} rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
