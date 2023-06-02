import { FormSection } from '@myra-ui';

import { FormSelect } from '@coop/shared/form';

export const JoiningDetails = () => (
  <FormSection id="Joining Details" header="Joining Details">
    <FormSelect name="jobApplication" label="Job Applications" />
    <FormSelect name="jobApplication" label="Job Offer" />
    <FormSelect name="jobApplication" label="Appointment Letter" />
  </FormSection>
);
