import { useFormContext } from 'react-hook-form';

import { DepositedBy, DepositPaymentType, useGetBankListQuery } from '@coop/cbs/data-access';
import { AgentSelect } from '@coop/cbs/transactions/ui-components';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import {
  FormEditableTable,
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';

const paymentModes = [
  {
    label: 'Cash',
    value: DepositPaymentType.Cash,
  },
  {
    label: 'Cheque',
    value: DepositPaymentType.Cheque,
  },
  {
    label: 'Bank Voucher',
    value: DepositPaymentType.BankVoucher,
  },
];

const sourceOfFundsList = [
  'Personal Savings',
  'Share Sales',
  'Dividends',
  'Property Sales',
  'Inheritances',
  'Compensation',
];

const depositors = [
  {
    label: 'Self',
    value: DepositedBy.Self,
  },
  {
    label: 'Market Representative',
    value: DepositedBy.Agent,
  },
  {
    label: 'Other',
    value: DepositedBy.Other,
  },
];

// const denominationsOptions = [
//   { label: '1000x', value: CashValue.Cash_1000 },
//   { label: '500x', value: CashValue.Cash_500 },
//   { label: '100x', value: CashValue.Cash_100 },
//   { label: '50x', value: CashValue.Cash_50 },
//   { label: '25x', value: CashValue.Cash_25 },
//   { label: '20x', value: CashValue.Cash_20 },
//   { label: '10x', value: CashValue.Cash_10 },
//   { label: '5x', value: CashValue.Cash_5 },
//   { label: '2x', value: CashValue.Cash_2 },
//   { label: '1x', value: CashValue.Cash_1 },
// ];

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

/* eslint-disable-next-line */
export interface PaymentProps {
  mode: number;
  totalDeposit: number;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({ mode, totalDeposit }: PaymentProps) => {
  const { watch } = useFormContext();

  const selectedPaymentMode = watch('payment_type');

  const depositedBy = watch('depositedBy');

  const denominations = watch('cash.denominations');

  const { data: bankList } = useGetBankListQuery();

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = totalCashPaid - totalDeposit;

  return (
    <ContainerWithDivider
      borderRight="1px"
      borderColor="border.layout"
      p="s16"
      display={mode === 1 ? 'flex' : 'none'}
      pb="100px"
    >
      <BoxContainer>
        <FormSwitchTab label="Payment Mode" options={paymentModes} name="payment_type" />

        {selectedPaymentMode === DepositPaymentType.BankVoucher && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormSelect
                name="bankVoucher.bankId"
                label="Bank Name"
                options={
                  bankList?.bank?.bank?.list?.map((bank) => ({
                    label: bank?.name as string,
                    value: bank?.id as string,
                  })) ?? []
                }
              />
            </GridItem>

            <FormInput name="bankVoucher.voucherId" label="Voucher ID" __placeholder="Voucher ID" />

            <FormInput name="bankVoucher.amount" type="number" label="Amount" textAlign="right" />

            <FormInput type="date" name="bankVoucher.depositedAt" label="Deposited Date" />

            <FormInput type="text" name="bankVoucher.depositedBy" label="Deposited By" />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.Cheque && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormSelect
                name="cheque.bankId"
                label="Bank Name"
                options={
                  bankList?.bank?.bank?.list?.map((bank) => ({
                    label: bank?.name as string,
                    value: bank?.id as string,
                  })) ?? []
                }
              />
            </GridItem>

            <FormInput name="cheque.chequeNo" label="Cheque No" __placeholder="Cheque No" />

            <FormInput name="cheque.amount" type="number" label="Amount" textAlign="right" />

            <FormInput type="date" name="cheque.depositedAt" label="Deposited Date" />

            <FormInput type="text" name="cheque.depositedBy" label="Deposited By" />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.Cash && (
          <>
            <InputGroupContainer>
              <FormInput name="cash.cashPaid" type="number" label="Cash" textAlign="right" />
            </InputGroupContainer>

            <FormSwitch
              name="cash.disableDenomination"
              label="Disable Denomination"
              defaultChecked={false}
            />

            {!disableDenomination && (
              <FormEditableTable<PaymentTableType>
                name="cash.denominations"
                columns={[
                  {
                    accessor: 'value',
                    header: 'Denomination',
                    cellWidth: 'auto',
                    fieldType: 'search',
                    searchOptions: denominationsOptions,
                  },
                  {
                    accessor: 'quantity',
                    header: 'Quantity',
                    isNumeric: true,
                  },
                  {
                    accessor: 'amount',
                    header: 'Amount',
                    isNumeric: true,
                    accessorFn: (row) =>
                      row.quantity ? Number(row.value) * Number(row.quantity) : '0',
                  },
                ]}
                defaultData={[
                  { value: '1000', quantity: '0', amount: '0' },
                  { value: '500', quantity: '0', amount: '0' },
                  { value: '100', quantity: '0', amount: '0' },
                  { value: '50', quantity: '0', amount: '0' },
                  { value: '25', quantity: '0', amount: '0' },
                  { value: '20', quantity: '0', amount: '0' },
                  { value: '10', quantity: '0', amount: '0' },
                  { value: '5', quantity: '0', amount: '0' },
                  { value: '2', quantity: '0', amount: '0' },
                  { value: '1', quantity: '0', amount: '0' },
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
                  Total
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {totalCashPaid}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  Return
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {returnAmount}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  Grand Total
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {totalCashPaid - returnAmount}
                </Text>
              </Box>
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <Grid templateColumns="repeat(2, 1fr)" columnGap="s20">
          <FormSelect
            name="sourceOfFund"
            label="Source of Fund"
            options={sourceOfFundsList.map((source) => ({
              label: source,
              value: source,
            }))}
          />

          <FormFileInput size="md" label="File Upload (Optional)" name="doc_identifiers" />
        </Grid>
      </BoxContainer>

      <BoxContainer>
        <FormSwitchTab label="Deposited By" options={depositors} name="depositedBy" />

        {depositedBy === DepositedBy.Agent && (
          <InputGroupContainer>
            <AgentSelect
              name="agentId"
              label="Market Representative"
              __placeholder="Select Agent"
            />
          </InputGroupContainer>
        )}

        {depositedBy === DepositedBy.Other && (
          <>
            <InputGroupContainer>
              <FormInput name="other_name" label="Name" __placeholder="Enter Name" />
            </InputGroupContainer>

            <Box width="50%">
              <FormFileInput name="other_doc_identifiers" label="Citizenship Document" size="md" />
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="notes" label="Note" __placeholder="Note" rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
