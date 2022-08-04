import { FormProvider, useForm } from 'react-hook-form';

import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Divider, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export function CbsSettingsFeatureLoanProducts() {
  const { t } = useTranslation();
  const methods = useForm();

  const CheckboxList = [
    { label: t['settingsLoanInsuranceEmi'], value: 'emi' },
    { label: t['settingsLoanInsuranceEpi'], value: 'epi' },

    { label: t['settingsLoanInsuranceFlat'], value: 'flat' },
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
