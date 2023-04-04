import { FormSection } from '@myra-ui';

import { FormFileInput } from '@coop/shared/form';

export const Documents = () => (
  <FormSection header="File Uploads" templateColumns={2}>
    <FormFileInput multiple size="lg" label="Application" name="documents.application" />

    <FormFileInput multiple size="lg" label="Collateral Documents" name="documents.collateral" />

    <FormFileInput multiple size="lg" label="Guarantor Documents" name="documents.guarantor" />

    <FormFileInput multiple size="lg" label="BOD Details" name="documents.bod" />

    <FormFileInput multiple size="lg" label="Other Documents" name="documents.other" />
  </FormSection>
);
