import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';

export const Declerations = () => (
  <FormSection id="Documents" header="Declerations" templateColumns={2}>
    <FormFileInput name="passportSizePhoto" label="Passport Size Photo" size="lg" />
    <FormFileInput name="signature" label="Signature" size="lg" />
    <FormFileInput name="citizenship" label="Citizenship" size="lg" />
    <FormFileInput name="fingerprint" label="Fingerprint Photo" size="lg" />
  </FormSection>
);
