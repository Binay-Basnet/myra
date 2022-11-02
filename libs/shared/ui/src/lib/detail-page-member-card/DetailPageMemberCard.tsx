import Avatar from '../avatar/Avatar';
import Box from '../box/Box';
import Text from '../text/Text';

export interface DetailPageMemberCardProps {
  id: string;
  name: string;
  profilePicUrl: string;
  memberAge?: number | null;
  memberGender?: string | null;
}

export const DetailPageMemberCard = ({
  id,
  name,
  profilePicUrl,
  memberGender,
  memberAge,
}: DetailPageMemberCardProps) => (
  <Box h="94px" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
    <Avatar src={profilePicUrl as string} size="lg" name={name} />
    <Box display="flex" flexDir="column">
      <Text fontSize="r1" fontWeight="500" color="primary.500" textTransform="capitalize">
        {name}
      </Text>
      <Text fontSize="r1" fontWeight="400" color="gray.800" wordBreak="break-all">
        {id}
      </Text>

      {(memberGender || memberAge) && (
        <Text fontSize="r1" fontWeight="400" color="gray.800">
          {memberGender} | {memberAge}
        </Text>
      )}
    </Box>
  </Box>
);

export default DetailPageMemberCard;
