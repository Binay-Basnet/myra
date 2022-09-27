import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FrequencyTenure } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText } from '@coop/shared/components';
import { FormInput } from '@coop/shared/form';
import { Alert, Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { useLoanProductContext } from '../hooks/useLoanProduct';

export const Tenure = () => {
  const { t } = useTranslation();
  const [rightElement, setRightElement] = useState<FrequencyTenure | null>(null);

  const { resetField } = useFormContext();

  const { product } = useLoanProductContext();

  const tenureUnit = product?.tenureUnit ?? FrequencyTenure.Day;

  useEffect(() => {
    resetField('tenureUnitFrequency');
    setRightElement(tenureUnit);
  }, [resetField, tenureUnit]);

  const TenureDict = {
    [FrequencyTenure.Day]: t['days'],
    [FrequencyTenure.Week]: t['weeks'],
    [FrequencyTenure.Month]: t['months'],
    [FrequencyTenure.Year]: t['years'],
  };

  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" gap="s16" bg="neutralColorLight.Gray-0">
        <SubHeadingText>{t['accountOpenTenure']} </SubHeadingText>
        {/* <Box */}
        {/*   display="flex" */}
        {/*   flexDirection="column" */}
        {/*   border="1px solid" */}
        {/*   borderColor="border.layout" */}
        {/*   p="s16" */}
        {/*   borderRadius="br2" */}
        {/*   background="neutralColorLight.Gray-0" */}
        {/* > */}
        {/*   <Box display="flex" flexDirection="row" justifyContent="space-between" borderRadius="4px"> */}
        {/* <Box display="flex" flexDirection="column" gap="s4">
              <SubHeadingText>{t['accountOpenUnit']} </SubHeadingText>
              <FormSwitchTab name="tenure" options={unitOptions} />
            </Box> */}
        {/* <Box w="290px"> */}
        <Box w="290px">
          <FormInput
            rules={{
              max: {
                value: product?.maxTenureUnitNumber as number,
                message: 'Tenure is invalid',
              },
              min: {
                value: product?.minTenureUnitNumber as number,
                message: 'Tenure is invalid',
              },
            }}
            type="number"
            name="tenure"
            textAlign="right"
            label="Tenure"
            rightAddonText={!rightElement ? '' : TenureDict[rightElement]}
          />
        </Box>
        {/*   </Box> */}
        {/* </Box> */}
        <Box>
          <Alert status="info" hideCloseIcon>
            Tenure:{' '}
            <b>
              {product?.minTenureUnitNumber} {product?.tenureUnit} - {product?.maxTenureUnitNumber}{' '}
              {product?.tenureUnit}
            </b>
          </Alert>
          {/* </Box> */}
        </Box>
      </Box>
    </GroupContainer>
  );
};
