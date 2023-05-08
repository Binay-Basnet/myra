import { DetailsCard } from '@myra-ui';

import { PurchaseEntryTable } from './PurchaseEntriesTable';
import { usePurchaseDetailsHook } from '../hooks/usePurchaseEntry';

export const PurchaseEntries = () => {
  const { detailData } = usePurchaseDetailsHook();
  const purchaseData =
    detailData?.productDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      itemName: data?.itemName,

      quantity: data?.quantity,
      rate: data?.rate,
      tax: data?.tax,
      amount: data?.amount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Purchase Entries">
      <PurchaseEntryTable data={purchaseData} />{' '}
    </DetailsCard>
  );
};
