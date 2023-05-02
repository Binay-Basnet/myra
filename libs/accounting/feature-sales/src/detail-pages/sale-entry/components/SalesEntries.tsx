import { DetailsCard } from '@myra-ui';

import { SalesEntryTable } from './SalesEntriesTable';
import { useSalesDetailsHooks } from '../hooks/useSalesEntry';

export const SalesEntries = () => {
  const { detailData } = useSalesDetailsHooks();
  const salesData =
    detailData?.products?.map((data, index) => ({
      sn: Number(index) + 1,
      itemName: data?.itemName,

      quantity: data?.quantity,
      rate: data?.rate,
      amount: data?.amount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Sales Entries">
      <SalesEntryTable data={salesData} />{' '}
    </DetailsCard>
  );
};
