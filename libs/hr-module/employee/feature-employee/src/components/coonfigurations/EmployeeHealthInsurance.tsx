import { useGetEmployeeHealthInsuranceOptions } from '@hr/common';

import { FormSection } from '@myra-ui';

import { FormInput, FormSelect } from '@coop/shared/form';

export const EmployeeHealthInsurance = () => {
  const { employeeHealthInsuranceOptions } = useGetEmployeeHealthInsuranceOptions();
  return (
    <FormSection id="Employee Health Insurance" header="Employee Health Insurance">
      <FormSelect
        name="healthInsuranceProviderId"
        label="Health Insurance Provider"
        options={employeeHealthInsuranceOptions}
      />
      <FormInput name="healthInsuranceNumberId" label="Health Insurance Number" />
    </FormSection>
  );
};
