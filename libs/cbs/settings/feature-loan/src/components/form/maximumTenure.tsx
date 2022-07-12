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
export const MaximumTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const maximumTenure = watch('enablemaximumTenure');

  const maxTenureUnit = watch('maximumTenureUnit');
  useEffect(() => {
    resetField('maximumTenureNumber');
    setRightElement(maxTenureUnit);
  }, [maxTenureUnit]);
  return (
    <BoxContainer>
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>Maxinum Tenure</SubHeadingText>
          <SubText>
            Note: Week is equal to 7 days, Month is equal to 30 days & year is
            equal to 365days.
          </SubText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'enablemaximumTenure'}
          options={applicableSwitch}
        />
      </Box>
      {maximumTenure && maximumTenure === 'applicable' && (
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
            <FormSwitchTab name={'maximumTenureUnit'} options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="maximumTenureNumber"
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
