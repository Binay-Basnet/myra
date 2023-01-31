import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Divider } from '@chakra-ui/react';

import { Grid, GridItem } from '@myra-ui';

import {
  AlternativeChannelDepositedBy,
  AlternativeChannelPaymentMode,
  ObjState,
} from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import { DenominationTable } from '@coop/shared/components';
import {
  FormAccountSelect,
  FormBankSelect,
  FormInput,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

const paymentModes = [
  {
    label: 'Account Transfer',
    value: AlternativeChannelPaymentMode?.Account,
  },
  {
    label: 'Bank Voucher',
    value: AlternativeChannelPaymentMode?.BankVoucher,
  },
  {
    label: 'Cash',
    value: AlternativeChannelPaymentMode?.Cash,
  },
];

/* eslint-disable-next-line */
export interface PaymentProps {
  totalDeposit: number;
}

export const Payment = ({ totalDeposit }: PaymentProps) => {
  const { watch, setValue } = useFormContext();
  const { t } = useTranslation();

  const selectedPaymentMode = watch('paymentMode');
  const denominations = watch('cash.denominations');
  const disableDenomination = watch('cash.disableDenomination');
  const cashPaid = watch('cash.cashPaid');
  const memberId = watch('memberId');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const totalCashPaid: number = disableDenomination ? Number(cashPaid) : Number(denominationTotal);
  const returnAmount = totalCashPaid - totalDeposit;

  const depositedByList = [
    { label: t['sharePurchaseSelf'], value: AlternativeChannelDepositedBy?.Self },
    {
      label: t['sharePurchaseOthers'],
      value: AlternativeChannelDepositedBy?.Others,
    },
  ];

  useEffect(() => {
    setValue('cash.cashPaid', String(totalDeposit));
    setValue('totalAmount', String(totalDeposit));
  }, [totalDeposit, setValue]);
  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormSwitchTab label="Payment Mode" options={paymentModes} name="paymentMode" />
        {selectedPaymentMode === AlternativeChannelPaymentMode?.Account && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormAccountSelect
                name="accountTransfer.destination_account"
                label="Destination Account"
                memberId={memberId}
                filterBy={ObjState.Active}
              />
            </GridItem>
            <FormInput
              name="totalAmount"
              label="Amount"
              isDisabled
              textAlign="right"
              placeholder="0.00"
            />
            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="accountTransfer.note" label="Note" />
            </GridItem>
          </Grid>
        )}
        {selectedPaymentMode === AlternativeChannelPaymentMode?.BankVoucher && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <GridItem colSpan={2}>
                <FormBankSelect name="bankCheque.bank" label="Bank Name" />
              </GridItem>
              <FormInput name="bankCheque.voucher_id" label="Voucher Number" />
              <FormInput
                name="totalAmount"
                label="Amount"
                isDisabled
                textAlign="right"
                placeholder="0.00"
              />

              <FormInput type="date" name="bankCheque.deposited_date" label="Deposited Date" />
            </Grid>
            <Divider />

            <FormSwitchTab
              label={t['sharePurchaseDepositedBy']}
              name="bankCheque.depositedBy"
              options={depositedByList}
            />
            <Divider />
            <FormTextArea name="bankCheque.note" label="Note" />
          </>
        )}
        {selectedPaymentMode === AlternativeChannelPaymentMode.Cash && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <FormInput name="cash.cashPaid" type="number" label="Cash" textAlign="right" />
            </Grid>
            <FormSwitch name="cash.disableDenomination" label="Disable Denomination" />

            <DenominationTable
              fieldName="cash.denominations"
              cashPaid={cashPaid ?? '0'}
              totalCashPaid={totalDeposit}
              returnAmount={returnAmount ?? 0}
              disableDenomination={disableDenomination}
              denominationTotal={denominationTotal}
            />

            <FormTextArea name="cash.note" label="Note" rows={5} />
          </>
        )}
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
