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
export const Questions = ({ watch }: any) => {
  const depositNature = watch('nameOfDepositProduct');
  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Insurance</SubHeadingText>
        <FormSwitchTab name={'autoOpenWhenJoin'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Collateral</SubHeadingText>
        <FormSwitchTab name={'alternativeChannels'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Rebate </SubHeadingText>
        <FormSwitchTab name={'atmFacility'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Rebate </SubHeadingText>
        <FormSwitchTab name={'chequeIssue'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Allow Partial Installment</SubHeadingText>
        <FormSwitchTab name={'allowLoan'} options={yesNo} />
      </Box>
    </DividerContainer>
  );
};
