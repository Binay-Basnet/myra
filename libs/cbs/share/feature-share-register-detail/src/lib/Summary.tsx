import { useRouter } from 'next/router';

import { Avatar, Box, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { useShareRegisterDetailHooks } from '../hooks/useShareRegisterDetailHooks';

export const Summary = () => {
  const router = useRouter();
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
        _hover={{
          cursor: 'pointer',
        }}
        onClick={() => router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${shareDetails?.member?.id}`)}
      >
        <Avatar src={shareDetails?.member?.profilePicUrl as string} size="sm" />
        <Box display="flex" flexDir="column">
          <Text color="primary.500" fontWeight="Medium" fontSize="r1" lineHeight="150%">
            {shareDetails?.member?.name?.local}
          </Text>
          <Text fontSize="s3" fontWeight="Regular" color="gray.800">
            {shareDetails?.member?.code}
          </Text>
        </Box>
      </Box>
    </>
  );
};
