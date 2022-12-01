import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, FormAccountSelect, Grid, GridItem, Text } from '@myra-ui';

import {
  AccountClosePaymentMode,
  ObjState,
  RootState,
  useAppSelector,
  useGetCoaBankListQuery,
} from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import {
  FormAmountInput,
  FormEditableTable,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { featureCode } from '@coop/shared/utils';

const paymentModes = [
  {
    label: 'Cash',
    value: AccountClosePaymentMode?.Cash,
  },
  {
    label: 'Account Transfer',
    value: AccountClosePaymentMode?.AccountTransfer,
  },
  {
    label: 'Bank Cheque',
    value: AccountClosePaymentMode?.BankCheque,
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
  totalDeposit: number;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({ totalDeposit }: PaymentProps) => {
  const { watch, resetField, setValue } = useFormContext();

  const selectedPaymentMode = watch('paymentMode');

  const denominations = watch('cash.denominations');

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');
  const memberId = watch('memberID');

  const totalCashPaid: number = disableDenomination ? Number(cashPaid) : Number(denominationTotal);

  const returnAmount =
    selectedPaymentMode === AccountClosePaymentMode.Cash
      ? totalCashPaid - Math.floor(totalDeposit)
      : totalCashPaid - totalDeposit;

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    resetField('accountTransfer.depositedDate');
  }, [preference?.date]);

  useEffect(() => {
    setValue('accountTransfer.amount', String(totalDeposit));
    setValue('bankCheque.amount', String(totalDeposit));
    setValue('cash.cashPaid', String(Math.floor(totalDeposit)));
  }, [totalDeposit]);

  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormSwitchTab label="Payment Mode" options={paymentModes} name="paymentMode" />

        {selectedPaymentMode === AccountClosePaymentMode?.AccountTransfer && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormAccountSelect
                name="accountTransfer.destination_account"
                label="Destination Account"
                memberId={memberId}
                filterBy={ObjState.Active}
              />
            </GridItem>

            <FormAmountInput type="number" name="accountTransfer.amount" label="Amount" />

            {/* <FormDatePicker name="accountTransfer.depositedDate" label="Deposited Date" />

            <FormInput type="text" name="accountTransfer.depositedBy" label="Deposited By" /> */}
            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="accountTransfer.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === AccountClosePaymentMode?.BankCheque && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormSelect name="bankCheque.bank" label="Bank Name" options={bankList} />
            </GridItem>
            <FormInput name="bankCheque.cheque_no" label="Cheque No" placeholder="Cheque No" />
            <FormAmountInput type="number" name="bankCheque.amount" label="Amount" />
            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="bankCheque.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === AccountClosePaymentMode.Cash && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <FormInput name="cash.cashPaid" type="number" label="Cash" textAlign="right" />
            </Grid>
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

            <FormTextArea name="cash.note" label="Note" rows={5} />
          </>
        )}
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
