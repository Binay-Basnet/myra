import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

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

export const BalanceLimit = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();

  const frequencyUnit = watch('frequencyUnit');
  const depositNature = watch('nameOfDepositProduct');

  useEffect(() => {
    resetField('unitDays');
    setRightElement(frequencyUnit);
  }, [frequencyUnit]);

  return (
    <BoxContainer>
      <TextBoxContainer>
        {depositNature === 'recurringSaving' ? (
          <TopText>Transaction Limit</TopText>
        ) : (
          <TopText>Balance Limit</TopText>
        )}
      </TextBoxContainer>
      <InputGroupContainer>
        <FormInput
          name="minimunBalaneAmount"
          label="Minimum Amount"
          placeholder="Enter Minimum Amount"
        />
        <FormInput
          name="maximumBalaneAmount"
          label="Maximum Amount"
          placeholder="Enter Maximum Amount"
        />
        {depositNature !== 'recurringSaving' && (
          <FormInput
            type="number"
            name="average"
            label="Average"
            textAlign="right"
            placeholder="0"
          />
        )}
      </InputGroupContainer>
      {/* <Box display="flex" flexDirection="column" gap="s8">
        <Text fontSize={'s3'} fontWeight="Medium">
          Frquency
        </Text>
        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="Medium">
              Unit
            </Text>
            <FormSwitchTab name={'frequencyUnit'} options={unitOptions} />
          </Box>
          <Box w="300px">
            <FormInput
              name="unitDays"
              textAlign={'right'}
              label="Number"
              placeholder="0"
              rightElement={
                <Box mr="s24">
                  <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                    {rightElement}
                  </Text>
                </Box>
              }
            />
          </Box>
        </Box>
      </Box> */}
    </BoxContainer>
  );
};
