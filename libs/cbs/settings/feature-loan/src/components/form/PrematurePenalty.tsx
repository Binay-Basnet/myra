import { useFormContext } from 'react-hook-form';
import { Alert, Box, FormSection, Grid, GridItem, Text, TextFields } from '@myra-ui';

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

  // const { data: coa } = useGetCoaListQuery({
  //   filter: {
  //     active: true,
  //   },
  // });

  // const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  // const coaList = coaData?.map((item) => ({
  //   label: item?.name?.en as string,
  //   value: item?.id as string,
  // }));

  return (
    <FormSection header="depositProductPrematuredPenaltySetup">
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <TextFields>{t['prematurePenaltyEnable']}</TextFields>
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
              {/* <FormSelect
        name="prematurePenaltySetup.penaltyLedgerMapping"
        label={t['depositProductPenaltyLedgerMapping']}
        options={coaList}
      /> */}
              <FormInput
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
