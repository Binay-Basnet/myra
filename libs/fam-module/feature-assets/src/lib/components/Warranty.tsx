import { FormSection, GridItem } from '@myra-ui';

import { FormDatePicker, FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

export const Warranty = () => (
  //   const { watch, setValue } = useFormContext();

  <FormSection
    header="Warranty"
    subHeader="Enable the ability to add when an asset’s warranty will expire and be notified of the event."
    templateColumns={3}
    divider
  >
    <GridItem colSpan={2}>
      <FormInput isRequired type="text" name="warrantyProvider" label="Warranty Provider" />
    </GridItem>
    <FormInput isRequired type="text" name="warrantyType" label="Warranty Type" />
    <FormDatePicker name="date" label="Warranty Expiration" />
    <GridItem colSpan={2} />
    <FormFileInput name="attachment" label="Upload" />
    <GridItem colSpan={3}>
      <FormTextArea name="notes" label="Notes" />
    </GridItem>
  </FormSection>
);
