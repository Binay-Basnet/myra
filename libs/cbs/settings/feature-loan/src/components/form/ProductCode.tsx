import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ProductCode = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const [codePrev, setCodePrev] = useState('1');
  const { watch } = methods;

  const prefix = watch('productCode.prefix');
  const initialNo = watch('productCode.initialNo');
  const noOfDigits = watch('productCode.noOfDigits');

  useEffect(() => {
    setCodePrev(initialNo?.padStart(noOfDigits, 0));
  }, [prefix, initialNo, noOfDigits]);

  return (
    <FormSection header="loanProductProductCode" subHeader="loanProductAddprefixInitial">
      <FormInput isRequired label={t['loanProductPrefix']} name="productCode.prefix" />
      <FormInput isRequired label={t['loanProductIntitialNumber']} name="productCode.initialNo" />
      <FormInput isRequired label={t['loanProductNoOfDigits']} name="productCode.noOfDigits" />
      {(prefix || codePrev) && (
        <Box borderRadius="br2" px="s16" py="s8" bg="background.500" w="250px">
          <Text
            fontSize="s2"
            fontWeight="Regular"
            color="neutralColorLight.Gray-70"
            lineHeight="150%"
          >
            {t['memberSettingssCorePreview']}
          </Text>
          <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-70">
            {prefix}
            {codePrev}
          </Text>
        </Box>
      )}
    </FormSection>
  );
};

export default ProductCode;
