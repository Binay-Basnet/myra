import { Box, Text } from '@myra-ui/foundations';

import { BalanceType } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface IBalanceAmountCellProps {
  amount: number | string;
  type: BalanceType | string | undefined;
}

export const BalanceAmountCell = ({ amount, type }: IBalanceAmountCellProps) => {
  const getTypeProps = (typeVariant: string | undefined) => {
    switch (typeVariant) {
      case 'DR':
        return { color: 'accent.600', text: typeVariant };

      case 'CR':
        return { color: 'accent.100', text: typeVariant };

      default:
        return { color: '', text: '-' };
    }
  };

  return (
    <Box display="flex" alignItems="center" gap="s8" justifyContent="flex-end">
      <Text fontSize="s3" color="gray.700" fontWeight="SemiBold" textTransform="capitalize">
        {amountConverter(amount)}
      </Text>
      <Text fontSize="s3" fontWeight="Regular" color={getTypeProps(type)?.color}>
        {getTypeProps(type)?.text}
      </Text>
    </Box>
  );
};
