import { FormSection, GridItem } from '@myra-ui';

import { InvestmentTransactionType } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormBankSelect,
  FormDatePicker,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const fdTypeOptions = [
  { label: 'Deposit', value: InvestmentTransactionType.Deposit },
  { label: 'Withdraw', value: InvestmentTransactionType.Withdraw },
];

export const FixedDepositTransaction = () => (
  <FormSection header="Fixed Deposit">
    <FormSelect name="fd.type" label="Transaction Type" options={fdTypeOptions} />

    <FormDatePicker name="fd.date" label="Transaction Date" />

    <FormAmountInput name="fd.amount" label="FD Amount" />

    <FormBankSelect name="bankId" label="Bank" />

    <GridItem colSpan={3}>
      <FormTextArea name="notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
