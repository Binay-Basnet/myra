import { DetailsCard, Text } from '@myra-ui';

import { usePurchaseDetailsHook } from '../hooks/usePurchaseEntry';

export const PurchaseDetailsNotes = () => {
  const { detailData } = usePurchaseDetailsHook();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text>{detailData?.notes}</Text>
    </DetailsCard>
  );
};
