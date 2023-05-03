import { DetailsCard } from '@myra-ui';

import { CreditNoteProductDetailsTable } from './CreditNoteProductTable';
import { useCreditNoteDetailsHook } from '../hooks/useCreditNote';

export const CreditNoteProductDetails = () => {
  const { detailData } = useCreditNoteDetailsHook();
  const salesData =
    detailData?.products?.map((data, index) => ({
      sn: Number(index) + 1,
      itemName: data?.itemName,

      quantity: data?.quantity,
      tax: data?.tax,
      rate: data?.rate,
      amount: data?.amount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Sales Entries">
      <CreditNoteProductDetailsTable data={salesData} />{' '}
    </DetailsCard>
  );
};
