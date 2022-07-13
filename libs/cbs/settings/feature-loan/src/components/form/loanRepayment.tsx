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

export const LoanRepayment = () => {
  const [rightElementMax, setRightElementMax] = useState('days');
  const [rightElementMin, setRightElementMin] = useState('days');

  const { resetField, watch } = useFormContext();

  const maxDurationUnit = watch('maximumDurationUnitLoan');
  useEffect(() => {
    resetField('maximumDurationNumberLoan');
    setRightElementMax(maxDurationUnit);
  }, [maxDurationUnit]);

  const minimumDurationUnit = watch('minimumDurationUnitLoan');

  useEffect(() => {
    resetField('minimunDurationNumberLoan');
    setRightElementMin(minimumDurationUnit);
  }, [minimumDurationUnit]);
  return (
    <BoxContainer>
      <TopText> Loan Repayment Start Grace Duration</TopText>

      <Box
        display={'flex'}
        justifyContent="space-between"
        flexDirection={'column'}
        gap="s8"
      >
        <TextBoxContainer>
          <TopText>Minimum Duration</TopText>
        </TextBoxContainer>

        {/* {minimumDuration && minimumDuration === 'applicable' && ( */}
        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
          borderRadius={'4px'}
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="500">
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
              placeholder="0"
              rightElement={
                <Box mr="s24">
                  <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                    {rightElementMin}
                  </Text>
                </Box>
              }
            />
          </Box>
        </Box>
      </Box>
      {/* )} */}
      <Box
        display={'flex'}
        justifyContent="space-between"
        gap="s8"
        flexDirection={'column'}
      >
        <TextBoxContainer>
          <TopText>Maximum Duration</TopText>
        </TextBoxContainer>

        {/* {maximumDuration && maximumDuration === 'applicable' && ( */}
        <BoxContainer
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="500">
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
              placeholder="0"
              rightElement={
                <Box mr="s24">
                  <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                    {rightElementMax}
                  </Text>
                </Box>
              }
            />
          </Box>
        </BoxContainer>
      </Box>
      {/* )} */}
    </BoxContainer>
  );
};
