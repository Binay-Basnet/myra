import { FormSection, GridItem } from '@myra-ui';

import {
  useGetAllAccountingTaxesQuery,
  useGetItemCategoryListQuery,
  useGetUnitsListQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

export const BasicDetailsInventory = () => {
  const { data: itemGropus } = useGetItemCategoryListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const itemOptions = itemGropus?.inventory?.itemsGroup?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));
  const { data: taxData } = useGetAllAccountingTaxesQuery();

  const taxDataOptions = taxData?.settings?.general?.accounting?.taxRates?.map((data) => ({
    label: `${data?.name} - ${data?.rate}`,
    value: data?.id as string,
  }));

  const { data: unitTable } = useGetUnitsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const itemUnits = unitTable?.inventory?.unitOfMeasure?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  return (
    <FormSection header="Item Details">
      <GridItem colSpan={2}>
        <FormInput name="itemName" label="Item Name" />
      </GridItem>
      <FormInput name="itemCode" label="Item Code" />
      <FormSelect name="itemGroup" options={itemOptions} label="Item Groups" />
      <FormSelect name="primaryUnit" label="Primary Unit" options={itemUnits} />
      <FormSelect name="tax" label="Tax" options={taxDataOptions} />
      <FormInput name="sellingPrice" label="Selling Price" />
      <FormInput name="costPrice" label="Cost Price" />
    </FormSection>
  );
};
