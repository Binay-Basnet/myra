import { Box, Text } from '@coop/shared/ui';

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
      p="s16"
      display="flex"
      flexDir="column"
      gap="s4"
      borderBottom="1px"
      borderBottomColor="border.layout"
    >
      <Text noOfLines={1} fontSize="s3" fontWeight="500" color="gray.700">
        {name}
      </Text>
      <Text fontSize="s2" fontWeight="700" color="gray.500">
        {balance}
      </Text>
    </Box>
  );
};
