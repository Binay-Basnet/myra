import { DetailsCard, Text } from '@myra-ui';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const STRTopology = () => {
  const { strTopology } = useSTRDetails();

  return (
    <DetailsCard title="Suspicious Activity Information/Typology" hasTable>
      <Text fontSize="s3" fontWeight={500} color="gray.700">
        {strTopology}
      </Text>
    </DetailsCard>
  );
};
