import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ProductCode = () => {
  const { t } = useTranslation();

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
    </FormSection>
  );
};

export default ProductCode;
