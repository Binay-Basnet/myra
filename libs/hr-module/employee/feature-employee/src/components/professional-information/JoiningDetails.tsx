import { FormSection } from '@myra-ui';

import { FormSelect } from '@coop/shared/form';

export const JoiningDetails = () => (
  <FormSection id="Joining Details" header="Joining Details">
    <FormSelect name="jobApplication" label="Job Applications" />
    <FormSelect name="designationId" label="Job Offer" />
    <FormSelect name="branchId" label="Appointment Letter" />
  </FormSection>
);
