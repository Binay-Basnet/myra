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
export const Interest = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Interest</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="minimumInterestRate"
          type="number"
          label="Mininum Rate"
          textAlign={'right'}
          placeholder="0.00"
          rightElement={'%'}
        />
        <FormInput
          name="maximumInterestRate"
          type="number"
          label="Maximum Rate"
          textAlign={'right'}
          placeholder="0.00"
          rightElement={'%'}
        />
        <FormInput
          name="defaultInterestRate"
          type="number"
          label="Default Rate"
          textAlign={'right'}
          placeholder="0.00"
          rightElement={'%'}
        />
        <FormInput
          name="ceoAuthenticationRate"
          type="number"
          label="CEO Authority"
          textAlign={'right'}
          placeholder="0.00"
          rightElement={'%'}
        />
        <FormInput
          name="boardAuthenticationRate"
          type="number"
          label="Board Authority"
          textAlign={'right'}
          placeholder="0.00"
          rightElement={'%'}
        />
        <FormSelect
          name="postingFrequency"
          label="Posting Frequency"
          placeholder="0.00"
        />
      </InputGroupContainer>
      <Box
        display={'flex'}
        flexDirection="row"
        border="1px solid"
        borderColor={'border.layout'}
        justifyContent="space-between"
        p="s16"
        alignItems={'center'}
        borderRadius="4px"
      >
        <SubHeadingText>Override Interest </SubHeadingText>
        <FormSwitchTab name={'overrideInterest'} options={yesNo} />
      </Box>
    </BoxContainer>
  );
};
