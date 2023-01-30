import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Grid, GridItem } from '@myra-ui';

import { AccountClosePaymentMode, ObjState } from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import { DenominationTable } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormAmountInput,
  FormBankSelect,
  FormInput,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';

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

/* eslint-disable-next-line */
export interface PaymentProps {
  totalDeposit: number;
}

export const Payment = ({ totalDeposit }: PaymentProps) => {
  const { watch, setValue } = useFormContext();

  const selectedPaymentMode = watch('paymentMode');

  const denominations = watch('cash.denominations');

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

  useEffect(() => {
    setValue('accountTransfer.amount', String(totalDeposit));
    setValue('bankCheque.amount', String(totalDeposit));
    setValue('cash.cashPaid', String(Math.floor(totalDeposit)));
  }, [totalDeposit]);

  useEffect(() => {
    if (watch('cash.disableDenomination') === undefined) setValue('cash.disableDenomination', true);
  });

  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormSwitchTab label="Payment Mode" options={paymentModes} name="paymentMode" />

        {selectedPaymentMode === AccountClosePaymentMode?.AccountTransfer && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormAccountSelect
                isRequired
                name="accountTransfer.destination_account"
                label="Destination Account"
                memberId={memberId}
                filterBy={ObjState.Active}
              />
            </GridItem>

            <FormAmountInput name="accountTransfer.amount" label="Amount" />

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
              <FormBankSelect isRequired name="bankCheque.bank" label="Bank Name" />
            </GridItem>
            <FormInput
              isRequired
              name="bankCheque.cheque_no"
              label="Cheque No"
              placeholder="Cheque No"
            />
            <FormAmountInput name="bankCheque.amount" label="Amount" />
            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="bankCheque.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === AccountClosePaymentMode.Cash && (
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

            <FormTextArea name="cash.note" label="Note" rows={5} />
          </>
        )}
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
