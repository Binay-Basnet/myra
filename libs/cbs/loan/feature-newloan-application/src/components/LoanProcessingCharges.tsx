import { Box, Input, Text } from '@coop/shared/ui';

export const LoanProcessingCharge = () => (
  <Box display="flex" flexDirection="column" gap="s16">
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="r1" fontWeight="600">
        Loan Processing Charges
      </Text>
      <Text fontSize="s2" fontWeight="400">
        Details of collateral valuation and disbursement amount
      </Text>
    </Box>
    <Box
      display="flex"
      flexDirection="column"
      gap="s8"
      p="s16"
      bg="border.layout"
      borderRadius="br2"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="s3" fontWeight="500">
          Form Charge
        </Text>
        <Box w="160px">
          {' '}
          <Input size="sm" />{' '}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="s3" fontWeight="500">
          Form Processing Charge
        </Text>
        <Box w="160px">
          {' '}
          <Input size="sm" />{' '}
        </Box>
      </Box>
    </Box>
  </Box>
);
