import React from 'react';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';

const yesNo = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
export const LoanLimit = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Loan Provision Treatment</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="scheduleChangeOverride"
          type="number"
          label="Schedule Change Override"
          // textAlign={'right'}
          placeholder="Schedule Change Override"
          //   rightElement={'%'}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
