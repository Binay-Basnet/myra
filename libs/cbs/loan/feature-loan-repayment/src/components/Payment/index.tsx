import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, Grid, GridItem, Text } from '@myra-ui';

import { LoanRepaymentMethod, ObjState } from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import {
  FormAccountSelect,
  FormBankSelect,
  FormEditableTable,
  FormInput,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';

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
  loanTotal: string | undefined;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({ totalDeposit, loanTotal }: PaymentProps) => {
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

  const returnAmount = totalCashPaid - totalDeposit;

  useEffect(() => {
    setValue('cash.cashPaid', String(Math.ceil(Number(loanTotal))));
  }, [loanTotal, setValue]);

  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormSwitchTab label="Payment Mode" options={paymentModes} name="paymentMethod" />

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

            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="account.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === LoanRepaymentMethod?.BankVoucher && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormBankSelect isRequired name="bankVoucher.bank" label="Bank Name" />
            </GridItem>
            <FormInput isRequired name="bankVoucher.voucher_no" label="Voucher Number" />
            <FormInput name="bankVoucher.amount" value={loanTotal} isDisabled label="Amount" />
            {/* <FormInput
              name="amount"
              type="number"
              label="Amount"
              textAlign="right"
              placeholder="0.00"
            /> */}
            {/* <FormInput
              type="date"
              name="cheque.depositedAt"
              label="Deposited Date"
            />
            <FormInput
              type="text"
              name="cheque.depositedBy"
              label="Deposited By"
            /> */}
            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="bankVoucher.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === LoanRepaymentMethod?.Cash && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <FormInput
                isRequired
                name="cash.cashPaid"
                type="number"
                label="Cash"
                textAlign="right"
              />
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
                  {returnAmount.toFixed(2)}
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
            <Box display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="cash.note" label="Note" rows={5} />
            </Box>
          </>
        )}
      </BoxContainer>
      {/* {selectedPaymentMode === LoanRepaymentMethod.BankVoucher && (
          <FormSection templateColumns={2}>
            <GridItem colSpan={2}>
              <FormSelect
                name="bankVoucher.bankId"
                label={t['sharePurchaseBankName']}
                options={bankList}
              />
            </GridItem>

            <GridItem colSpan={1}>
              <FormInput
                type="text"
                name="bankVoucher.voucherId"
                label={t['sharePurchaseVoucherId']}
              />
            </GridItem>

            <GridItem colSpan={1}>
              <FormAmountInput
              type="number"
                defaultValue={loanTotal}
                name="amount"
                isDisabled
                label={t['sharePurchaseAmount']}
              />
            </GridItem>

            <GridItem colSpan={1}>
              <FormDatePicker
                name="bankVoucher.depositedDate"
                label={t['sharePurchaseDepositedDate']}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormInput name="bankVoucher.depositedBy" label={t['loanRepaymentDepositedBy']} />
            </GridItem>
            <GridItem colSpan={1}>
              <FormInput name="bankVoucher.sourceOfFund" label={t['sharePurchaseSourceofFund']} />
            </GridItem>
            <GridItem colSpan={1}>
              <FormFileInput name="bankVoucher.fileUpload" label={t['sharePurchaseFileUpload']} />
            </GridItem>
          </FormSection>
        )}

        {selectedPaymentMode === LoanRepaymentMethod.Account && (
          <ShareAccount totalAmount={Number(loanTotal)} />
        )}

        {selectedPaymentMode === LoanRepaymentMethod.Cash && (
          <ShareCash
            totalAmount={Number(loanTotal)}
            denominationTotal={denominationTotal}
            totalCashPaid={totalCashPaid}
            returnAmount={returnAmount}
          />
        )}

        {selectedPaymentMode === LoanRepaymentMethod.Cash && (
          <FormSection>
            <GridItem colSpan={3}>
              <Grid mt="s16" templateColumns="repeat(2,1fr)" gap="s20">
                <GridItem colSpan={1}>
                  <FormInput name="cash.sourceOfFund" label={t['sharePurchaseSourceofFund']} />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormFileInput name="cash.fileUpload" label={t['sharePurchaseFileUpload']} />
                </GridItem>
              </Grid>
            </GridItem>
          </FormSection>
        )}

        {selectedPaymentMode === LoanRepaymentMethod.BankVoucher && (
          <FormSection>
            <GridItem colSpan={3}>
              <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
                {t['sharePurchaseNote']}
              </Text>
              <FormTextArea name="bankVoucher.note" />
            </GridItem>
          </FormSection>
        )}

        {selectedPaymentMode === LoanRepaymentMethod.Account && (
          <FormSection>
            <GridItem colSpan={3}>
              <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
                {t['sharePurchaseNote']}
              </Text>
              <FormTextArea name="account.note" />
            </GridItem>
          </FormSection>
        )}

        {selectedPaymentMode === LoanRepaymentMethod.Cash && (
          <FormSection>
            <GridItem colSpan={3}>
              <Text color="neutralColorLight.Gray-70" fontSize="s3" fontWeight="Medium" mb="s8">
                {t['sharePurchaseNote']}
              </Text>
              <FormTextArea name="cash.note" />
            </GridItem>
          </FormSection>
        )} */}
    </ContainerWithDivider>
  );
};

export default Payment;
