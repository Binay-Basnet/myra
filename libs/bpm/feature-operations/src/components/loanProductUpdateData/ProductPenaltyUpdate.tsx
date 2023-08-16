import { useMemo } from 'react';

import { FormSection, Grid, GridItem, Text } from '@myra-ui';

import { PenaltyType, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormDatePicker, FormNumberInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const LoanPenaltyUpdate = () => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const { t } = useTranslation();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);
  const penaltyList = [
    {
      label: t['loanProductRemainingPrincipal'],
      value: PenaltyType.RemainingPrincipal,
    },
    {
      label: t['loanProductPenalInterest'],
      value: PenaltyType.PenalInterest,
    },
    {
      label: 'Loan Installment Amount',
      value: PenaltyType.LoanInstallmentAmount,
    },
  ];

  return (
    <FormSection flexLayout header="Penalty Update">
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
        <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
          <Text>{t['loanProductPenaltyOn']} </Text>
          <FormSwitchTab
            name="penalty.payload.penaltyType"
            options={penaltyList}
            defaultValue={PenaltyType.RemainingPrincipal}
          />
        </GridItem>

        <FormNumberInput
          name="penalty.payload.dayAfterInstallmentDate"
          label="Day after installment date"
        />

        <FormNumberInput
          name="penalty.payload.penaltyRate"
          label="Penalty"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
        />

        <FormAmountInput
          type="number"
          name="penalty.payload.penaltyAmount"
          label="Penalty Amount"
        />

        <FormDatePicker
          name="penalty.additionalData.effectiveDate"
          label="Effective Date"
          minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
        />
      </Grid>
    </FormSection>
  );
};
