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
    <FormSection header="depositProductProductCode" subHeader="depositProductAddprefixintial">
      <FormInput isRequired label={t['depositProductPrefix']} name="productCode.prefix" />
      <FormInput
        isRequired
        label={t['depositProductIntitialNumber']}
        name="productCode.initialNo"
      />
      <FormInput
        isRequired
        type="number"
        label={t['depositProductNumberOfDigit']}
        name="productCode.noOfDigits"
      />
      {codePrev && (
        <Text fontSize="r1" color="grey.500" fontWeight="Regular">
          Preview: {codePrev}
        </Text>
      )}
    </FormSection>
  );
};

export default ProductCode;
