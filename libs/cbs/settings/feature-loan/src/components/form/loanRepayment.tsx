import React from 'react';
import { useEffect, useState } from 'react';
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
export const LoanRepayment = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const maximumDuration = watch('enablemaximumDurationLoan');

  const maxDurationUnit = watch('maximumDurationUnitLoan');
  useEffect(() => {
    resetField('maximumDurationNumberLoan');
    setRightElement(maxDurationUnit);
  }, [maxDurationUnit]);
  const minimumDuration = watch('enableminimumDurationLoan');

  const minimumDurationUnit = watch('minimumDurationUnitLoan');

  useEffect(() => {
    resetField('minimunDurationNumberLoan');
    setRightElement(minimumDurationUnit);
  }, [minimumDurationUnit]);
  return (
    <BoxContainer>
      <TopText> Loan Repayment Start Grace Duration</TopText>

      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <TopText>Minimum Duration</TopText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'enableminimumDurationLoan'}
          options={applicableSwitch}
        />
      </Box>
      {minimumDuration && minimumDuration === 'applicable' && (
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
            <FormSwitchTab
              name={'minimumDurationUnitLoan'}
              options={unitOptions}
            />
          </Box>
          <Box w="290px">
            <FormInput
              name="minimunDurationNumberLoan"
              textAlign={'right'}
              label="Number"
              placeholder="Enter number"
              rightElement={<Text>{rightElement}</Text>}
            />
          </Box>
        </BoxContainer>
      )}
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <TopText>Maximum Duration</TopText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'enablemaximumDurationLoan'}
          options={applicableSwitch}
        />
      </Box>
      {maximumDuration && maximumDuration === 'applicable' && (
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
            <FormSwitchTab
              name={'maximumDurationUnitLoan'}
              options={unitOptions}
            />
          </Box>
          <Box w="290px">
            <FormInput
              name="maximumDurationNumberLoan"
              textAlign={'right'}
              label="Number"
              placeholder="Enter number"
              rightElement={rightElement}
            />
          </Box>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
