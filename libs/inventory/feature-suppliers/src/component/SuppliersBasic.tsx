import { FormSection, GridItem } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const BasicDetailsSuppliers = () => (
  <FormSection header="Supplier's Details">
    <GridItem colSpan={2}>
      <FormInput name="name" label="Name" />
    </GridItem>
    <FormInput name="supplierCode" label="Supplier Code" />
    <FormInput name="panNo" label="PANorVATno" />
    <FormInput name="contactNo" label="Contact No" />
    <FormInput name="email" label="Email" />
  </FormSection>
);
