import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
// import { useTranslation } from '@coop/shared/utils';

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

export const Tenure = () => {
  // const { t } = useTranslation();
  const [rightElementMax, setRightElementMax] = useState('day');

  const { resetField, watch } = useFormContext();

  const maxDurationUnit = watch('maximumDurationUnitLoan');

  useEffect(() => {
    resetField('maximumDurationUnitLoan');
    setRightElementMax(maxDurationUnit);
  }, [maxDurationUnit]);

  console.log(maxDurationUnit);

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
        <SubHeadingText>Tenure</SubHeadingText>
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
              <SubHeadingText>Unit</SubHeadingText>
              <FormSwitchTab
                name={'minimumDurationUnitLoan'}
                options={unitOptions}
              />
            </Box>
            <Box w="290px">
              <FormInput
                name="maximumDurationUnitLoan"
                textAlign={'right'}
                label="Number"
                placeholder="0"
                rightElement={
                  <Box mr="s24">
                    <Text
                      fontWeight="Medium"
                      fontSize="r1"
                      color="accent.debit"
                    >
                      {/* {rightElementMax} */}
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
