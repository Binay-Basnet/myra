import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem } from '@myra-ui';

import { SubHeadingText } from '@coop/shared/components';
import { FormAmountInput, FormDatePicker, FormInput, FormSwitchTab } from '@coop/shared/form';
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
          <FormAmountInput
            name="insurancePremiumAmount"
            type="number"
            textAlign="right"
            label="Insurance Premium Amount"
          />
          <GridItem colSpan={1}>
            <FormDatePicker name="insuranceStartDate" label="Start Date" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="insuranceValidUpto" label="Valid Upto" />
          </GridItem>
        </>
      )}
    </FormSection>
  );
};
