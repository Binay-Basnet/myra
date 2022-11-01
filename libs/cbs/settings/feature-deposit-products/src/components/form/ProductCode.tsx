import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ProductCode = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductProductCode" subHeader="depositProductAddprefixintial">
      <FormInput label={t['depositProductPrefix']} name="productCode.prefix" />
      <FormInput label={t['depositProductIntitialNumber']} name="productCode.initialNo" />
      <FormInput
        type="number"
        label={t['depositProductNumberOfDigit']}
        name="productCode.noOfDigits"
      />
    </FormSection>
  );
};

export default ProductCode;
