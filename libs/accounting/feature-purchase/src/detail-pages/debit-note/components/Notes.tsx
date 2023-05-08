import { DetailsCard, Text } from '@myra-ui';

import { usePurchaseDebitNoteHook } from '../hooks/useDebitNoteDetails';

export const DebitNoteNotes = () => {
  const { detailData } = usePurchaseDebitNoteHook();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text>{detailData?.notes}</Text>
    </DetailsCard>
  );
};
