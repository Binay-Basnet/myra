import { DetailsCard, Text } from '@myra-ui';

import { useInventoryAdjustmentHook } from '../hooks/useInventoryAdjustmentHook';

export const InventoryAdjustmentNotes = () => {
  const { detailData } = useInventoryAdjustmentHook();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text>{detailData?.modeOfAdjustment}</Text>
    </DetailsCard>
  );
};
