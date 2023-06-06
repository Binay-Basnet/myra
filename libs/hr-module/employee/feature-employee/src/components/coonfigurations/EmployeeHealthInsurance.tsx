import { FormSection } from '@myra-ui';

import { FormInput, FormSelect } from '@coop/shared/form';

export const EmployeeHealthInsurance = () => (
  <FormSection id="Employee Health Insurance" header="Employee Health Insurance">
    <FormSelect name="healthInsuranceProviderId" label="Health Insurance Provider" />
    <FormInput name="healthInsuranceNumberId" label="Health Insurance Number" />
  </FormSection>
);
