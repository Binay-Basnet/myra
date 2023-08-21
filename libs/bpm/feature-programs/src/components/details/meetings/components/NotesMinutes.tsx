import { DetailsCard, Text } from '@myra-ui';

import { useMeetingDetailsHook } from '../hooks/useMeetingDetails';

export const MinutesNotes = () => {
  const { detailData } = useMeetingDetailsHook();

  return (
    <DetailsCard title="Agenda" bg="white" hasTable>
      <Text>{detailData?.minute?.notes}</Text>
    </DetailsCard>
  );
};
