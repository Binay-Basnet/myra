import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FormInput } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';

export const PurchaseDetails = () => {
  return (
    <BoxContainer>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormInput
            name="supplierName"
            type="text"
            label="Supplier Name"
            placeholder="Supplier Name"
          />
        </GridItem>

        <FormInput
          name="supplierInvoiceReference"
          type="text"
          label="Supplier Invoice Reference"
          placeholder="Supplier Invoice Reference"
        />

        <FormInput name="invoiceDate" type="date" label="Invoice Date" />

        <FormInput name="dueDate" type="date" label="Due Date" />
      </InputGroupContainer>
    </BoxContainer>
  );
};
