import { FormSection } from '@myra-ui';

import { FormDatePicker } from '@coop/shared/form';

export const JoiningDetails = () => (
  <FormSection id="Joining Details" header="Joining Details">
    <FormDatePicker name="dateOfJoining" label="Date of Joining" />
  </FormSection>
);
