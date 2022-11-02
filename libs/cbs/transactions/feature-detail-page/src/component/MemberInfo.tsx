import { Avatar, Box, Text } from '@coop/shared/ui';

type MemberInfoProps = {
  name: string | undefined | null;
  id: string | undefined | null;
  profilePic: string;
};

export const MemberInfo = ({ name, id, profilePic }: MemberInfoProps) => (
  <Box borderBottom="1px" borderBottomColor="border.layout">
    <Box h="60px" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
      <Avatar src={profilePic} size="sm" name="test" />
      <Box display="flex" flexDir="column">
        <Text fontSize="r1" fontWeight="Medium" color="primary.500">
          {name}
        </Text>
        <Text fontSize="s3" fontWeight="Regular" color="gray.800">
          {id}
        </Text>
      </Box>
    </Box>
  </Box>
);
