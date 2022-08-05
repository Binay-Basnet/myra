import { FormProvider, useForm } from 'react-hook-form';

import { LoanRepaymentScheme } from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Divider, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export function CbsSettingsFeatureLoanProducts() {
  const { t } = useTranslation();
  const methods = useForm();

  const CheckboxList = [
    { label: t['settingsLoanInsuranceEmi'], value: LoanRepaymentScheme.Emi },
    { label: t['settingsLoanInsuranceEpi'], value: LoanRepaymentScheme.Epi },
    { label: t['settingsLoanInsuranceFlat'], value: LoanRepaymentScheme.Flat },
  ];

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <FormProvider {...methods}>
        <form>
          <Box display="flex" flexDirection="column" rowGap="s32" padding="s12">
            <Box display={'flex'} flexDirection="column" gap="s16">
              <Text fontSize="r1" fontWeight="500">
                {t['settingsLoanRepaymentScheme']}{' '}
              </Text>
              <FormCheckboxGroup
                name="loanRepaymentScheme"
                list={CheckboxList}
                orientation="column"
              />
            </Box>
            <Divider />
            <AcceptedCollateral />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

export default CbsSettingsFeatureLoanProducts;
