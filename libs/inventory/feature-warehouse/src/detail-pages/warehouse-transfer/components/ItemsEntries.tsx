import { DetailsCard } from '@myra-ui';

import { ItemsTable } from './ItemsTable';
import { useWarehouseTransferDetailsHook } from '../hooks/useWarehouseTransferHook';

export const ItemsEntries = () => {
  const { detailData } = useWarehouseTransferDetailsHook();
  const variantData =
    detailData?.itemDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      itemName: data?.itemName,

      quantity: data?.quantity,
      rate: data?.rate,
      amount: data?.amount,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Variants">
      <ItemsTable data={variantData} />{' '}
    </DetailsCard>
  );
};
