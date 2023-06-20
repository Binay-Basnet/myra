import { Box, Divider, Text } from '@myra-ui';

import LeavePolicyTable from '../components/leave/LeavePolicyTable';
import { LeaveTypeTable } from '../components/leave/LeaveTypeTable';

export const HcmEmployeeLeave = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Leave</Text>
    <Text fontSize="r1">All settings for leave Management</Text>
    <Divider />
    <Box display="flex">
      <Box display="flex" flexDir="column" flex={1} gap="s16" mr={200}>
        <LeaveTypeTable />
        <LeavePolicyTable />
      </Box>
      <Box position="fixed" right={0}>
        <Box display="flex" flexDir="column" minW="200" px="s16" gap="s16">
          <Text fontSize="r2" fontWeight="medium">
            On the Leave Settings
          </Text>
          <a href="#leave-type">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Leave Type
            </Text>
          </a>
          <a href="#leave-policy">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Leave Policy
            </Text>
          </a>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default HcmEmployeeLeave;
