import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetLoanInsuranceSchemeQuery } from '@coop/cbs/data-access';
import { Box, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { AccountServicesCharge } from '../components';

export const LoanProductsInsurance = () => {
  const methods = useForm();
  const { t } = useTranslation();

  const { data, isLoading } = useGetLoanInsuranceSchemeQuery();
  const insuranceScheme = data?.settings?.general?.loan?.insuranceSchemes;

  useEffect(() => {
    if (insuranceScheme) {
      methods.reset({
        insuranceScheme,
      });
    }
  }, [isLoading]);

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <FormProvider {...methods}>
        <form>
          <Box display="flex" flexDirection={'column'} rowGap="s16" p="s12">
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
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoanProductsInsurance;
