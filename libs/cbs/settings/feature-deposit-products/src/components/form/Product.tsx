import { FormSection, GridItem } from '@myra-ui';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const Product = () => {
  const { t } = useTranslation();

  const optionsSaving = [
    {
      label: t['depositProductRecurringSaving'],
      value: NatureOfDepositProduct.RecurringSaving,
    },
    {
      label: t['depositProductCurrent'],
      value: NatureOfDepositProduct.Current,
    },
    {
      label: t['depositProductSaving'],
      value: NatureOfDepositProduct.Saving,
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
};

export default Product;
