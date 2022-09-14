import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Frequency } from '@coop/cbs/data-access';
import { BoxContainer, SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Tenure = () => {
  const { t } = useTranslation();
  const { resetField, watch } = useFormContext();
  const [rightElement, setRightElement] = useState('days');
  const minimumTenureUnit = watch('minTenureUnit');

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

  const unitOptions = [
    {
      label: t['day'],
      value: Frequency.Daily,
    },
    {
      label: t['week'],
      value: Frequency.Weekly,
    },
    {
      label: t['month'],
      value: Frequency.Monthly,
    },
    {
      label: t['year'],
      value: Frequency.Yearly,
    },
  ];

  useEffect(() => {
    resetField('minimunTenureNumber');
    setRightElement(minimumTenureUnit);
  }, [minimumTenureUnit]);

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <SubHeadingText>{t['depositProductTenure']}</SubHeadingText>
          <FormSwitchTab name="minTenureUnit" options={applicableSwitch} />
        </Box>
      </GridItem>

      <GridItem colSpan={3}>
        <BoxContainer
          p="s16"
          border="1px solid"
          borderColor="border.layout"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          borderRadius="4px"
        >
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="s3" fontWeight="500">
              {t['depositProductUnit']}
            </Text>
            <FormSwitchTab name="minTenureUnit" options={unitOptions} />
          </Box>

          <Grid templateColumns="repeat(3,1fr)" gap="s20">
            <GridItem colSpan={1}>
              <FormInput
                name="minTenureUnitNumber"
                textAlign="right"
                label={t['depositProductMinimumTenure']}
                rightAddonText={
                  rightElement && rightElement === Frequency.Daily
                    ? t['days']
                    : rightElement === Frequency.Weekly
                    ? t['weeks']
                    : rightElement === Frequency.Monthly
                    ? t['months']
                    : rightElement === Frequency.Yearly
                    ? t['years']
                    : ''
                }
              />
            </GridItem>

            <GridItem colSpan={1}>
              <FormInput
                name="maxTenureUnitNumber"
                textAlign="right"
                label={t['depositProductMaxinumTenure']}
                rightAddonText={
                  rightElement && rightElement === Frequency.Daily
                    ? t['days']
                    : rightElement === Frequency.Weekly
                    ? t['weeks']
                    : rightElement === Frequency.Monthly
                    ? t['months']
                    : rightElement === Frequency.Yearly
                    ? t['years']
                    : ''
                }
              />
            </GridItem>
          </Grid>
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
