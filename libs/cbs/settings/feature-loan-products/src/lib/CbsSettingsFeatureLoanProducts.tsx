import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch } from '@coop/cbs/data-access';
import { Box, Checkbox, Divider, Text } from '@coop/shared/ui';
import { setEmi, setEpi, setFlat, useTranslation } from '@coop/shared/utils';

import { AcceptedCollateral } from '../components';

export function CbsSettingsFeatureLoanProducts() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const methods = useForm();

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
              <Checkbox onChange={(e) => dispatch(setEmi(e.target.checked))}>
                <Text fontSize="s3">{t['settingsLoanInsuranceEmi']}</Text>
              </Checkbox>
              <Checkbox onChange={(e) => dispatch(setEpi(e.target.checked))}>
                <Text fontSize="s3">{t['settingsLoanInsuranceEpi']}</Text>
              </Checkbox>
              <Checkbox onChange={(e) => dispatch(setFlat(e.target.checked))}>
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
