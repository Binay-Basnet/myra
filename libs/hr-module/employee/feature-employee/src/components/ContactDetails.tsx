import { FormSection } from '@myra-ui';

import { FormEmailInput, FormPhoneNumber } from '@coop/shared/form';

export const EmployeeContactDetails = () => (
  <FormSection id="Contact Details" header="Contact Details">
    <FormPhoneNumber isRequired name="workPhoneNumber" label="Work Phone Number" />
    <FormEmailInput isRequired type="text" name="workEmailAddress" label="Work Email Address" />

    <FormPhoneNumber isRequired name="personalPhoneNumber" label="Personal Phone Number" />
    <FormEmailInput
      isRequired
      type="text"
      name="personalEmailAddress"
      label="Personal Email Address"
    />
  </FormSection>
);
