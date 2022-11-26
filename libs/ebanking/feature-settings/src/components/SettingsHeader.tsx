import { BsDownload } from 'react-icons/bs';
import { useRouter } from 'next/router';

import { useAppSelector } from '@coop/ebanking/data-access';
import { Avatar, Box, Button, Icon, Text, TextFields } from '@myra-ui';

export const SettingsHeader = () => {
  const router = useRouter();
  const coopUser = useAppSelector((state) => state.auth.cooperative.user);

  return (
    <Box display="flex" p="s16" bg="primary.500" color="white" gap="s24" borderRadius="br2">
      <Box
        flexShrink={0}
        w="96px"
        border="2px"
        overflow="hidden"
        borderColor="gray.0"
        borderRadius="4px"
      >
        <Avatar
          w="96px"
          borderRadius="4px"
          h="96px"
          src={coopUser?.memberProfilePicUrl as string}
          name={coopUser?.memberName as string}
        />
      </Box>
      <Box
        display="flex"
        w="100%"
        flexDir="column"
        textTransform="capitalize"
        justifyContent="space-between"
      >
        <Box display="flex" w="100%" justifyContent="space-between" alignItems="center">
          <TextFields variant="stickyCardHeader">{coopUser?.memberName}</TextFields>
          {router.pathname.includes('/profile') ? (
            <Button
              rightIcon={<Icon as={BsDownload} size="sm" />}
              onClick={() => router.push('/settings/profile')}
              bg="primary.800"
            >
              Download{' '}
            </Button>
          ) : (
            <Button onClick={() => router.push('/settings/profile')} bg="primary.800">
              View Full Profile
            </Button>
          )}
        </Box>
        <Box
          color="primary.100"
          fontSize="s3"
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDir="column">
            <Text fontWeight="500">Member Since</Text>
            <Text fontWeight="600">2022</Text>
          </Box>
          <Box display="flex" flexDir="column">
            <Text fontWeight="500">Member Id</Text>
            <Text fontWeight="600">{coopUser?.memberId}</Text>
          </Box>
          <Box display="flex" flexDir="column">
            <Text fontWeight="500">Primary Contact</Text>
            <Text fontWeight="600">{coopUser?.memberMobileNo}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
