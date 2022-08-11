import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  useAppDispatch,
  useGetLoanGeneralSettingsQuery,
} from '@coop/cbs/data-access';
import { Box, Checkbox, Divider, Text } from '@coop/shared/ui';
import { setEmi, setEpi, setFlat, useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export function CbsSettingsFeatureLoanProducts() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const methods = useForm();
  const loanGeneralSettingDataQuery = useGetLoanGeneralSettingsQuery();
  const loanGeneralData =
    loanGeneralSettingDataQuery?.data?.settings?.general?.loan?.general;

  React.useEffect(() => {
    dispatch(setEmi(loanGeneralData?.emi || false));
    dispatch(setEpi(loanGeneralData?.epi || false));
    dispatch(setFlat(loanGeneralData?.flat || false));
  }, [JSON.stringify(loanGeneralData)]);

  // const CheckboxList = [
  //   { label: t['settingsLoanInsuranceEmi'], value: LoanRepaymentScheme.Emi },
  //   { label: t['settingsLoanInsuranceEpi'], value: LoanRepaymentScheme.Epi },
  //   { label: t['settingsLoanInsuranceFlat'], value: LoanRepaymentScheme.Flat },
  // ];

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
              <Checkbox
                key={JSON.stringify(loanGeneralData?.emi)}
                onChange={(e) => dispatch(setEmi(e.target.checked))}
                defaultChecked={loanGeneralData?.emi || false}
              >
                <Text fontSize="s3">{t['settingsLoanInsuranceEmi']}</Text>
              </Checkbox>
              <Checkbox
                key={JSON.stringify(loanGeneralData?.epi)}
                onChange={(e) => dispatch(setEpi(e.target.checked))}
                defaultChecked={loanGeneralData?.epi || false}
              >
                <Text fontSize="s3">{t['settingsLoanInsuranceEpi']}</Text>
              </Checkbox>
              <Checkbox
                key={JSON.stringify(loanGeneralData?.flat)}
                onChange={(e) => dispatch(setFlat(e.target.checked))}
                defaultChecked={loanGeneralData?.flat || false}
              >
                <Text fontSize="s3">{t['settingsLoanInsuranceFlat']}</Text>
              </Checkbox>
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
