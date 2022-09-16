import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Frequency } from '@coop/cbs/data-access';
import { BoxContainer, SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IRightElementProps {
  rightElement: Frequency;
  t: Record<string, string>;
}

export const inputRightElementText = (props: IRightElementProps) => {
  const { rightElement, t } = props;
  if (rightElement === Frequency.Daily) {
    return t['days'];
  }
  if (rightElement === Frequency.Weekly) {
    return t['weeks'];
  }
  if (rightElement === Frequency.Monthly) {
    return t['months'];
  }
  if (rightElement === Frequency.Yearly) {
    return t['years'];
  }

  return '';
};

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
          <FormSwitchTab name="isTenureApplicable" options={applicableSwitch} />
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
            <FormSwitchTab name="tenureUnit" options={unitOptions} />
          </Box>

          <Grid templateColumns="repeat(3,1fr)" gap="s20">
            <GridItem colSpan={1}>
              <FormInput
                name="minTenureUnitNumber"
                textAlign="right"
                label={t['depositProductMinimumTenure']}
                rightAddonText={inputRightElementText({
                  rightElement: rightElement as Frequency,
                  t,
                })}
              />
            </GridItem>

            <GridItem colSpan={1}>
              <FormInput
                name="maxTenureUnitNumber"
                textAlign="right"
                label={t['depositProductMaxinumTenure']}
                rightAddonText={inputRightElementText({
                  rightElement: rightElement as Frequency,
                  t,
                })}
              />
            </GridItem>
          </Grid>
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
