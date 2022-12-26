import { FormSection } from '@myra-ui';

import { FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const ProductCode = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="loanProductProductCode" subHeader="loanProductAddprefixInitial">
      <FormInput isRequired label={t['loanProductPrefix']} name="productCode.prefix" />
      <FormInput isRequired label={t['loanProductIntitialNumber']} name="productCode.initialNo" />
      <FormInput isRequired label={t['loanProductNoOfDigits']} name="productCode.noOfDigits" />
    </FormSection>
  );
};

export default ProductCode;
