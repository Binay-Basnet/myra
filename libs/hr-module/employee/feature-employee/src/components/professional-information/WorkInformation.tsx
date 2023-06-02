import { FormSection } from '@myra-ui';

import { FormSelect } from '@coop/shared/form';

export const EmployeeWorkInformation = () => (
  <FormSection id="Work Information" header="Work Information">
    <FormSelect name="departmentId" label="Department" />
    <FormSelect name="designationId" label="Designation" />
    <FormSelect name="branchId" label="Service Center" />
    <FormSelect name="employmentTypeId" label="Employment Type" />
    <FormSelect name="employmentStatus" label="Employment Status" />
    <FormSelect name="sourceOfHire" label="Source of Hire" />
  </FormSection>
);
