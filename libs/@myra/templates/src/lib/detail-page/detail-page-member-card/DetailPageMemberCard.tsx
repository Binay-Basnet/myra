import { Avatar, Box, Text } from '@myra-ui/foundations';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

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
}: DetailPageMemberCardProps) => (
  <Box h="94px" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
    <Avatar src={profilePicUrl as string} size="md" name={name} />
    <Box display="flex" flexDir="column">
      <RedirectButton label={name} link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}`} />

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

export default DetailPageMemberCard;
