import { MdOutlineStar } from 'react-icons/md';

import { Box, Icon, Text } from '@coop/shared/ui';

interface IAnnouncementAccountCardProps {
  name: string;
  balance: string;
  isDefault?: boolean;
}

export const AnnouncementAccountCard = ({
  name,
  balance,
  isDefault,
}: IAnnouncementAccountCardProps) => {
  return (
    <Box
      bg="white"
      px="s16"
      py="s12"
      display="flex"
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <Box display="flex" flexDir="column" gap="s4">
        <Text fontSize="s3" fontWeight="500" color="gray.700">
          {name}
        </Text>
        <Text fontSize="s2" fontWeight="700" color="gray.700">
          {balance}
        </Text>
      </Box>
      {isDefault && <Icon as={MdOutlineStar} size="lg" color="primary.500" />}
    </Box>
  );
};
