import { FormSection } from '@myra-ui';

import { useGetItemCategoryListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

export const InventoryItemsLedger = () => {
  const { data: itemGropus } = useGetItemCategoryListQuery({
    pagination: {
      first: -1,
    },
  });
  const itemOptions = itemGropus?.inventory?.itemsGroup?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  return (
    <FormSection header="Ledger Details">
      <FormSelect name="ledger.salesLedger" label="Sales Ledger" />
      <FormSelect
        name="ledger.salesReturnLedger"
        options={itemOptions}
        label="Sales Return Ledger"
      />
      <FormSelect name="ledger.purchaseLedger" label="Purchase Ledger" />
      <FormSelect name="ledger.purchaseReturnLedger" label="Purchase Return Ledger" />
    </FormSection>
  );
};
