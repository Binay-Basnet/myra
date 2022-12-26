import { useFormContext } from 'react-hook-form';

import { Alert, Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { PrematurePenaltyDateType } from '@coop/cbs/data-access';
import { BoxContainer } from '@coop/shared/components';
import { FormAmountInput, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PrematurePenalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();

  const prematurePenaltyEnable = watch('isPrematurePenaltyApplicable');

  const penaltyDataType = [
    {
      label: t['depositProductEffectiveDaysFromStart'],
      value: PrematurePenaltyDateType.EffectiveDaysFromStart,
    },
    {
      label: t['depositProductRemainingDaystoGetMatured'],
      value: PrematurePenaltyDateType.RemainingDaysToGetMatured,
    },
  ];

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
    },
    {
      label: t['disable'],
      value: false,
    },
  ];

  return (
    <FormSection header="depositProductPrematuredPenaltySetup">
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <Text fontSize="s2" fontWeight="Regular" color="gray.700">
              {t['prematurePenaltyEnable']}
            </Text>
            <FormSwitchTab name="isPrematurePenaltyApplicable" options={enableSwitch} />
          </Box>

          {prematurePenaltyEnable && (
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <FormSelect
                name="prematurePenaltySetup.penaltyDateType"
                label={t['depositProductPenaltyDateType']}
                options={penaltyDataType}
              />
              <FormInput
                name="prematurePenaltySetup.noOfDays"
                label={t['depositProductNumberofDays']}
              />
              <FormInput
                isRequired
                name="prematurePenaltySetup.penaltyRate"
                label={t['depositProductPenaltyRate']}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
                textAlign="right"
              />
              <FormAmountInput
                type="number"
                name="prematurePenaltySetup.penaltyAmount"
                label={t['depositProductPenaltyAmount']}
              />

              <GridItem colSpan={3}>
                <Alert status="warning">
                  <Text fontWeight="Medium" fontSize="r1">
                    {t['penaltyAlert']}
                  </Text>
                </Alert>
              </GridItem>
            </Grid>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
