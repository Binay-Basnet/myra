import { useRouter } from 'next/router';

import { Box, Button, Text } from '@myra-ui/foundations';

const NoMemberCodePage = () => {
  const router = useRouter();
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      overflow="hidden"
      gap="s16"
    >
      <Text fontSize="r3" fontWeight="medium">
        Member code not setup, Please set up member code first
      </Text>
      <Button onClick={() => router.push('/settings/general/members/configure')}>
        Set up member code
      </Button>
    </Box>
  );
};

export default NoMemberCodePage;
