// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();
  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductPostingFrequency']} </TopText>
      </TextBoxContainer>
      <InputGroupContainer>
        <FormSelect
          name="minimumPostingFrequency"
          label={t['depositProductMinimumPostingFrequency']}
          placeholder={t['depositProductSelectPostingFrequency']}
          options={minFrequency}
        />
        <FormSelect
          name="maximumPostingFrequency"
          label={t['depositProductMaximumPostingFrequency']}
          placeholder={t['depositProductSelectPostingFrequency']}
          options={maxFrequency}
        />
      </InputGroupContainer>
    </BoxContainer>
  );
};
