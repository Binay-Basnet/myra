import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';

export const AdditionalSuppliers = () => (
  <FormSection header="Additional Fields">
    <FormInput name="openingBalance" label="Opening Balance" />
    <FormInput name="creditTerms" label="Credit Terms" />
    <FormInput name="creditLimit" label="Credit Limit" type="number" />
  </FormSection>
);
