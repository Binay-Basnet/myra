import { IconType } from 'react-icons';
import { useRouter } from 'next/router';

import { Box, Icon, Text } from '@myra-ui';

interface UtilityDetailPageCardProps {
  icon: IconType | undefined;
  label: string;
  link: string;
}

export const UtilityDetailPageCard = ({ icon, label, link }: UtilityDetailPageCardProps) => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="s8"
      px="s6"
      height="44px"
      cursor={link ? 'pointer' : 'auto'}
      bg="white"
      borderRadius="br2"
      boxShadow="E0"
      onClick={() => router.push(link)}
    >
      <Icon as={icon} size="lg" color="primary.500" />

      <Text variant="navItems" color="gray.800">
        {label}
      </Text>
    </Box>
  );
};
