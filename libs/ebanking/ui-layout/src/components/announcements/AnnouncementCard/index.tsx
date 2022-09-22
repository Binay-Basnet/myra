import { Box, Text } from '@coop/shared/ui';

interface IAnnouncementCardProps {
  title: string | undefined;
  subtitle: string | undefined;
}

export const AnnouncementCard = ({ title, subtitle }: IAnnouncementCardProps) => (
  <Box
    bg="white"
    p="s16"
    display="flex"
    flexDir="column"
    gap="s4"
    borderBottom="1px"
    borderBottomColor="border.layout"
  >
    <Text fontSize="s3" fontWeight="500" color="gray.700">
      {title}
    </Text>
    <Text fontSize="s2" fontWeight="400" color="gray.500">
      {subtitle}
    </Text>
  </Box>
);
