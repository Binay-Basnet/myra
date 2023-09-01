import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

import { Box, Icon, Text } from '@myra-ui';

interface UtilityHomeCardProps {
  icon: IconType | undefined;
  label: string;
  link: string;
}

export const UtilityHomeCard = ({ icon, label, link }: UtilityHomeCardProps) => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="s8"
      py="s8"
      cursor="pointer"
      onClick={() => router.push(link || '')}
    >
      <Icon as={icon} size="lg" color="primary.500" />

      <Text variant="navItems" color="gray.800">
        {label}
      </Text>
    </Box>
  );
};
