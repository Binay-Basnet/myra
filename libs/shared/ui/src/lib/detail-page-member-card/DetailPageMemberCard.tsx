import Avatar from '../avatar/Avatar';
import Box from '../box/Box';
import Text from '../text/Text';

export interface DetailPageMemberCardProps {
  id: string;
  name: string;
  profilePicUrl: string;
}

export const DetailPageMemberCard = ({ id, name, profilePicUrl }: DetailPageMemberCardProps) => (
  <Box h="94px" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
    <Avatar src={profilePicUrl as string} size="lg" name={name} />
    <Box display="flex" flexDir="column">
      <Text fontSize="r1" fontWeight="500" color="primary.500">
        {name}
      </Text>
      <Text fontSize="r1" fontWeight="400" color="gray.800">
        {id}
      </Text>
      {/* TODO! Display age and gender here */}
      <Text fontSize="r1" fontWeight="400" color="gray.800">
        Male | 43
      </Text>
    </Box>
  </Box>
);

export default DetailPageMemberCard;
