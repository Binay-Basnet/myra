import { FormSection, GridItem } from '@myra-ui';

import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';

export const PurchaseInformation = () => (
  //   const { watch, setValue } = useFormContext();

  <FormSection header="Purchase Information" templateColumns={3} divider>
    <FormInput isRequired type="text" name="name" label="purchase Bill No." />
    <FormDatePicker isRequired name="purchaseDate" label="Purchase Date" />
    <FormInput isRequired type="text" name="purchasePrice" label="Purchase Price" />
    <GridItem colSpan={2}>
      <FormInput isRequired type="text" name="supplierName" label="Supplier Name" />
    </GridItem>
    <FormSelect
      isRequired
      name="supplierContact"
      label="Supplier Contact"
      options={[]}
      isLoading={false}
    />
  </FormSection>
);
