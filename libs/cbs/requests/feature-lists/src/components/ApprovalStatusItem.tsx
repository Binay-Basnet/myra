import { Box, Text } from '@myra-ui';

import { MemberTransferState, RequestStatus } from '@coop/cbs/data-access';

export const ApprovalStatusItem = ({
  status,
}: {
  status?: RequestStatus | MemberTransferState;
}) => (
  /* eslint-disable no-nested-ternary */
  <Box display="flex" alignItems="center" gap="s8">
    <Box
      w="s10"
      h="s10"
      rounded="100%"
      bg={
        status === RequestStatus.Approved || status === MemberTransferState?.Approved
          ? 'green.300'
          : status === RequestStatus.Declined || status === MemberTransferState?.Rejected
          ? 'red.500'
          : 'yellow.500'
      }
    />
    <Text fontSize="s2" color="gray.800" textTransform="capitalize">
      {status?.toLowerCase()}
    </Text>
  </Box>
);
