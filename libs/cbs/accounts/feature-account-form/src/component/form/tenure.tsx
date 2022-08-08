import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const unitOptions = [
  {
    label: 'Day',
    value: FrequencyTenure.Day,
  },
  {
    label: 'Week',
    value: FrequencyTenure.Week,
  },
  {
    label: 'Month',
    value: FrequencyTenure.Month,
  },
  {
    label: 'Year',
    value: FrequencyTenure.Year,
  },
];

export const Tenure = () => {
  const { t } = useTranslation();
  const [rightElementMax, setRightElementMax] = useState('day');

  const { resetField, watch } = useFormContext();

  const tenureUnit = watch('tenure');

  useEffect(() => {
    resetField('tenureUnitFrequency');
    setRightElementMax(tenureUnit);
  }, [tenureUnit]);

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="s16"
        p="s16"
        bg="neutralColorLight.Gray-0"
      >
        <SubHeadingText>{t['accountOpenTenure']} </SubHeadingText>
        <Box
          display={'flex'}
          flexDirection="column"
          border="1px solid"
          borderColor={'border.layout'}
          p="s16"
          borderRadius="br2"
          background="neutralColorLight.Gray-0"
        >
          <Box
            display={'flex'}
            flexDirection="row"
            justifyContent="space-between"
            borderRadius={'4px'}
          >
            <Box display={'flex'} flexDirection="column" gap="s4">
              <SubHeadingText>{t['accountOpenUnit']} </SubHeadingText>
              <FormSwitchTab name={'tenure'} options={unitOptions} />
            </Box>
            <Box w="290px">
              <FormInput
                type="number"
                name="tenureNumber"
                textAlign={'right'}
                label={t['accountOpenNumber']}
                placeholder="0"
                rightElement={
                  <Box mr="s24">
                    <Text
                      fontWeight="Medium"
                      fontSize="r1"
                      color="accent.debit"
                    >
                      {rightElementMax}
                    </Text>
                  </Box>
                }
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
