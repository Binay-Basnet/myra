import { DetailsCard, Text } from '@myra-ui';

import { useWarehouseTransferDetailsHook } from '../hooks/useWarehouseTransferHook';

export const NotesWarehouseTransfer = () => {
  const { detailData } = useWarehouseTransferDetailsHook();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text fontSize="s3" fontWeight="500">
        {detailData?.description}
      </Text>
    </DetailsCard>
  );
};
