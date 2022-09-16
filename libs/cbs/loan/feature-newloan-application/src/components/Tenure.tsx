import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure, useGetLoanProductDetailsDataQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput } from '@coop/shared/form';
import { Alert, Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const Tenure = () => {
  const { t } = useTranslation();
  const [rightElement, setRightElement] = useState('');
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { resetField, watch } = useFormContext();

  const products = watch('productId');

  const poductDetails = useGetLoanProductDetailsDataQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const productData = poductDetails?.data?.settings?.general?.loanProducts?.formState?.data;

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

  const tenureUnit = productData?.tenureUnit ? productData?.tenureUnit : 'days';

  useEffect(() => {
    resetField('tenureUnitFrequency');
    setRightElement(tenureUnit);
  }, [tenureUnit]);

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s16" bg="neutralColorLight.Gray-0">
        <SubHeadingText>{t['accountOpenTenure']} </SubHeadingText>
        <Box
          display="flex"
          flexDirection="column"
          border="1px solid"
          borderColor="border.layout"
          p="s16"
          borderRadius="br2"
          background="neutralColorLight.Gray-0"
        >
          <Box display="flex" flexDirection="row" justifyContent="space-between" borderRadius="4px">
            {/* <Box display="flex" flexDirection="column" gap="s4">
              <SubHeadingText>{t['accountOpenUnit']} </SubHeadingText>
              <FormSwitchTab name="tenure" options={unitOptions} />
            </Box> */}
            <Box w="290px">
              <FormInput
                type="number"
                name="tenure"
                textAlign="right"
                label="Tenure"
                rightAddonText={
                  rightElement && rightElement === FrequencyTenure.Day
                    ? t['days']
                    : rightElement === FrequencyTenure.Week
                    ? t['weeks']
                    : rightElement === FrequencyTenure.Month
                    ? t['months']
                    : rightElement === FrequencyTenure.Year
                    ? t['years']
                    : ''
                }
              />
            </Box>
          </Box>
          <Box pt="s16">
            <Alert status="info" title="Tenure" hideCloseIcon>
              {productData?.minTenureUnitNumber} {productData?.tenureUnit} -{' '}
              {productData?.maxTenureUnitNumber} {productData?.tenureUnit}
            </Alert>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
