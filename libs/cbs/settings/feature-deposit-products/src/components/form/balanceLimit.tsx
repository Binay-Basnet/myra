import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const BalanceLimit = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Balance Limit</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="minimunBalaneAmount"
          label="Minimum Amount"
          placeholder="Enter Minimum Amount"
        />
        <FormInput
          name="maximumBalaneAmount"
          label="Maximum Amount"
          placeholder="Enter Maximum Amount"
        />
        <FormInput
          name="averageBalaneAmount"
          label="Average"
          textAlign={'right'}
          placeholder="0.00"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
