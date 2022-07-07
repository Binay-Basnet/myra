import React from 'react';
import { useFormContext } from 'react-hook-form';

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
  const collateral = watch('collateral');
  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Insurance</SubHeadingText>
        <FormSwitchTab name={'autoOpenWhenJoin'} options={yesNo} />
      </Box>
      <Box display={'flex'} flexDirection="column" gap="s16">
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>Collateral</SubHeadingText>
          <FormSwitchTab name={'collateral'} options={yesNo} />
        </Box>
        {collateral && collateral === 'yes' && (
          <Box
            p="s16"
            border={'1px solid'}
            borderColor="border.layout"
            borderRadius={'6px'}
          >
            <InputGroupContainer>
              <FormInput
                type="text"
                name="disburementOfFMV"
                label="Disburement % of FMV"
                placeholder="Loan Provision Frequency"
              />
              <FormInput
                type="text"
                name="disburementOfDMV"
                label="Disburement % of DMV"
                placeholder="Loan Provision Frequency"
              />
            </InputGroupContainer>
          </Box>
        )}{' '}
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Rebate </SubHeadingText>
        <FormSwitchTab name={'rebate'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Staff Product </SubHeadingText>
        <FormSwitchTab name={'staffProduct'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Support Multiple Account</SubHeadingText>
        <FormSwitchTab name={'supportMultipleAcc'} options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>Loan Schedule Change Override</SubHeadingText>
        <FormSwitchTab name={'loanScheduleChangeOverride'} options={yesNo} />
      </Box>
    </DividerContainer>
  );
};
