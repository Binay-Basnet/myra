import { useRouter } from 'next/router';

import { Avatar, Box, Text } from '@myra-ui/foundations';
import { ROUTES } from '@coop/cbs/utils';

export interface DetailPageMemberCardProps {
  id?: string;
  memberCode?: string;
  name: string;
  profilePicUrl: string;
  memberAge?: number | null;
  memberGender?: string | null;
}

export const DetailPageMemberCard = ({
  id,
  memberCode,
  name,
  profilePicUrl,
  memberGender,
  memberAge,
}: DetailPageMemberCardProps) => {
  const router = useRouter();
  return (
    <Box
      h="94px"
      w="100%"
      px="s16"
      display="flex"
      alignItems="center"
      gap="s8"
      _hover={{ cursor: 'pointer' }}
      onClick={() => router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`)}
    >
      <Avatar src={profilePicUrl as string} size="md" name={name} />
      <Box display="flex" flexDir="column">
        <Text fontSize="r1" fontWeight="500" color="primary.500" textTransform="capitalize">
          {name}
        </Text>
        {memberCode && (
          <Text fontSize="r1" fontWeight="400" color="gray.800" wordBreak="break-all">
            {memberCode}
          </Text>
        )}

        {(memberGender || memberAge) && (
          <Text fontSize="r1" fontWeight="400" color="gray.800">
            {memberGender} | {memberAge}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default DetailPageMemberCard;
