import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Frequency } from '@coop/shared/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
} from '../formui';

export const MaximumTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const maximumTenure = watch('maxTenure');

  const maxTenureUnit = watch('maxTenureUnit');

  useEffect(() => {
    resetField('maximumTenureNumber');
    setRightElement(maxTenureUnit);
  }, [maxTenureUnit]);

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

  return (
    <BoxContainer>
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['depositProductMaxinumTenure']} </SubHeadingText>
          <SubText>{t['depositProductNoteWeek']}</SubText>
        </TextBoxContainer>
        <FormSwitchTab name="maxTenure" options={applicableSwitch} />
      </Box>
      {maximumTenure && (
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
              {t['depositProductUnit']}
            </Text>
            <FormSwitchTab name="maxTenureUnit" options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="maxTenureUnitNumber"
              textAlign={'right'}
              label={t['depositProductNumber']}
              placeholder="0"
              rightAddonText={rightElement}
            />
          </Box>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
