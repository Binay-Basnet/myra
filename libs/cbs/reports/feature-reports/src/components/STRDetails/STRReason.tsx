import { DetailsCard, Text } from '@myra-ui';

import { useSTRDetails } from '../../hooks/useSTRDetails';

export const STRReason = () => {
  const { strReason } = useSTRDetails();

  return (
    <DetailsCard title="Reason for Suspicion" hasTable>
      <Text fontSize="s3" fontWeight={500} color="gray.700">
        {strReason}
      </Text>
    </DetailsCard>
  );
};
