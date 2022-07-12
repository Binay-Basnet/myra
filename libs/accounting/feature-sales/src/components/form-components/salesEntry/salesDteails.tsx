import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const SalesDetails = () => {
  return (
    <BoxContainer>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormSelect
            name="customerName"
            label="Customer Name"
            placeholder="Select Customer"
          />
        </GridItem>
        <FormInput
          name="supplierInvoiceRefrence"
          type="number"
          label="Supplier Invoice Reference"
          placeholder="Enter Supplier Invoice Reference"
        />
        <FormInput
          name="invoiceDate"
          type="date"
          label="Invoice Date"
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          name="dueDate"
          type="date"
          label="Due Date"
          placeholder="DD-MM-YYYY"
        />
        <FormSelect
          name="wareHouse"
          label="Warehouse"
          placeholder="Select Warehouse"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
