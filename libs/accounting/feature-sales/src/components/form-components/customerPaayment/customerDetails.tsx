import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const CustomerDetails = () => {
  return (
    <BoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="receivedFrom"
          label="Received From"
          placeholder="Received From"
        />

        <FormInput
          name="recievedAccount"
          type="number"
          label="Received Account"
          textAlign={'right'}
          placeholder="Select Received Account"
        />
        <FormInput
          name="recievedDate"
          type="date"
          label="Recieved Date"
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          name="amount"
          type="number"
          label="Amount"
          textAlign={'right'}
          placeholder="0.00"
        />
        {/* <FormSelect
          name="invoiceReference2"
          label="Invoice Reference"
          placeholder="Invoice Reference"
        /> */}
      </InputGroupContainer>
    </BoxContainer>
  );
};
