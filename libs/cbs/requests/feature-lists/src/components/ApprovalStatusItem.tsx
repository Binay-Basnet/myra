import { Box, Text } from '@myra-ui';

import {
  AlternativeChannelStatus,
  AttendanceStatus,
  MemberTransferState,
  PayrollStatus,
  RequestStatus,
  StatusOfTask,
} from '@coop/cbs/data-access';

export const ApprovalStatusItem = ({
  status,
}: {
  status?:
    | RequestStatus
    | MemberTransferState
    | PayrollStatus
    | StatusOfTask
    | AlternativeChannelStatus
    | AttendanceStatus;
}) => (
  /* eslint-disable no-nested-ternary */
  <Box display="flex" alignItems="center" gap="s8">
    <Box
      w="s10"
      h="s10"
      rounded="100%"
      bg={
        status === RequestStatus.Approved ||
        status === PayrollStatus.Paid ||
        status === StatusOfTask?.Completed ||
        status === AttendanceStatus?.Present
          ? 'green.300'
          : status === RequestStatus.Declined ||
            status === MemberTransferState?.Rejected ||
            status === StatusOfTask?.Assigned ||
            status === AttendanceStatus?.Absent
          ? 'red.500'
          : status === StatusOfTask?.Started
          ? 'blue.500'
          : 'yellow.500'
      }
    />
    <Text fontSize="s2" color="gray.800" textTransform="capitalize">
      {status?.toLowerCase()}
    </Text>
  </Box>
);
