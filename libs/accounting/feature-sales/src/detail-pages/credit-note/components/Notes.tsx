import { DetailsCard, Text } from '@myra-ui';

import { useCreditNoteDetailsHook } from '../hooks/useCreditNote';

export const CreditNotesNote = () => {
  const { detailData } = useCreditNoteDetailsHook();

  return (
    <DetailsCard title="Notes" bg="white" hasTable>
      <Text>{detailData?.notes}</Text>
    </DetailsCard>
  );
};
