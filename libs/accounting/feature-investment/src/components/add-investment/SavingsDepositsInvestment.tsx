import { FormSection, GridItem, Text } from '@myra-ui';

import { InstallmentFrequency, SavingInvestmentType } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormLocalDatePicker,
  FormNumberInput,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';

const savingInvestmentTypeOptions = [
  { label: 'Type 1', value: SavingInvestmentType.Type_1 },
  { label: 'Type 2', value: SavingInvestmentType.Type_2 },
  { label: 'Type 3', value: SavingInvestmentType.Type_3 },
];

const installmentFrequencyOptions = [
  {
    label: 'Daily',
    value: InstallmentFrequency.Daily,
  },
  {
    label: 'Weekly',
    value: InstallmentFrequency.Weekly,
  },
  {
    label: 'Monthly',
    value: InstallmentFrequency.Monthly,
  },
  {
    label: 'Quaterly',
    value: InstallmentFrequency.Quarterly,
  },
  {
    label: 'Half Yearly',
    value: InstallmentFrequency.HalfYearly,
  },
  {
    label: 'Yearly',
    value: InstallmentFrequency.Yearly,
  },
];

export const SavingsDepositsInvestment = () => (
  <FormSection header="Savings / Deposits">
    <FormSelect name="saving.type" label="Saving Type" options={savingInvestmentTypeOptions} />

    <FormAmountInput type="number" name="saving.installmentAmount" label="Installment Amount" />

    <GridItem colSpan={3}>
      <FormSwitchTab
        name="saving.frequency"
        label="Installment Frequency"
        options={installmentFrequencyOptions}
      />
    </GridItem>

    <FormNumberInput
      name="saving.rate"
      label="Interest Rate"
      rightElement={
        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
          %
        </Text>
      }
    />

    <FormLocalDatePicker name="saving.openDate" label="Account Open Date" />

    <FormAmountInput name="saving.initialDepositAmount" label="Initial Deposit Amount" />

    <GridItem colSpan={3}>
      <FormTextArea name="saving.notes" label="Notes" rows={3} />
    </GridItem>
  </FormSection>
);
