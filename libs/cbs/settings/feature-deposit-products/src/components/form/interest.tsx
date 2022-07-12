// import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

const ladderSwitch = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

const postingFreq = [
  {
    label: 'Max 1',
    value: 'max1',
  },
  {
    label: 'Max 2',
    value: 'max2',
  },
];

export const Interest = () => {
  const { watch } = useFormContext();
  const depositNature = watch('nameOfDepositProduct');
  return (
    <>
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
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="maximumInterestRate"
            type="number"
            label="Maximum Rate"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="defaultInterestRate"
            type="number"
            label="Default Rate"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            type="number"
            name="qdditionalToBaseRate"
            label="Additional to Base Rate"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="ceoAuthenticationRate"
            type="number"
            label="CEO Authority"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          <FormInput
            name="boardAuthenticationRate"
            type="number"
            label="Board Authority"
            textAlign={'right'}
            placeholder="0.00"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />
          {depositNature !== 'recurringSaving' && (
            <FormSelect
              name="minimumInterestRate"
              label="Posting Frequency"
              placeholder="Select Posting Frequency"
              options={postingFreq}
            />
          )}
        </InputGroupContainer>
      </BoxContainer>
      <Box
        alignItems="center"
        display={'flex'}
        flexDirection="row"
        justifyContent="space-between"
      >
        <Text
          color="neutralColorLight.Gray-70"
          fontSize={'s3'}
          fontWeight="Medium"
        >
          Ladder Rate
        </Text>
        <FormSwitchTab name={'minimumTenureUnit'} options={ladderSwitch} />
      </Box>
    </>
  );
};
