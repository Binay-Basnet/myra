import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { omit } from 'lodash';

import {
  useGetLoanGeneralSettingsQuery,
  useSetLoanGeneralSettingsMutation,
} from '@coop/cbs/data-access';
import { FormCheckbox } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Divider,
  SettingsFooter,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export function CbsSettingsFeatureLoanProducts() {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, reset } = methods;
  const { data } = useGetLoanGeneralSettingsQuery();
  const loanGeneralData = data?.settings?.general?.loan?.general;
  const [collateralList, setCollateralList] = useState<
    { name: string; enabled: boolean; id: string }[]
  >([]);

  React.useEffect(() => {
    if (loanGeneralData) {
      reset(loanGeneralData);
      if (loanGeneralData?.collateralList) {
        setCollateralList(
          loanGeneralData?.collateralList as typeof collateralList
        );
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
        collateralList: collateralList.map((list) => omit(list, 'id')),
      }),
    });
  };

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <FormProvider {...methods}>
        <Box
          display="flex"
          flexDirection="column"
          rowGap="s32"
          padding="s12"
          pb="s20"
        >
          <Box display={'flex'} flexDirection="column" gap="s16">
            <Text fontSize="r1" fontWeight="500">
              {t['settingsLoanRepaymentScheme']}{' '}
            </Text>
          </Box>
          <Box display="flex" flexDir="column" gap={2}>
            <FormCheckbox name="emi" label={t['settingsLoanInsuranceEmi']} />
            <FormCheckbox name="epi" label={t['settingsLoanInsuranceEpi']} />
            <FormCheckbox name="flat" label={t['settingsLoanInsuranceFlat']} />
          </Box>
          <Divider />
          <AcceptedCollateral
            list={collateralList}
            setList={setCollateralList}
          />
        </Box>
        <SettingsFooter handleSave={handleSave} />
      </FormProvider>
    </Box>
  );
}

export default CbsSettingsFeatureLoanProducts;
