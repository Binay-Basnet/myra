import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { inputRightElementText } from './LoanRepayment';
import { BoxContainer, SubHeadingText, SubText, TextBoxContainer } from '../formui';

export const MinimunTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { t } = useTranslation();
  const { resetField, watch } = useFormContext();

  const minimumTenure = watch('minTenure');
  const minimumTenureUnit = watch('minTenureUnit');

  const unitOptions = [
    {
      label: t['day'],
      value: FrequencyTenure.Day,
    },
    {
      label: t['week'],
      value: FrequencyTenure.Week,
    },
    {
      label: t['month'],
      value: FrequencyTenure.Month,
    },
    {
      label: t['year'],
      value: FrequencyTenure.Year,
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
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['loanProductMinimumTenure']} </SubHeadingText>
              <SubText>{t['loanProductNoteWeek']}</SubText>
            </TextBoxContainer>
            <FormSwitchTab name="minTenure" options={applicableSwitch} />
          </Box>
          {minimumTenure && (
            <BoxContainer
              p="s16"
              border="1px solid"
              borderColor="border.layout"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              borderRadius="4px"
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" fontWeight="Medium">
                  {t['loanProductUnit']}
                </Text>
                <FormSwitchTab name="minTenureUnit" options={unitOptions} />
              </Box>
              <Box w="290px">
                <FormInput
                  name="minTenureUnitNumber"
                  textAlign="right"
                  label={t['loanProductNumber']}
                  rightAddonText={
                    rightElement &&
                    inputRightElementText({ rightElement: rightElement as FrequencyTenure, t })
                  }
                />
              </Box>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
