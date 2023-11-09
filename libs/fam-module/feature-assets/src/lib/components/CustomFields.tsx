import { FormSection } from '@myra-ui';

import { FormInput, FormSelect } from '@coop/shared/form';

export const CustomFields = () => (
  //   const { watch, setValue } = useFormContext();

  <FormSection header="Custom Fields" templateColumns={3} divider>
    <FormInput isRequired type="text" name="model" label="Model" />
    <FormSelect isRequired name="size" label="Size" options={[]} isLoading={false} />
    <FormInput isRequired type="text" name="price" label="Color" />
  </FormSection>
);
