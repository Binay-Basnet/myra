import { Box, Text } from '@coop/shared/ui';

enum ApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Declined = 'Declined',
}

export const ApprovalStatusItem = ({ status }: { status: ApprovalStatus }) => (
  <Box display="flex" alignItems="center" gap="s8">
    <Box
      w="s10"
      h="s10"
      rounded="100%"
      bg={
        status === ApprovalStatus.Approved
          ? 'green.500'
          : status === ApprovalStatus.Declined
          ? 'red.500'
          : 'yellow.500'
      }
    />
    <Text fontSize="s2" color="gray.800">
      {status}
    </Text>
  </Box>
);
