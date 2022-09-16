import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ProductCode = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="loanProductProductCode" subHeader="loanProductAddprefixInitial">
      <FormInput label={t['loanProductPrefix']} name="productCode.prefix" />
      <FormInput label={t['loanProductIntitialNumber']} name="productCode.initialNo" />
    </FormSection>
  );
};

export default ProductCode;
