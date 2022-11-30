import { useFormContext } from 'react-hook-form';

import { SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const Insurance = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const { watch } = methods;
  const insurance = watch('insurance');

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <SubHeadingText>Insurance</SubHeadingText>
          <FormSwitchTab name="insurance" options={yesNo} />
        </Box>
      </GridItem>
      {insurance && (
        <>
          <GridItem colSpan={2}>
            <FormInput name="insuranceCompany" type="text" label="Insurance Company" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormInput
              name="insurancePremiumAmount"
              type="number"
              textAlign="right"
              label="Insurance Premium Amount"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormInput name="insuranceStartDate" type="date" label="Start Date" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormInput name="insuranceValidUpto" type="date" label="Valid Upto" />
          </GridItem>
        </>
      )}
    </FormSection>
  );
};
