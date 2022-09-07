import { useFormContext } from 'react-hook-form';

import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
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

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display={'flex'} flexDirection="column" gap="s16">
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>
              {t['loanProductIsInsuranceApplicable']}{' '}
            </SubHeadingText>
            <FormSwitchTab name="isInsuranceApplicable" options={yesNo} />
          </Box>
          {isInsuranceApplicable && (
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <GridItem colSpan={3}>
                <FormSelect
                  name="insuranceType"
                  label={t['loanProductInsuranceType']}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <FormInput
                  name="insuranceRate"
                  label={t['loanProductInsuranceRate']}
                  textAlign={'right'}
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  type={'number'}
                />
              </GridItem>

              <GridItem colSpan={1}>
                <FormInput
                  type="text"
                  name="insuranceAmount"
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
