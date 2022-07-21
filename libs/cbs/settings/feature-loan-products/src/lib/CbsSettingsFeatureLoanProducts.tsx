import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormCheckboxGroup } from '@coop/shared/form';
// import debounce from 'lodash/debounce';
import { Box, Divider, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral, AccountServicesCharge } from '../components';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureLoanProductsProps {}

export function CbsSettingsFeatureLoanProducts(
  props: CbsSettingsFeatureLoanProductsProps
) {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm();
  const { control, handleSubmit, getValues, watch, setError } = methods;

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
            <Box display="flex" flexDirection={'column'} rowGap="s16">
              <Box display="flex" flexDirection={'column'} gap="s4">
                <Text fontSize="r1" fontWeight="500">
                  {t['settingsLoanInsuranceScheme']}
                </Text>
                <Text fontSize="s2" fontWeight="400">
                  {t['settingsLoanInsuranceScheme']}{' '}
                </Text>
              </Box>

              <AccountServicesCharge />
            </Box>
            <Divider />
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
