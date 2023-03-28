import { FormSection, GridItem } from '@myra-ui';

import { InvItemsValuationMethod } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

export const BasicDetailsInventory = () => {
  // const { data: itemGropus } = useGetItemCategoryListQuery({
  //   pagination: {
  //     first: -1,
  //   },
  // });
  // const itemOptions = itemGropus?.inventory?.itemsGroup?.list?.edges?.map((data) => ({
  //   label: data?.node?.name as string,
  //   value: data?.node?.id as string,
  // }));
  const itemHappy = [
    {
      label: 'First In First Out',
      value: InvItemsValuationMethod?.Fifo,
    },
  ];
  return (
    <FormSection header="Item Details">
      <GridItem colSpan={2}>
        <FormInput name="itemName" label="Item Name" />
      </GridItem>
      <FormInput name="itemCode" label="Item Code" />
      <FormSelect name="itemGroup" options={itemHappy} label="Item Groups" />
      <FormSelect name="primaryUnit" label="Primary Unit" options={itemHappy} />
      <FormSelect name="tax" label="Tax" options={itemHappy} />
      <FormInput name="sellingPrice" label="Selling Price" />
      <FormInput name="costPrice" label="Cost Price" />
    </FormSection>
  );
};
