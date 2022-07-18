// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';

import {
  BoxContainer,
  SubHeadingText,
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
        <FormSelect
          name="postingFrequency"
          label="Posting Frequency"
          placeholder="Select Posting Frequency"
        />
        <FormSelect
          name="interestMethod"
          label="Interest Method"
          placeholder="Select Interest Method"
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
