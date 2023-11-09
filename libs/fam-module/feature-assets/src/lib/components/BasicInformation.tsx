import { Box, Checkbox, FormSection, GridItem } from '@myra-ui';

import { FormInput, FormSelect } from '@coop/shared/form';

export const BasicInformation = () => (
  //   const { watch, setValue } = useFormContext();

  <FormSection templateColumns={3} divider>
    <GridItem colSpan={2}>
      <FormInput isRequired type="text" name="name" label="Asset Name" />
    </GridItem>
    <FormSelect isRequired name="assetType" label="Asset Type" options={[]} isLoading={false} />
    <FormInput isRequired type="text" name="quantity" label="Quantity" />
    <Box display="flex" flexDir="column">
      <Checkbox size="md" label="Purchase Entry" />
      <FormSelect name="purchaseEntry" options={[]} isLoading={false} />
    </Box>
  </FormSection>
);
