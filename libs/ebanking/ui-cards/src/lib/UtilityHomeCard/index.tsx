import { IconType } from 'react-icons';

import { Box, Icon, TextFields } from '@coop/shared/ui';

interface UtilityHomeCardProps {
  icon: IconType | undefined;
  label: string;
}

export const UtilityHomeCard = ({ icon, label }: UtilityHomeCardProps) => (
  <Box display="flex" flexDir="column" alignItems="center" gap="s8" py="s8" cursor="pointer">
    <Icon as={icon} size="lg" color="primary.500" />

    <TextFields variant="navItems" color="gray.800">
      {label}
    </TextFields>
  </Box>
);
