import { DetailsCard } from '@myra-ui';

import { VariantsTable } from './VariantItemsTable';
import { useItemDetailsHook } from '../hooks/useItemsDetails';

export const VariantEntries = () => {
  const { detailData } = useItemDetailsHook();
  const variantData =
    detailData?.variants?.map((data, index) => ({
      sn: Number(index) + 1,
      itemName: data?.itemName,

      sku: data?.sku,

      sellingPrice: data?.sellingPrice,
      costPrice: data?.costPrice,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Variants">
      <VariantsTable data={variantData} />{' '}
    </DetailsCard>
  );
};
