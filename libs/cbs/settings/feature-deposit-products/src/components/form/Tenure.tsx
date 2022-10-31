import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { BoxContainer } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IRightElementProps {
  rightElement: FrequencyTenure;
  t: Record<string, string>;
}

const inputRightElementText = (props: IRightElementProps) => {
  const { rightElement, t } = props;
  if (rightElement === FrequencyTenure.Day) {
    return t['days'];
  }
  if (rightElement === FrequencyTenure.Week) {
    return t['weeks'];
  }
  if (rightElement === FrequencyTenure.Month) {
    return t['months'];
  }
  if (rightElement === FrequencyTenure.Year) {
    return t['years'];
  }

  return '';
};

export const Tenure = () => {
  const { t } = useTranslation();
  const { resetField, watch } = useFormContext();
  const [rightElement, setRightElement] = useState('days');
  const minimumTenureUnit = watch('minTenureUnit');
  // const isTenureApplicable = watch('isTenureApplicable');
  // const depositNature = watch('nature');

  // const applicableSwitch = [
  //   {
  //     label: t['depositProductApplicable'],
  //     value: true,
  //   },
  //   {
  //     label: t['depositProductNotApplicable'],
  //     value: false,
  //   },
  // ];

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

  useEffect(() => {
    resetField('minimunTenureNumber');
    setRightElement(minimumTenureUnit);
  }, [minimumTenureUnit]);

  return (
    <FormSection header="depositProductTenure">
      {/* {(depositNature === NatureOfDepositProduct.Saving ||
        depositNature === NatureOfDepositProduct.Current) && (
        <GridItem colSpan={3}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['depositProductTenure']}</SubHeadingText>
            <FormSwitchTab name="isTenureApplicable" options={applicableSwitch} />
          </Box>
        </GridItem>
      )} */}

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
                  rightElement: rightElement as FrequencyTenure,
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
                  rightElement: rightElement as FrequencyTenure,
                  t,
                })}
              />
            </GridItem>
          </Grid>
        </BoxContainer>
      </GridItem>

      {/* {isTenureApplicable && (
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
                    rightElement: rightElement as FrequencyTenure,
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
                    rightElement: rightElement as FrequencyTenure,
                    t,
                  })}
                />
              </GridItem>
            </Grid>
          </BoxContainer>
        </GridItem>
      )} */}
    </FormSection>
  );
};
