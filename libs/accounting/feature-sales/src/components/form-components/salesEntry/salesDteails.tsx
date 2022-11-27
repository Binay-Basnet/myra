import { FormCustomerSelect, FormInput, FormLocalDatePicker } from '@coop/shared/form';
import { FormSection, GridItem } from '@myra-ui';

export const SalesDetails = () => (
  <FormSection>
    <GridItem colSpan={2}>
      <FormCustomerSelect name="customerID" label="Customer Name" />
    </GridItem>

    <FormInput name="reference" type="number" label="Reference" />

    <FormLocalDatePicker name="invoiceDate" label="Invoice Date" />

    <FormLocalDatePicker name="dueDate" label="Due Date" />
  </FormSection>
);
