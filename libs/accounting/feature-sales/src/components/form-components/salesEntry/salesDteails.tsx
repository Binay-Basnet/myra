import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';

export const SalesDetails = () => {
  return (
    <BoxContainer>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormSelect
            name="customerName"
            label="Customer Name"
            __placeholder="Select Customer"
          />
        </GridItem>
        <FormInput
          name="supplierInvoiceRefrence"
          type="number"
          label="Supplier Invoice Reference"
          __placeholder="Enter Supplier Invoice Reference"
        />
        <FormInput
          name="invoiceDate"
          type="date"
          label="Invoice Date"
          __placeholder="DD-MM-YYYY"
        />
        <FormInput
          name="dueDate"
          type="date"
          label="Due Date"
          __placeholder="DD-MM-YYYY"
        />
        {/* <FormSelect
          name="wareHouse"
          label="Warehouse"
          __placeholder="Select Warehouse"
        /> */}
      </InputGroupContainer>
    </BoxContainer>
  );
};
