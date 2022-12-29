import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormSection, Text } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ProductCode = () => {
  const { t } = useTranslation();
  const methods = useFormContext();
  const [codePrev, setCodePrev] = useState('1');
  const { watch } = methods;

  const initialNo = watch('productCode.initialNo');
  const noOfDigits = watch('productCode.noOfDigits');

  useEffect(() => {
    setCodePrev(initialNo?.padStart(noOfDigits, 0));
  }, [initialNo, noOfDigits]);

  return (
    <FormSection header="loanProductProductCode" subHeader="loanProductAddprefixInitial">
      <FormInput isRequired label={t['loanProductPrefix']} name="productCode.prefix" />
      <FormInput isRequired label={t['loanProductIntitialNumber']} name="productCode.initialNo" />
      <FormInput isRequired label={t['loanProductNoOfDigits']} name="productCode.noOfDigits" />
      {codePrev && (
        <Text fontSize="r1" color="grey.500" fontWeight="Regular">
          Preview: {codePrev}
        </Text>
      )}
    </FormSection>
  );
};

export default ProductCode;
