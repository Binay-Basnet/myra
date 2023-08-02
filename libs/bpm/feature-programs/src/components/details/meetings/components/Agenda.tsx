import { DetailsCard, Text } from '@myra-ui';

import { useMeetingDetailsHook } from '../hooks/useMeetingDetails';

export const AgendaMeetings = () => {
  const { detailData } = useMeetingDetailsHook();

  return (
    <DetailsCard title="Agenda" bg="white" hasTable>
      <Text>{detailData?.overview?.agenda}</Text>
    </DetailsCard>
  );
};
