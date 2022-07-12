import React from 'react';

import {
  BoxContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
// import debounce from 'lodash/debounce';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
const paymentModeOptions = [
  {
    label: 'Bank Transfer',
    value: 'bankTransfer',
  },
  {
    label: 'Cheque',
    value: 'cheque',
  },
  {
    label: 'Cash',
    value: 'cash',
  },
];
export const PaymentMode = () => {
  return (
    <BoxContainer>
      <Text fontWeight={'500'} fontSize="s3">
        {' '}
        Payment Mode
      </Text>
      <FormSwitchTab name="paymentMode" options={paymentModeOptions} />
      <InputGroupContainer>
        <FormInput
          type="text"
          name="paymentReferenceNo"
          label="Payment Reference no"
          placeholder="Payment Reference no"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
