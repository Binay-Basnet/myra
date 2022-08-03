import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Frequency } from '@coop/cbs/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer, TopText } from '../formui';

export const LoanRepayment = () => {
  const [rightElementMax, setRightElementMax] = useState('days');
  const [rightElementMin, setRightElementMin] = useState('days');
  const { t } = useTranslation();

  const { resetField, watch } = useFormContext();

  const maxDurationUnit = watch('maxGraceDurationUnit');
  useEffect(() => {
    resetField('maximumDurationNumberLoan');
    setRightElementMax(maxDurationUnit);
  }, [maxDurationUnit]);

  const minimumDurationUnit = watch('minGraceDurationUnit');

  useEffect(() => {
    resetField('minimunDurationNumberLoan');
    setRightElementMin(minimumDurationUnit);
  }, [minimumDurationUnit]);

  const unitOptions = [
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
      <TopText>{t['loanProductLoanRepaymentStartGraceDuration']}</TopText>

      <Box
        display={'flex'}
        justifyContent="space-between"
        flexDirection={'column'}
        gap="s8"
      >
        <TextBoxContainer>
          <TopText>{t['loanProductMinimumDuration']}</TopText>
        </TextBoxContainer>

        <Box
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
          borderRadius={'4px'}
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="500">
              {t['loanProductUnit']}
            </Text>
            <FormSwitchTab name="minGraceDurationUnit" options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="minGraceDurationUnitNumber"
              textAlign={'right'}
              label={t['loanProductNumber']}
              placeholder="0"
              rightAddonText={rightElementMin && rightElementMin.toLowerCase()}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display={'flex'}
        justifyContent="space-between"
        gap="s8"
        flexDirection={'column'}
      >
        <TextBoxContainer>
          <TopText>{t['loanProductMaximumDuration']}</TopText>
        </TextBoxContainer>

        <BoxContainer
          display={'flex'}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box display={'flex'} flexDirection="column" gap="s4">
            <Text fontSize={'s3'} fontWeight="500">
              {t['loanProductUnit']}
            </Text>
            <FormSwitchTab name="maxGraceDurationUnit" options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="maxGraceDurationUnitNumber"
              textAlign={'right'}
              label={t['loanProductNumber']}
              placeholder="0"
              rightAddonText={rightElementMax && rightElementMax.toLowerCase()}
            />
          </Box>
        </BoxContainer>
      </Box>
    </BoxContainer>
  );
};
