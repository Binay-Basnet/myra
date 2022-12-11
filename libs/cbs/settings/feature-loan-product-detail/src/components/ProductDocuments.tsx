import { Box, DetailsCard, Text } from '@myra-ui';

import { LoanRequiredDocuments } from '@coop/cbs/data-access';

type DocType = {
  requiredDocuments: (LoanRequiredDocuments | null)[] | null | undefined;
};

export const ProductDocuments = ({ requiredDocuments }: DocType) => {
  if (!requiredDocuments) return null;

  return (
    <DetailsCard title="Required Documents">
      <Box px="s16" fontSize="r1" textTransform="capitalize">
        <ul>
          {requiredDocuments &&
            requiredDocuments?.map((item) => (
              <li>
                <Text fontSize="r1" fontWeight="Regular" color="gray.700">
                  {item?.toLowerCase()?.replace('_', ' ')?.replace('_', ' ') ?? 'N/A'}
                </Text>
              </li>
            ))}
        </ul>
      </Box>
    </DetailsCard>
  );
};
