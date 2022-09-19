import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure, useGetAccountOpenProductDetailsQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
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
  const [rightElement, setRightElement] = useState('day');
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { resetField, watch } = useFormContext();

  const products = watch('productId');

  const unitOptions = [
    {
      label: t['day'],
      value: FrequencyTenure.Day,
    },
    {
      label: t['week'],
      value: FrequencyTenure.Week,
    },
    {
      label: t['month'],
      value: FrequencyTenure.Month,
    },
    {
      label: t['year'],
      value: FrequencyTenure.Year,
    },
  ];

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

  const tenureUnit = watch('tenure');

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
            <Box display="flex" flexDirection="column" gap="s4">
              <SubHeadingText>{t['accountOpenUnit']} </SubHeadingText>
              <FormSwitchTab name="tenure" options={unitOptions} />
            </Box>
            <Box w="290px">
              <FormInput
                type="number"
                name="tenureNumber"
                textAlign="right"
                label={t['accountOpenNumber']}
                rightAddonText={inputRightElementText({
                  rightElement: rightElement as FrequencyTenure,
                  t,
                })}
              />
            </Box>
          </Box>
          <Box p="s16">
            <Alert status="info" title="Tenure">
              <ul>
                <li>
                  {' '}
                  {productData?.minTenureUnitNumber} {productData?.tenureUnit} -{' '}
                  {productData?.maxTenureUnitNumber} {productData?.tenureUnit}
                </li>
              </ul>
            </Alert>
          </Box>
        </Box>
      </Box>
    </GroupContainer>
  );
};
