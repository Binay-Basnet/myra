import { FormFileInput } from '@coop/shared/form';
import { FormSection, GridItem } from '@myra-ui';

export const Documents = () => (
  <FormSection header="File Uploads" templateColumns={4}>
    <GridItem colSpan={2}>
      <FormFileInput multiple size="lg" label="Application" name="documents.application" />
    </GridItem>

    <GridItem colSpan={2}>
      <FormFileInput multiple size="lg" label="Collateral Documents" name="documents.collateral" />
    </GridItem>

    <GridItem colSpan={2}>
      <FormFileInput multiple size="lg" label="Guarantor Documents" name="documents.guarantor" />
    </GridItem>

    <GridItem colSpan={2}>
      <FormFileInput multiple size="lg" label="BOD Details" name="documents.bod" />
    </GridItem>
  </FormSection>
);