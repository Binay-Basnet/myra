import { FormSection } from '@myra-ui';

import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';

export const EmployeeContactDetails = () => (
  <FormSection id="Contact Details" header="Contact Details">
    <FormPhoneNumber isRequired name="workPhoneNumber" label="Mobile Number" />
    <FormEmailInput isRequired type="text" name="workEmailAddress" label="Email Address" />
    <FormPhoneNumber isRequired name="personalPhoneNumber" label="Home Phone Number" />
  </FormSection>
);
