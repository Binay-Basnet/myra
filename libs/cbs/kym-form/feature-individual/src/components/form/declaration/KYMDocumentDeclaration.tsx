import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';

export const KYMDocumentDeclaration = () => (
  <FormSection header="kynIndDOCUMENTDECLARATION" templateColumns={2}>
    <FormFileInput name="documents.0.identifiers" label="Passport Size Photo" />
    <FormFileInput name="documents.1.identifiers" label="Signature" />
    <FormFileInput name="documents.2.identifiers" label="CitizenshipPhoto" />
    <FormFileInput name="documents.3.identifiers" label="Fingerprint Photo" />
  </FormSection>
);
