import { HiOutlineDownload } from 'react-icons/hi';

import { Box, Divider, Icon, Text } from '@myra-ui';

import RunningProcess from '../components/RunningProcess';

export const DownloadCenterLib = () => (
  // const router = useRouter();
  <Box p="s24" mt="s16" mx="20vw" bg="white" borderRadius={8}>
    <Box display="flex" alignItems="center" gap="s16">
      <Icon as={HiOutlineDownload} size="xl" />
      <Box>
        <Text fontSize="r2" fontWeight="medium">
          Download Center
        </Text>
        <Text fontSize="s2">Create, Manage & View History of Downloads in one place.</Text>
      </Box>
    </Box>
    <Divider my="s16" />
    <RunningProcess />
    <Divider my="s16" />
    {/* <PreviousExports /> */}
  </Box>
);

export default DownloadCenterLib;
