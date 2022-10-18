import Image from 'next/image';

import { Box, Text } from '@coop/shared/ui';

interface IEmptyStateProps {
  title: string;
  subtitle?: string;
}

export const EmptyState = ({ title, subtitle }: IEmptyStateProps) => (
  <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap="s16">
    <Box position="relative" h="100px" w="100%">
      <Image src="/empty.svg" layout="fill" objectFit="contain" objectPosition="center" />
    </Box>
    <Box display="flex" flexDir="column" gap="s16">
      <Text fontSize="r2" fontWeight="500" color="gray.600" textAlign="center">
        {title}
      </Text>
      {subtitle}
    </Box>
  </Box>
);
