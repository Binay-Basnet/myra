import { FormSection, GridItem } from '@myra-ui';

import { InvestmentTransactionMethod, SavingInvestmentType } from '@coop/cbs/data-access';
import { FormAmountInput, FormDatePicker, FormSelect, FormTextArea } from '@coop/shared/form';

const savingInvestmentTypeOptions = [
  { label: 'Type 1', value: SavingInvestmentType.Type_1 },
  { label: 'Type 2', value: SavingInvestmentType.Type_2 },
  { label: 'Type 3', value: SavingInvestmentType.Type_3 },
];

const paymentMethodOptions = [
  { label: 'Cash', value: InvestmentTransactionMethod.Cash },
  { label: 'Cheque', value: InvestmentTransactionMethod.Cheque },
];

export const SavingsDepositsTransaction = () => (
  <FormSection header="Savings / Deposits">
    <FormSelect name="saving.type" label="Saving Type" options={savingInvestmentTypeOptions} />

    <FormDatePicker name="saving.date" label="Transaction Date" />

    <FormAmountInput name="saving.amount" label="Transaction Amount" />

    <FormSelect
      name="saving.paymentMethod"
      label="Payment Through"
      options={paymentMethodOptions}
    />

    <GridItem colSpan={3}>
      <FormTextArea name="saving.notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
