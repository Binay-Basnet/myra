import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer } from '../formui';

interface IRightElementProps {
  rightElement: FrequencyTenure;
  t: Record<string, string>;
}

export const inputRightElementText = (props: IRightElementProps) => {
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

export const LoanRepayment = () => {
  const [rightElementMax, setRightElementMax] = useState('days');
  const [rightElementMin, setRightElementMin] = useState('days');
  const { t } = useTranslation();

  const { resetField, watch } = useFormContext();

  const maxDurationUnit = watch('maxGraceDurationUnit');
  useEffect(() => {
    resetField('maximumDurationNumberLoan');
    setRightElementMax(maxDurationUnit);
  }, [maxDurationUnit]);

  const minimumDurationUnit = watch('minGraceDurationUnit');

  useEffect(() => {
    resetField('minimunDurationNumberLoan');
    setRightElementMin(minimumDurationUnit);
  }, [minimumDurationUnit]);

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

  return (
    <FormSection header="loanProductLoanRepaymentStartGraceDuration">
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s16">
          <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
            <SubHeadingText>{t['loanProductPrincipal']}</SubHeadingText>
            <SubHeadingText>{t['loanProductMinimumDuration']}</SubHeadingText>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              borderRadius="br2"
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" fontWeight="500">
                  {t['loanProductUnit']}
                </Text>
                <FormSwitchTab name="minGraceDurationUnit" options={unitOptions} />
              </Box>
              <Box w="290px">
                <FormInput
                  name="minGraceDurationUnitNumber"
                  textAlign="right"
                  label={t['loanProductNumber']}
                  rightAddonText={inputRightElementText({
                    rightElement: rightElementMin as FrequencyTenure,
                    t,
                  })}
                />
              </Box>
            </Box>
          </BoxContainer>

          <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="br2">
            <SubHeadingText>{t['loanProductInterest']}</SubHeadingText>
            <SubHeadingText>{t['loanProductMaximumDuration']}</SubHeadingText>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              borderRadius="br2"
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" fontWeight="500">
                  {t['loanProductUnit']}
                </Text>
                <FormSwitchTab name="maxGraceDurationUnit" options={unitOptions} />
              </Box>
              <Box w="290px">
                <FormInput
                  name="maxGraceDurationUnitNumber"
                  textAlign="right"
                  label={t['loanProductNumber']}
                  rightAddonText={inputRightElementText({
                    rightElement: rightElementMax as FrequencyTenure,
                    t,
                  })}
                />
              </Box>
            </Box>
          </BoxContainer>
        </Box>
      </GridItem>
    </FormSection>
  );
};
