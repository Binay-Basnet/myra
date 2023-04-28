import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem, Text } from '@myra-ui';

import {
  InstallmentFrequency,
  InvestmentEntryInput,
  SavingInvestmentType,
} from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormDatePicker,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';

const savingInvestmentTypeOptions = [
  { label: 'Voluntary Saving', value: SavingInvestmentType.VolunntarySaving },
  { label: 'Recurring Saving', value: SavingInvestmentType.RecurringSaving },
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

export const SavingsDepositsInvestment = () => {
  const { watch } = useFormContext<InvestmentEntryInput>();

  const savingType = watch('saving.type');

  return (
    <FormSection header="Savings / Deposits">
      <FormSelect name="saving.type" label="Saving Type" options={savingInvestmentTypeOptions} />

      <FormAmountInput name="saving.installmentAmount" label="Installment Amount" />

      <FormNumberInput
        name="saving.rate"
        label="Interest Rate"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />

      {savingType === 'RECURRING_SAVING' && (
        <FormSelect
          name="saving.frequency"
          label="Installment Frequency"
          options={installmentFrequencyOptions}
        />
      )}

      <FormDatePicker name="saving.openDate" label="Account Open Date" />

      <GridItem colSpan={3}>
        <FormTextArea name="saving.notes" label="Notes" rows={3} />
      </GridItem>
    </FormSection>
  );
};
