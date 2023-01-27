import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, GridItem } from '@myra-ui';

import {
  NatureOfLoanProduct,
  useGetLoanProductSettingsQuery,
  useGetLoanProductSubTypeQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const GeneralSetup = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { watch } = useFormContext();
  const productType = watch('productType');
  const [triggerProductSubType, settTiggerProductSubType] = useState(false);

  const { data: productDataList } = useGetLoanProductSettingsQuery();

  const { data: productSubTypeList } = useGetLoanProductSubTypeQuery(
    {
      productTypeId: productType,
    },
    {
      enabled: triggerProductSubType,
    }
  );

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

  useEffect(() => {
    settTiggerProductSubType(true);
  }, [productType]);

  return (
    <FormSection header="loanProductGeneralSetup">
      <GridItem colSpan={2}>
        <FormInput isRequired name="productName" label={t['loanProductProductName']} />
      </GridItem>

      <FormSelect
        isRequired
        name="productType"
        options={productTypes}
        label={t['loanProductProductType']}
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <GridItem colSpan={2}>
        <FormSelect
          isRequired
          name="productSubType"
          options={productSubTypes}
          label={t['loanProductProductSubtype']}
          isDisabled={router?.asPath?.includes('/edit')}
        />
      </GridItem>

      <FormSelect
        isRequired
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
