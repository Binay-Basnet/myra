import { Box, Text } from '@myra-ui';

interface IBalanceCardProps {
  label: string;
  balance: string;
}

export const BalanceCard = ({ label, balance }: IBalanceCardProps) => (
  <Box display="flex" flexDirection="column" gap="s4">
    <Text fontSize="s3" fontWeight={500} color="gray.600">
      {label}
    </Text>
    <Text fontSize="r2" fontWeight={600} color="primary">
      {balance}
    </Text>
  </Box>
);
