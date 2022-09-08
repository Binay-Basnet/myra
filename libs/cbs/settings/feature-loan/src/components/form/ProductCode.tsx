import { FormInput, FormSwitch } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function ProductCode() {
  const { t } = useTranslation();

  return (
    <FormSection
      header="loanProductProductCode"
      subHeader="loanProductAddprefixInitial"
    >
      <FormInput label={t['loanProductPrefix']} name="productCode.prefix" />
      <FormInput
        label={t['loanProductIntitialNumber']}
        name="productCode.initialNo"
      />
      <GridItem colSpan={3}>
        <FormSwitch name="reset" label={t['loanProductReseteveryfiscalyear']} />
      </GridItem>
    </FormSection>
  );
}

export default ProductCode;
