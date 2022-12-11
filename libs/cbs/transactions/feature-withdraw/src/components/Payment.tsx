import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, GridItem, Text } from '@myra-ui';

import { WithdrawBy, WithdrawPaymentType } from '@coop/cbs/data-access';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import {
  FormAgentSelect,
  FormAmountInput,
  FormBankSelect,
  FormEditableTable,
  FormFileInput,
  FormInput,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

const denominationsOptions = [
  { label: '1000x', value: '1000' },
  { label: '500x', value: '500' },
  { label: '100x', value: '100' },
  { label: '50x', value: '50' },
  { label: '25x', value: '25' },
  { label: '20x', value: '20' },
  { label: '10x', value: '10' },
  { label: '5x', value: '5' },
  { label: '2x', value: '2' },
  { label: '1x', value: '1' },
];

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
              <FormBankSelect name="bankCheque.bankId" label={t['withdrawPaymentBankName']} />
            </GridItem>

            <FormInput name="bankCheque.chequeNo" label={t['withdrawPaymentChequeNo']} />

            <FormAmountInput
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
                type="number"
                name="cash.cashPaid"
                label={t['withdrawPaymentCash']}
              />
            </InputGroupContainer>

            <FormSwitch
              name="cash.disableDenomination"
              label={t['withdrawPaymentDisableDenomination']}
            />

            {!disableDenomination && (
              <FormEditableTable<PaymentTableType>
                name="cash.denominations"
                columns={[
                  {
                    accessor: 'value',
                    header: t['withdrawPaymentDenomination'],
                    cellWidth: 'auto',
                    fieldType: 'search',
                    searchOptions: denominationsOptions,
                  },
                  {
                    accessor: 'quantity',
                    header: t['withdrawPaymentQuantity'],
                    isNumeric: true,
                  },
                  {
                    accessor: 'amount',
                    header: t['withdrawPaymentAmount'],
                    isNumeric: true,
                    accessorFn: (row) => Number(row.value) * Number(row.quantity),
                  },
                ]}
                defaultData={[
                  { value: '1000', quantity: 0, amount: 0 },
                  { value: '500', quantity: 0, amount: 0 },
                  { value: '100', quantity: 0, amount: 0 },
                  { value: '50', quantity: 0, amount: 0 },
                  { value: '25', quantity: 0, amount: 0 },
                  { value: '20', quantity: 0, amount: 0 },
                  { value: '10', quantity: 0, amount: 0 },
                  { value: '5', quantity: 0, amount: 0 },
                  { value: '2', quantity: 0, amount: 0 },
                  { value: '1', quantity: 0, amount: 0 },
                ]}
                canDeleteRow={false}
                canAddRow={false}
              />
            )}

            <Box
              display="flex"
              flexDirection="column"
              gap="s20"
              px="s8"
              py="s10"
              border="1px"
              borderColor="border.layout"
              borderRadius="br2"
            >
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['withdrawPaymentTotal']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {amountConverter(totalCashPaid)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['withdrawPaymentReturn']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {amountConverter(returnAmount)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['withdrawPaymentGrandTotal']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {amountConverter(totalCashPaid - returnAmount)}
                </Text>
              </Box>
            </Box>
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
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="notes" label={t['withdrawPaymentNote']} rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
