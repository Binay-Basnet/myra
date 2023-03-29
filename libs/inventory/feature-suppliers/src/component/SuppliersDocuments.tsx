import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';

export const DocumentsSuppliers = () => (
  <FormSection header="Documents" templateColumns={2}>
    <FormFileInput name="registrationDoc" label="Registation" />
    <FormFileInput name="applicationDoc" label="Application" />
    <FormFileInput name="legalStatusDoc" label="Legal Status" />
    <FormFileInput name="othersDoc" label="Others" />
  </FormSection>
);
