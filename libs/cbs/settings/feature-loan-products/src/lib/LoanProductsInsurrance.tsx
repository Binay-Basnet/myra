import { FormProvider, useForm } from 'react-hook-form';

import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AccountServicesCharge } from '../components';

export const LoanProductsInsurance = () => {
  const methods = useForm();
  const { t } = useTranslation();

  return (
    <Box
      pb="s20"
      width="full"
      display={'flex'}
      flexDirection={'column'}
      p="s12"
    >
      <FormProvider {...methods}>
        <form>
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
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoanProductsInsurance;
