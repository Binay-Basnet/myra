import React from 'react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

// import debounce from 'lodash/debounce';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
  TopText,
} from '../formui';

export const MaximumTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const maximumTenure = watch('enablemaximumTenure');

  const maxTenureUnit = watch('maximumTenureUnit');
  useEffect(() => {
    resetField('maximumTenureNumber');
    setRightElement(maxTenureUnit);
  }, [maxTenureUnit]);

  const { t } = useTranslation();

  const unitOptions = [
    {
      label: t['daily'],
      value: 'Daily',
    },
    {
      label: t['weekly'],
      value: 'Weekly',
    },
    {
      label: t['monthly'],
      value: 'Monthly',
    },
    {
      label: t['yearly'],
      value: 'Yearly',
    },
  ];

  const applicableSwitch = [
    {
      label: t['depositProductApplicable'],
      value: 'applicable',
    },
    {
      label: t['depositProductNotApplicable'],
      value: 'notApplicable',
    },
  ];

  return (
    <BoxContainer>
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['depositProductMaxinumTenure']} </SubHeadingText>
          <SubText>{t['depositProductNoteWeek']}</SubText>
        </TextBoxContainer>
        <FormSwitchTab
          name={'enablemaximumTenure'}
          options={applicableSwitch}
        />
      </Box>
      {maximumTenure && maximumTenure === 'applicable' && (
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
            <FormSwitchTab name={'maximumTenureUnit'} options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="maximumTenureNumber"
              textAlign={'right'}
              label={t['depositProductNumber']}
              placeholder="0"
              rightElement={
                <Box mr="s24">
                  <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                    {rightElement}
                  </Text>
                </Box>
              }
            />
          </Box>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
