import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { BoxContainer, SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
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

  const router = useRouter();

  const { resetField, watch } = useFormContext();
  const [rightElement, setRightElement] = useState('days');
  const minimumTenureUnit = watch('minTenureUnit');
  const minTenureUnitNumber = watch('minTenureUnitNumber');

  const unitOptions = [
    {
      label: t['day'],
      value: FrequencyTenure.Day,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['week'],
      value: FrequencyTenure.Week,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['month'],
      value: FrequencyTenure.Month,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['year'],
      value: FrequencyTenure.Year,
      isDisabled: router?.asPath?.includes('/edit'),
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
                isRequired
                name="minTenureUnitNumber"
                textAlign="right"
                label={t['depositProductMinimumTenure']}
                rightAddonText={inputRightElementText({
                  rightElement: rightElement as FrequencyTenure,
                  t,
                })}
                isDisabled={router?.asPath?.includes('/edit')}
              />
            </GridItem>

            <GridItem colSpan={1}>
              <FormInput
                isRequired
                name="maxTenureUnitNumber"
                textAlign="right"
                label={t['depositProductMaxinumTenure']}
                rightAddonText={inputRightElementText({
                  rightElement: rightElement as FrequencyTenure,
                  t,
                })}
                rules={{
                  min: {
                    value: minTenureUnitNumber,
                    message: 'Maximum tenure number should be greater than minimum number',
                  },
                }}
                isDisabled={router?.asPath?.includes('/edit')}
              />
            </GridItem>
          </Grid>
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
