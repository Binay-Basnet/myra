import React from 'react';

import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function ProductCode() {
  const { t } = useTranslation();

  return (
    <FormSection
      header="depositProductProductCode"
      subHeader="depositProductAddprefixintial"
    >
      <FormInput label={t['depositProductPrefix']} name="productCode.prefix" />
      <FormInput
        label={t['depositProductIntitialNumber']}
        name="productCode.initialNo"
      />
    </FormSection>
  );
}

export default ProductCode;
