import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure, useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput } from '@coop/shared/form';
import { Alert, Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IRightElementProps {
  rightElement: FrequencyTenure;
  t: Record<string, string>;
}

export const inputRightElementText = (props: IRightElementProps) => {
  const { rightElement, t } = props;
  if (rightElement === FrequencyTenure.Day) {
    return t['days'];
  }
  if (rightElement === FrequencyTenure.Week) {
    return t['weeks'];
  }
  if (rightElement === FrequencyTenure.Month) {
    return t['months'];
  }
  if (rightElement === FrequencyTenure.Year) {
    return t['years'];
  }

  return '';
};

export const Tenure = () => {
  const { t } = useTranslation();
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { watch } = useFormContext();

  const products = watch('productId');

  const poductDetails = useGetAccountOpenProductDetailsQuery(
    { id: products },
    {
      enabled: triggerQuery,
    }
  );

  const productData = poductDetails?.data?.settings?.general?.depositProduct?.formState?.data;

  useEffect(() => {
    if (products) {
      setTriggerQuery(true);
    }
  }, [products]);

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s16" bg="neutralColorLight.Gray-0">
        <SubHeadingText>{t['accountOpenTenure']} </SubHeadingText>
        <Box gap="s8" display="flex" flexDirection="column" background="neutralColorLight.Gray-0">
          <Box w="290px">
            <FormInput
              type="number"
              name="tenureNumber"
              textAlign="right"
              rightAddonText={productData?.tenureUnit?.toLowerCase()}
            />
          </Box>
          <Box>
            <Alert status="info" title="Tenure">
              <ul>
                <li>
                  <b>
                    {productData?.minTenureUnitNumber} {productData?.tenureUnit} -{' '}
                    {productData?.maxTenureUnitNumber} {productData?.tenureUnit}
                  </b>
                </li>
              </ul>
            </Alert>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
