import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const AmountLimit = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Amount Limit</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          textAlign={'right'}
          name="minimunBalaneAmount"
          label="Minimum Amount"
          placeholder="0.00"
        />
        <FormInput
          textAlign={'right'}
          name="maximumBalaneAmount"
          label="Maximum Amount"
          placeholder="0.00"
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
