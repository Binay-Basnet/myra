import { useFormContext } from 'react-hook-form';

import { FormAmountInput, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText } from '../formui';

export const InsuranceApplicable = () => {
  const { watch } = useFormContext();
  const { t } = useTranslation();

  const isInsuranceApplicable = watch('isInsuranceApplicable');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  const insuranceTypeList = [
    { label: 'Type!', value: 'type1' },
    { label: 'Type2', value: 'type12' },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s16">
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['loanProductIsInsuranceApplicable']} </SubHeadingText>
            <FormSwitchTab name="isInsuranceApplicable" options={yesNo} />
          </Box>
          {isInsuranceApplicable && (
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <GridItem colSpan={3}>
                <FormSelect
                  name="insuranceType.type"
                  label={t['loanProductInsuranceType']}
                  options={insuranceTypeList}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <FormInput
                  name="insuranceType.rate"
                  label={t['loanProductInsuranceRate']}
                  textAlign="right"
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  type="number"
                />
              </GridItem>

              <GridItem colSpan={1}>
                <FormAmountInput
                  name="insuranceType.amount"
                  label={t['loanProductInsuranceAmount']}
                />
              </GridItem>
            </Grid>
          )}
        </Box>
      </GridItem>
    </FormSection>
  );
};
