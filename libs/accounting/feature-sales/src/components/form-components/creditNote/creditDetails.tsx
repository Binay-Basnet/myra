import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const CreditNoteDetails = () => {
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
        {/* <FormInput
          name="invoiceRefrence"
          type="number"
          label="Invoice Reference"
          placeholder="Enter Invoice Reference"
        /> */}
        <FormInput
          name="date"
          type="date"
          label="Date"
          placeholder="DD-MM-YYYY"
        />
        {/* <FormInput
          name="dueDate"
          type="date"
          label="Due Date"
          placeholder="DD-MM-YYYY"
        /> */}
        <FormSelect
          name="invoiceReference"
          label="Invoice Reference"
          placeholder="Invoice Reference"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
