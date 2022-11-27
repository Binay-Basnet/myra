import { DetailsCard, Text } from '@myra-ui';

export const ProductDescription = ({ description }: { description: string | undefined | null }) => (
  <DetailsCard hasTable title="Description">
    <Text fontSize="r1" color="gray.900">
      {description}
    </Text>
  </DetailsCard>
);
