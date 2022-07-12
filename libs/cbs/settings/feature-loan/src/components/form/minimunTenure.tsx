import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';
const unitOptions = [
  {
    label: 'Day',
    value: 'Day',
  },
  {
    label: 'Week',
    value: 'Week',
  },
  {
    label: 'Month',
    value: 'Month',
  },
  {
    label: 'Year',
    value: 'Year',
  },
];

const applicableSwitch = [
  {
    label: 'Applicable',
    value: 'applicable',
  },
  {
    label: 'Not Applicable',
    value: 'notApplicable',
  },
];
export const MinimunTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const minimumTenure = watch('enableminimumTenure');

  const minimumTenureUnit = watch('minimumTenureUnit');

  useEffect(() => {
    resetField('minimunTenureNumber');
    setRightElement(minimumTenureUnit);
  }, [minimumTenureUnit]);
  return (
    <BoxContainer>
      {/* <TextBoxContainer>
        <TopText>Minimum Tenure</TopText>
        <SubText>
          Note: Week is equal to 7 days, Month is equal to 30 days & year is
          equal to 365days.minimumTenureUnit
        </SubText>
      </TextBoxContainer>
      <FormSwitchTab name={'depositFrequency'} options={applicableSwitch} /> */}
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>Minimum Tenure</SubHeadingText>
          <SubText>
            Note: Week is equal to 7 days, Month is equal to 30 days & year is
            equal to 365days.
          </SubText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'enableminimumTenure'}
          options={applicableSwitch}
        />
      </Box>
      {minimumTenure && minimumTenure === 'applicable' && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
          borderRadius={'4px'}
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="500">
              {' '}
              Unit
            </Text>
            <FormSwitchTab name={'minimumTenureUnit'} options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="minimunTenureNumber"
              textAlign={'right'}
              label="Number"
              placeholder="Enter number"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                  {rightElement}
                </Text>
              }
            />
          </Box>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
