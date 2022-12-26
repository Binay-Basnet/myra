import { Box, Text } from '@myra-ui/foundations';

interface IApprovalStatusCellProps {
  status: string;
  variant: 'success' | 'failure' | 'pending';
}

export const ApprovalStatusCell = ({ status, variant }: IApprovalStatusCellProps) => {
  const getStatusColor = (statusVariant: string) => {
    switch (statusVariant) {
      case 'success':
        return 'green.500';

      case 'failure':
        return 'red.500';

      case 'pending':
        return 'yellow.500';

      default:
        return 'yellow.500';
    }
  };

  return (
    <Box display="flex" alignItems="center" gap="s8">
      <Box w="s10" h="s10" rounded="100%" bg={getStatusColor(variant)} />
      <Text fontSize="s2" color="gray.800" textTransform="capitalize">
        {status?.toLowerCase()}
      </Text>
    </Box>
  );
};
