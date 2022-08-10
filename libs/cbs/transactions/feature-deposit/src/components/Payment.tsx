import { useFormContext } from 'react-hook-form';

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
    value: 'cash',
  },
  {
    label: 'Cheque',
    value: 'cheque',
  },
  {
    label: 'Bank Voucher',
    value: 'bankVoucher',
  },
];

const depositors = [
  {
    label: 'Self',
    value: 'self',
  },
  {
    label: 'Agent',
    value: 'agent',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

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
  denomination: string;
  quantity: number;
  amount: number;
};

export function Payment({ mode, totalDeposit }: PaymentProps) {
  const { watch } = useFormContext();

  const selectedPaymentMode = watch('paymentMode');

  const depositedBy = watch('depositedBy');

  const denomination = watch('denomination');

  const denominationTotal =
    denomination?.reduce(
      (accumulator: number, curr: PaymentTableType) =>
        accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('disableDenomination');

  const cashPaid = watch('cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount = totalCashPaid - totalDeposit;

  return (
    <ContainerWithDivider
      borderRight="1px"
      borderColor="border.layout"
      p="s16"
      display={mode === 1 ? 'flex' : 'none'}
    >
      <BoxContainer>
        <FormSwitchTab
          label={'Payment Mode'}
          options={paymentModes}
          name="paymentMode"
        />

        {selectedPaymentMode === 'bankVoucher' && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormInput
                name="bankName"
                label="Bank Name"
                placeholder="Bank Name"
              />
            </GridItem>

            <FormInput
              name="bankVoucherID"
              label="Voucher ID"
              placeholder="Voucher ID"
            />

            <FormInput
              name="amount"
              type="number"
              label={'Amount'}
              textAlign={'right'}
              placeholder="0.00"
            />

            <FormInput
              type="date"
              name="depositedDate"
              label="Deposited Date"
            />

            <FormInput type="date" name="depositedBy" label="Deposited By" />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === 'cheque' && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormInput
                name="bankName"
                label="Bank Name"
                placeholder="Bank Name"
              />
            </GridItem>

            <FormInput
              name="chequeNo"
              label="Cheque No"
              placeholder="Cheque No"
            />

            <FormInput
              name="amount"
              type="number"
              label={'Amount'}
              textAlign={'right'}
              placeholder="0.00"
            />

            <FormInput
              type="date"
              name="depositedDate"
              label="Deposited Date"
            />

            <FormInput type="date" name="depositedBy" label="Deposited By" />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === 'cash' && (
          <>
            <InputGroupContainer>
              <FormInput
                name="cashPaid"
                type="number"
                label={'Cash Paid'}
                textAlign={'right'}
                placeholder="0.00"
              />
            </InputGroupContainer>

            <FormSwitch
              name="disableDenomination"
              label={'Disable Denomination'}
            />

            {!disableDenomination && (
              <FormEditableTable<PaymentTableType>
                name="denomination"
                columns={[
                  {
                    accessor: 'denomination',
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
                      Number(row.denomination) * Number(row.quantity),
                  },
                ]}
                defaultData={[
                  { denomination: '1000', quantity: 0, amount: 0 },
                  { denomination: '500', quantity: 0, amount: 0 },
                  { denomination: '100', quantity: 0, amount: 0 },
                  { denomination: '50', quantity: 0, amount: 0 },
                  { denomination: '25', quantity: 0, amount: 0 },
                  { denomination: '20', quantity: 0, amount: 0 },
                  { denomination: '10', quantity: 0, amount: 0 },
                  { denomination: '5', quantity: 0, amount: 0 },
                  { denomination: '2', quantity: 0, amount: 0 },
                  { denomination: '1', quantity: 0, amount: 0 },
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
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  Total
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  {totalCashPaid}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  Return
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  {returnAmount}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  Grand Total
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
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
            placeholder="Select Source of Fund"
          />

          <FormFileInput
            size={'md'}
            label={'File Upload (Optional)'}
            name={'file'}
          />
        </Grid>
      </BoxContainer>

      <BoxContainer>
        <FormSwitchTab
          label={'Deposited By'}
          options={depositors}
          name="depositedBy"
        />

        {depositedBy === 'agent' && (
          <InputGroupContainer>
            <FormSelect name="agent" label="Agent" placeholder="Select Agent" />
          </InputGroupContainer>
        )}
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="note" label="Note" placeholder="Note" rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
}

export default Payment;
