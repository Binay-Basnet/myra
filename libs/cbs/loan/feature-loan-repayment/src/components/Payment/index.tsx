import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Divider, Grid, GridItem, Text } from '@myra-ui';

import { LoanRepaymentMethod, ObjState } from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import {
  FormAccountSelect,
  FormAmountInput,
  FormBankSelect,
  FormEditableTable,
  FormInput,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { InstallmentData } from '../InstallmentDetails';

const paymentModes = [
  {
    label: 'Cash',
    value: LoanRepaymentMethod.Cash,
  },
  {
    label: 'Account',
    value: LoanRepaymentMethod.Account,
  },
  {
    label: 'Bank Cheque',
    value: LoanRepaymentMethod.BankVoucher,
  },
];
const paymentModesWithLoc = [
  {
    label: 'Cash',
    value: LoanRepaymentMethod.Cash,
  },
  {
    label: 'Account',
    value: LoanRepaymentMethod.Account,
  },
  {
    label: 'Bank Cheque',
    value: LoanRepaymentMethod.BankVoucher,
  },
  {
    label: 'LOC Saving',
    value: LoanRepaymentMethod.LocSaving,
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
  { label: 'Paisa', value: 'PAISA' },
];

/* eslint-disable-next-line */
export interface PaymentProps {
  amountPaid: string;
  loanTotal: string | undefined;
  hasLoc?: boolean;
  loanAccountId: string;
  totalPayableAmount: number;
  setTotalPayableAmount: Dispatch<SetStateAction<number>>;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({
  amountPaid,
  loanTotal,
  hasLoc,
  loanAccountId,
  totalPayableAmount,
  setTotalPayableAmount,
}: PaymentProps) => {
  const { watch, setValue } = useFormContext();

  const selectedPaymentMode = watch('paymentMethod');

  const denominations = watch('cash.denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');
  const memberId = watch('memberId');

  const totalCashPaid: number = disableDenomination ? Number(cashPaid) : Number(denominationTotal);

  const returnAmount = watch('cash.returned_amount');

  useEffect(() => {
    setValue('cash.cashPaid', String(Math.ceil(Number(amountPaid))));
    setValue('cash.returned_amount', Math.ceil(Number(amountPaid)) - Number(loanTotal));
  }, [amountPaid, loanTotal, setValue]);

  useEffect(() => {
    setValue('cash.returned_amount', Number(cashPaid) - Number(loanTotal));
  }, [cashPaid]);

  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormSwitchTab
          label="Payment Mode"
          options={!hasLoc ? paymentModes : paymentModesWithLoc}
          name="paymentMethod"
        />

        {selectedPaymentMode === LoanRepaymentMethod?.Account && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormAccountSelect
                isRequired
                name="account.destination_account"
                label="Destination Account"
                memberId={memberId}
                filterBy={ObjState.Active}
              />
            </GridItem>
            <FormInput name="account.amount" value={loanTotal} isDisabled label="Amount" />

            <GridItem colSpan={2}>
              <Divider />
            </GridItem>

            <GridItem colSpan={2}>
              <InstallmentData
                loanAccountId={loanAccountId}
                totalPayableAmount={totalPayableAmount}
                setTotalPayableAmount={setTotalPayableAmount}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <Divider />
            </GridItem>

            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="account.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === LoanRepaymentMethod?.BankVoucher && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormBankSelect
                isRequired
                name="bankVoucher.bank"
                label="Bank Name"
                currentBranchOnly
              />
            </GridItem>
            <FormInput isRequired name="bankVoucher.voucher_no" label="Voucher Number" />
            <FormInput name="bankVoucher.amount" value={loanTotal} isDisabled label="Amount" />

            <GridItem colSpan={2}>
              <Divider />
            </GridItem>

            <GridItem colSpan={2}>
              <InstallmentData
                loanAccountId={loanAccountId}
                totalPayableAmount={totalPayableAmount}
                setTotalPayableAmount={setTotalPayableAmount}
              />
            </GridItem>

            <GridItem colSpan={2}>
              <Divider />
            </GridItem>

            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="bankVoucher.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === LoanRepaymentMethod?.Cash && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <FormAmountInput isRequired name="cash.cashPaid" label="Cash" />
            </Grid>

            <FormSwitch name="cash.disableDenomination" label="Disable Denomination" />

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
                      row.value === 'PAISA'
                        ? Number(row.quantity) / 100
                        : row.quantity
                        ? Number(row.value) * Number(row.quantity)
                        : '0',
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
                  { value: 'PAISA', quantity: '0', amount: '0' },
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
                  {amountConverter(totalCashPaid)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  Return
                </Text>

                <Box>
                  <FormAmountInput name="cash.returned_amount" />
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  Grand Total
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {amountConverter(totalCashPaid - returnAmount)}
                </Text>
              </Box>
            </Box>

            <Divider />

            <InstallmentData
              loanAccountId={loanAccountId}
              totalPayableAmount={totalPayableAmount}
              setTotalPayableAmount={setTotalPayableAmount}
            />

            <Divider />

            <Box display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="cash.note" label="Note" rows={5} />
            </Box>
          </>
        )}
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
