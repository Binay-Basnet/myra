import { Box, Text } from '@myra-ui/foundations';

import { amountConverter } from '@coop/shared/utils';

interface IBalanceAmountCellProps {
  amount: number | string;
  type: string | undefined;
}

export const BalanceAmountCell = ({ amount, type }: IBalanceAmountCellProps) => {
  const getTypeProps = (typeVariant: string | undefined) => {
    switch (typeVariant) {
      case 'debit':
        return { color: 'accent.600', text: 'DR' };

      case 'credit':
        return { color: 'accent.100', text: 'CR' };

      default:
        return { color: '', text: '' };
    }
  };

  return (
    <Box display="flex" alignItems="center" gap="s8" justifyContent="flex-end">
      <Text fontSize="s3" color="gray.700" fontWeight={600} textTransform="capitalize">
        {amountConverter(amount)}
      </Text>
      <Text fontSize="s3" fontWeight={400} color={getTypeProps(type)?.color}>
        {getTypeProps(type)?.text}
      </Text>
    </Box>
  );
};
