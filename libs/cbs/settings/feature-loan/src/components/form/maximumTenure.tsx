import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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
const unitOptions = [
  {
    label: 'Day',
    value: 'Day',
  },
  {
    label: 'Week',
    value: 'Week',
  },
  {
    label: 'Month',
    value: 'Month',
  },
  {
    label: 'Year',
    value: 'Year',
  },
];

const applicableSwitch = [
  {
    label: 'Applicable',
    value: 'applicable',
  },
  {
    label: 'Not Applicable',
    value: 'notApplicable',
  },
];
export const MaximumTenure = () => {
  const [rightElement, setRightElement] = useState('days');
  const { resetField, watch } = useFormContext();
  const maximumTenure = watch('enablemaximumTenure');

  const maxTenureUnit = watch('maximumTenureUnit');
  const { t } = useTranslation();

  useEffect(() => {
    resetField('maximumTenureNumber');
    setRightElement(maxTenureUnit);
  }, [maxTenureUnit]);

  return (
    <BoxContainer>
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['loanProductMaxinumTenure']} </SubHeadingText>
          <SubText>{t['loanProductNoteWeek']}</SubText>
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
              {t['loanProductUnit']}
            </Text>
            <FormSwitchTab name={'maximumTenureUnit'} options={unitOptions} />
          </Box>
          <Box w="290px">
            <FormInput
              name="maximumTenureNumber"
              textAlign={'right'}
              label={t['loanProductNumber']}
              placeholder={t['loanProductEnterNumber']}
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="accent.debit">
                  {rightElement}
                </Text>
              }
            />
          </Box>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
