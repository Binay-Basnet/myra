import { FormSection, GridItem } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const ContactPersonSuppliers = () => (
  <FormSection header="Contact Person">
    <GridItem colSpan={2}>
      <FormInput name="contactPersonName" label="Name" />
    </GridItem>
    <FormInput name="contactPersonPhoneNo" label="Phone no" />
  </FormSection>
);
