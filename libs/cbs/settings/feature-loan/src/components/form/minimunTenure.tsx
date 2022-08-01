import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Frequency } from '@coop/shared/data-access';
// import debounce from 'lodash/debounce';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
} from '../formui';

export const MinimunTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const minimumTenure = watch('enableminimumTenure');

  const minimumTenureUnit = watch('minimumTenureUnit');
  const { t } = useTranslation();

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

  const applicableSwitch = [
    {
      label: t['depositProductApplicable'],
      value: true,
    },
    {
      label: t['depositProductNotApplicable'],
      value: false,
    },
  ];

  useEffect(() => {
    resetField('minimunTenureNumber');
    setRightElement(minimumTenureUnit);
  }, [minimumTenureUnit]);

  return (
    <BoxContainer>
      {/* <TextBoxContainer>
        <TopText>Minimum Tenure</TopText>
        <SubText>
          Note: Week is equal to 7 days, Month is equal to 30 days & year is
          equal to 365days.minimumTenureUnit
        </SubText>
      </TextBoxContainer>
      <FormSwitchTab name={'depositFrequency'} options={applicableSwitch} /> */}
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['loanProductMinimumTenure']} </SubHeadingText>
          <SubText>{t['loanProductNoteWeek']}</SubText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'enableminimumTenure'}
          options={applicableSwitch}
        />
      </Box>
      {minimumTenure && (
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
              {t['loanProductUnit']}
            </Text>
            <FormSwitchTab name={'minimumTenureUnit'} options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="minimunTenureNumber"
              textAlign={'right'}
              label={t['loanProductNumber']}
              placeholder={t['loanProductEnterNumber']}
              rightAddonText={rightElement}
            />
          </Box>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
