import { RequestStatus } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

export const ApprovalStatusItem = ({ status }: { status?: RequestStatus }) => (
  <Box display="flex" alignItems="center" gap="s8">
    <Box
      w="s10"
      h="s10"
      rounded="100%"
      bg={
        status === RequestStatus.Approved
          ? 'green.500'
          : status === RequestStatus.Declined
          ? 'red.500'
          : 'yellow.500'
      }
    />
    <Text fontSize="s2" color="gray.800" textTransform="capitalize">
      {status?.toLowerCase()}
    </Text>
  </Box>
);
