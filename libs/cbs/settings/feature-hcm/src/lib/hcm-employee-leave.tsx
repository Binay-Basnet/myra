import { Box, Divider, Text } from '@myra-ui';

import LeavePolicyTable from '../components/leave/LeavePolicyTable';
import { LeaveTypeTable } from '../components/leave/LeaveTypeTable';

export const HcmEmployeeLeave = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Leave</Text>
    <Text fontSize="r1">All settings for leave Management</Text>
    <Divider />
    <Box display="flex">
      <Box display="flex" flexDir="column" flex={1} gap="s16">
        <LeaveTypeTable />
        <LeavePolicyTable />
      </Box>
    </Box>
  </Box>
);

export default HcmEmployeeLeave;
