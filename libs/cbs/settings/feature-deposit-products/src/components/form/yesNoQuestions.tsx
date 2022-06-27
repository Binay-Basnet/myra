import React from 'react';

// import debounce from 'lodash/debounce';
import {
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { DividerContainer, SubHeadingText } from '../formui';

const yesNo = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];
export const Questions = () => {
  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Auto Open when member joins</SubHeadingText>
        <FormSwitchTab name={'autoOpenWhenJoin'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Alternative Channels</SubHeadingText>
        <FormSwitchTab name={'alternativeChannels'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Allow Loan</SubHeadingText>
        <FormSwitchTab name={'allowLoan'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Support Multiple Account</SubHeadingText>
        <FormSwitchTab name={'supportMultipleAccount'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Staff Product</SubHeadingText>
        <FormSwitchTab name={'staffProduct'} options={yesNo} />
      </Box>
    </DividerContainer>
  );
};
