// import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

  console.log(rightElementMin, postingFrequencyUnit);

  const postingFrequency = [
    {
      label: t['monthly'],
      value: 'monthly',
    },
    {
      label: t['quatrerly'],
      value: 'quatrerly',
    },
    {
      label: t['halfYearly'],
      value: 'halfYearly',
    },
    {
      label: t['yearly'],
      value: 'yearly',
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
          name="maxFreqDifference"
          textAlign={'right'}
          label={t['depositProductMaximumPostingFrequencyDifference']}
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
    </BoxContainer>
  );
};
