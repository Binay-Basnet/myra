import { FormSection } from '@myra-ui';

import { FormAddress } from '@coop/shared/form';

export const AddressDetailsSuppliers = () => (
  <FormSection header="Address">
    <FormAddress name="address" />
  </FormSection>
);
