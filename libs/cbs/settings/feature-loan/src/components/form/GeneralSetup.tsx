import { useFormContext } from 'react-hook-form';

import {
  NatureOfLoanProduct,
  useGetLoanProductSettingsQuery,
  useGetLoanProductSubTypeQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const GeneralSetup = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const productType = watch('productType');

  const { data: productDataList } = useGetLoanProductSettingsQuery();

  const { data: productSubTypeList } = useGetLoanProductSubTypeQuery({
    productTypeId: productType,
  });

  const productTypesList = productDataList?.settings?.general?.loan?.productType?.productTypes;
  const productSubTypesList =
    productSubTypeList?.settings?.general?.loan?.productType?.productSubTypes;

  const productTypes = productTypesList?.map((item) => ({
    label: item?.productType as string,
    value: item?.id as string,
  }));

  const productSubTypes = productSubTypesList?.map((item) => ({
    label: item?.productSubType as string,
    value: item?.id as string,
  }));

  const productNature = [
    {
      label: t['loanProductProgressive'],
      value: NatureOfLoanProduct.Progressive,
    },
    {
      label: t['loanProductUnprogressive'],
      value: NatureOfLoanProduct.Unprogressive,
    },
  ];

  return (
    <FormSection header="loanProductGeneralSetup">
      <GridItem colSpan={2}>
        <FormInput name="productName" label={t['loanProductProductName']} />
      </GridItem>

      <FormSelect name="productType" options={productTypes} label={t['loanProductProductType']} />
      <GridItem colSpan={2}>
        <FormSelect
          name="productSubType"
          options={productSubTypes}
          label={t['loanProductProductSubtype']}
        />
      </GridItem>

      <FormSelect
        name="productNature"
        options={productNature}
        label={t['loanProductNatureLoanProduct']}
      />
      <GridItem colSpan={3}>
        <FormInput name="description" label={t['loanProductDescription']} />
      </GridItem>
    </FormSection>
  );
};

export default GeneralSetup;
