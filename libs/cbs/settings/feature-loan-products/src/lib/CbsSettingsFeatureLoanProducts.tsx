import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { asyncToast, Box, Divider, Grid, Loader, Scrollable, SettingsFooter } from '@myra-ui';

import {
  useGetLoanGeneralSettingsQuery,
  useSetLoanGeneralSettingsMutation,
} from '@coop/cbs/data-access';
import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { FormCheckbox, FormLeafCoaHeadSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export const CbsSettingsFeatureLoanProducts = () => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, reset } = methods;
  const { data, isLoading } = useGetLoanGeneralSettingsQuery();
  const loanGeneralData = data?.settings?.general?.loan?.general;
  const [collateralList, setCollateralList] = useState<
    { name: string; enabled: boolean; id: string }[]
  >([]);

  React.useEffect(() => {
    if (loanGeneralData) {
      reset({
        ...loanGeneralData,
        rebateLedger: {
          label: loanGeneralData?.rebateLedgerName,
          value: loanGeneralData?.rebateLedger,
        },
      });

      if (loanGeneralData?.collateralList) {
        setCollateralList(loanGeneralData?.collateralList as typeof collateralList);
      }
    }
  }, [loanGeneralData]);

  const { mutateAsync } = useSetLoanGeneralSettingsMutation();

  const emi = watch('emi');
  const epi = watch('epi');
  const flat = watch('flat');

  const handleSave = async () => {
    await asyncToast({
      id: 'loan-settings',
      msgs: {
        success: 'Loan Settings Updated',
        loading: 'Updating Loan Settings',
      },
      onSuccess: () => undefined,
      promise: mutateAsync({
        emi: emi ?? loanGeneralData?.emi,
        epi: epi ?? loanGeneralData?.epi,
        flat: flat ?? loanGeneralData?.flat,
        collateralList,
        rebateLedger: methods.getValues()?.['rebateLedger'],
      }),
    });
  };

  return (
    <Scrollable>
      <Box pb="s20" width="full" display="flex" flexDirection="column">
        {isLoading ? (
          <Box display="flex" justifyContent="center" pt="100px">
            <Loader />
          </Box>
        ) : (
          <FormProvider {...methods}>
            <Box display="flex" flexDirection="column" rowGap="s32" padding="s12" pb="s60">
              <SettingsCard title={t['settingsLoanRepaymentScheme']}>
                <Box display="flex" flexDir="column" gap={2}>
                  <FormCheckbox name="emi" label={t['settingsLoanInsuranceEmi']} />
                  <FormCheckbox name="epi" label={t['settingsLoanInsuranceEpi']} />
                  <FormCheckbox name="flat" label={t['settingsLoanInsuranceFlat']} />
                </Box>
              </SettingsCard>
              <Divider />
              <AcceptedCollateral list={collateralList} setList={setCollateralList} />

              <SettingsCard title="Rebate Setup" subtitle="Choose COA Head for rebate payment">
                <Grid templateColumns="repeat(3, 1fr)">
                  <FormLeafCoaHeadSelect
                    name="rebateLedger"
                    label="Rebate COA Head"
                    menuPosition="fixed"
                  />
                </Grid>
              </SettingsCard>
            </Box>
            <SettingsFooter handleSave={handleSave} />
          </FormProvider>
        )}
      </Box>
    </Scrollable>
  );
};

export default CbsSettingsFeatureLoanProducts;
