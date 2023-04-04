import { FormSection, Text } from '@myra-ui';

import { InstallmentFrequency, LoanRepaymentScheme } from '@coop/cbs/data-access';
import { FormNumberInput, FormSelect } from '@coop/shared/form';

const installmentTypeOptions = [
  { label: 'EPI', value: LoanRepaymentScheme.Epi },
  { label: 'EMI', value: LoanRepaymentScheme.Emi },
  { label: 'Flat', value: LoanRepaymentScheme.Flat },
  { label: 'Loc', value: LoanRepaymentScheme.Loc },
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

export const Installment = () => (
  <FormSection>
    <FormNumberInput
      name="interestRate"
      label="Interest Rate"
      rightElement={
        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
          %
        </Text>
      }
    />

    <FormSelect name="installmentType" label="Installment Type" options={installmentTypeOptions} />

    <FormSelect
      name="installmentFrequency"
      label="Installment Frequency"
      options={installmentFrequencyOptions}
    />
  </FormSection>
);
