import React from 'react';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function Product() {
  const { t } = useTranslation();

  const optionsSaving = [
    {
      label: t['depositProductRecurringSaving'],
      value: NatureOfDepositProduct.RecurringSaving,
    },
    {
      label: t['depositProductMandatory'],
      value: NatureOfDepositProduct.Mandatory,
    },
    {
      label: t['depositProductVoluntaryOptional'],
      value: NatureOfDepositProduct.VoluntaryOrOptional,
    },
    {
      label: t['depositProductTermSaving'],
      value: NatureOfDepositProduct.TermSavingOrFd,
    },
  ];

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormInput name="productName" label={t['depositProductProductName']} />
      </GridItem>
      <FormSelect
        label={t['depositProductNatureofDepositProduct']}
        name="nature"
        options={optionsSaving}
      />
      <GridItem colSpan={3}>
        <FormInput name="description" label={t['depositProductDescription']} />
      </GridItem>
    </FormSection>
  );
}

export default Product;
