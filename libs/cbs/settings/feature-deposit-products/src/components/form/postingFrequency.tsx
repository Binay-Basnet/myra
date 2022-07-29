// import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Frequency } from '@coop/shared/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const PostingFrequency = () => {
  const { t } = useTranslation();
  const { watch, resetField } = useFormContext();
  const [rightElementMin, setRightElementMin] = useState('days');

  const postingFrequencyUnit = watch('postingFrequency');

  useEffect(() => {
    resetField('maxFreqDifference');
    setRightElementMin(postingFrequencyUnit);
  }, [postingFrequencyUnit]);

  const postingFrequency = [
    {
      label: t['daily'],
      value: Frequency.Daily,
    },
    {
      label: t['weekly'],
      value: Frequency.Weekly,
    },
    {
      label: t['monthly'],
      value: Frequency.Monthly,
    },
    {
      label: t['yearly'],
      value: Frequency.Yearly,
    },
  ];

  return (
    <BoxContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductPostingFrequency']} </TopText>
      </TextBoxContainer>
      <FormSwitchTab name={'postingFrequency'} options={postingFrequency} />
      <Box w="290px">
        <FormInput
          name="maxPostingFreqDifference"
          textAlign={'right'}
          label={t['depositProductMaximumPostingFrequencyDifference']}
          placeholder="0"
          rightAddonText={rightElementMin}
        />
      </Box>
    </BoxContainer>
  );
};
