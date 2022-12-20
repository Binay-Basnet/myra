import { Avatar, Box, Text } from '@myra-ui';

import { useShareRegisterDetailHooks } from '../hooks/useShareRegisterDetailHooks';

export const Summary = () => {
  const { shareDetails } = useShareRegisterDetailHooks();
  return (
    <>
      <Box
        w="100%"
        p="s16"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        borderBottom="1px"
        borderBottomColor="border.layout"
        gap="s8"
      >
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="r1" fontWeight="Medium" color="gray.700" lineHeight="17px">
            {shareDetails?.type}
          </Text>
          <Text fontSize="s3" fontWeight="Medium" color="gray.700" lineHeight="16px">
            {shareDetails?.totalShareAmount}
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text fontSize="s3" fontWeight="Regular" color="gray.700" lineHeight="16px">
            {shareDetails?.date?.local}
          </Text>
          <Text fontSize="s3" fontWeight="Regular" color="gray.700" lineHeight="16px">
            {shareDetails?.totalShareCount} shares
          </Text>
        </Box>
      </Box>

      <Box
        w="100%"
        py="s12"
        px="s16"
        display="flex"
        gap="s8"
        alignItems="center"
        borderBottom="1px"
        borderBottomColor="border.layout"
      >
        <Avatar src={shareDetails?.member?.profilePicUrl as string} h="s32" w="s32" />
        <Text color="primary.500" fontWeight="Medium" fontSize="r1" lineHeight="150%">
          {shareDetails?.member?.name?.local}
        </Text>
      </Box>
    </>
  );
};
