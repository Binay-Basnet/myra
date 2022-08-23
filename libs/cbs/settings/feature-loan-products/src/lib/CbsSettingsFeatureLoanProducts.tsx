import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  useGetLoanGeneralSettingsQuery,
  useSetLoanGeneralSettingsMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { Box, Divider, SettingsFooter, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export function CbsSettingsFeatureLoanProducts() {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, reset } = methods;
  const { data } = useGetLoanGeneralSettingsQuery();
  const loanGeneralData = data?.settings?.general?.loan?.general;

  React.useEffect(() => {
    if (loanGeneralData) {
      reset(loanGeneralData);
    }
  }, [loanGeneralData]);

  const { mutateAsync } = useSetLoanGeneralSettingsMutation();

  const emi = watch('emi');
  const epi = watch('epi');
  const flat = watch('flat');

  const handleSave = () => {
    mutateAsync({
      emi: emi ?? loanGeneralData?.emi,
      epi: epi ?? loanGeneralData?.epi,
      flat: flat ?? loanGeneralData?.flat,
    });
  };

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <FormProvider {...methods}>
        <form>
          <Box display="flex" flexDirection="column" rowGap="s32" padding="s12">
            <Box display={'flex'} flexDirection="column" gap="s16">
              <Text fontSize="r1" fontWeight="500">
                {t['settingsLoanRepaymentScheme']}{' '}
              </Text>
            </Box>
            <Box display="flex" flexDir="column" gap={2}>
              <FormCheckbox
                name="emi"
                key={JSON.stringify(loanGeneralData?.emi)}
              >
                <Text fontSize="s3">{t['settingsLoanInsuranceEmi']}</Text>
              </FormCheckbox>
              <FormCheckbox
                name="epi"
                key={JSON.stringify(loanGeneralData?.epi)}
              >
                <Text fontSize="s3">{t['settingsLoanInsuranceEpi']}</Text>
              </FormCheckbox>
              <FormCheckbox
                name="flat"
                key={JSON.stringify(loanGeneralData?.flat)}
              >
                <Text fontSize="s3">{t['settingsLoanInsuranceFlat']}</Text>
              </FormCheckbox>
            </Box>
            <Divider />
            <AcceptedCollateral />
          </Box>
          <SettingsFooter handleSave={handleSave} />
        </form>
      </FormProvider>
    </Box>
  );
}

export default CbsSettingsFeatureLoanProducts;
