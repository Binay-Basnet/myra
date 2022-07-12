// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

const maxFrequency = [
  {
    label: 'Max 1',
    value: 'max1',
  },
  {
    label: 'Max 2',
    value: 'max2',
  },
];

const minFrequency = [
  {
    label: 'Min 1',
    value: 'min1',
  },
  {
    label: 'Min 2',
    value: 'min2',
  },
];

export const PostingFrequency = () => {
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>Posting Frequency</TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="minimumPostingFrequency"
          label="Minimum Posting Frequency"
          placeholder="Select Posting Frequency"
          options={minFrequency}
        />
        <FormSelect
          name="maximumPostingFrequency"
          label="Maximum Posting Frequency"
          placeholder="Select Posting Frequency"
          options={maxFrequency}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
