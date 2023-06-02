import { FormSection } from '@myra-ui';

import { FormInput, FormSelect } from '@coop/shared/form';

export const SalaryDetails = () => (
  <FormSection id="Salary Info" header="Salary Details">
    <FormSelect name="salaryPaymentMode" label="Payment Mode" />
    <FormInput name="pan" label="PAN" />
    <FormSelect name="pfAccount" label="Provident Fund Account" />
    <FormSelect name="salaryStructure" label="Salary Structure Assignment" />
  </FormSection>
);
