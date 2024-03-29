import { FormSection, GridItem } from '@myra-ui';

import { FormCustomerSelect, FormDatePicker, FormInput } from '@coop/shared/form';

export const SalesDetails = () => (
  <FormSection>
    <GridItem colSpan={2}>
      <FormCustomerSelect name="customerID" label="Customer Name" />
    </GridItem>

    <FormInput name="invoiceNumber" label="Invoice Number" />

    <FormDatePicker name="invoiceDate" label="Invoice Date" />

    <FormDatePicker name="dueDate" label="Due Date" />
  </FormSection>
);
