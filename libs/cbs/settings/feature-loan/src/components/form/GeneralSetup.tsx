import { NatureOfLoanProduct, useGetLoanProductSettingsQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const GeneralSetup = () => {
  const { t } = useTranslation();

  const { data: productDataList } = useGetLoanProductSettingsQuery();

  const productTypesList = productDataList?.settings?.general?.loan?.productType?.productTypes;

  const productTypes = productTypesList?.map((item) => ({
    label: item?.productType as string,
    value: item?.id as string,
  }));

  const productSubTypesList =
    productDataList?.settings?.general?.loan?.productType?.productSubTypes;

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
