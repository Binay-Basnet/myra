import { FormSection, GridItem } from '@myra-ui';

import { InvestmentTransactionType } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormBankSelect,
  FormDatePicker,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const savingInvestmentTypeOptions = [
  { label: 'Deposit', value: InvestmentTransactionType.Deposit },
  { label: 'Withdraw', value: InvestmentTransactionType.Withdraw },
];

export const SavingsDepositsTransaction = () => (
  <FormSection header="Savings / Deposits">
    <FormSelect name="saving.type" label="Transaction Type" options={savingInvestmentTypeOptions} />

    <FormDatePicker name="saving.date" label="Transaction Date" />

    <FormAmountInput name="saving.amount" label="Transaction Amount" />

    <FormBankSelect name="bankId" label="Bank" />

    <GridItem colSpan={3}>
      <FormTextArea name="notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
