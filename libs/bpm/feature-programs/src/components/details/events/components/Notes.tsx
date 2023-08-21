import { DetailsCard, Text } from '@myra-ui';

import { useEventsDetailsHook } from '../hooks/useEventsDetails';

export const NotesEvents = () => {
  const { detailData } = useEventsDetailsHook();

  return (
    <DetailsCard title="Note" bg="white" hasTable>
      <Text>{detailData?.overview?.note}</Text>
    </DetailsCard>
  );
};
