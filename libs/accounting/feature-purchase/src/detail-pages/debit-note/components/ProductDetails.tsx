import { DetailsCard } from '@myra-ui';

import { ProductDetailsTable } from './ProductDetailsTable';
import { usePurchaseDebitNoteHook } from '../hooks/useDebitNoteDetails';

export const ProductDetailsDebitNote = () => {
  const { detailData } = usePurchaseDebitNoteHook();
  const purchaseData =
    detailData?.products?.map((data, index) => ({
      sn: Number(index) + 1,
      itemName: data?.itemName,

      quantity: data?.quantity,
      rate: data?.rate,
      tax: data?.tax,
      amount: data?.amount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Product Details">
      <ProductDetailsTable data={purchaseData} />{' '}
    </DetailsCard>
  );
};
