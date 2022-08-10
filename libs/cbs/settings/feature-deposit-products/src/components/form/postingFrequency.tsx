// import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { DepositFrequency } from '@coop/cbs/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
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
      label: t['monthly'],
      value: DepositFrequency.Monthly,
    },
    {
      label: t['quaterly'],
      value: DepositFrequency.Quarterly,
    },
    {
      label: t['halfYearly'],
      value: DepositFrequency.HalfYearly,
    },
    {
      label: t['yearly'],
      value: DepositFrequency.Yearly,
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
          rightAddonText={rightElementMin && rightElementMin.toLowerCase()}
        />
      </Box>
    </BoxContainer>
  );
};
