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
        return { text: typeVariant };

      case 'CR':
        return { text: typeVariant };

      default:
        return { text: '-' };
    }
  };

  return (
    <Box display="flex" alignItems="center" gap="s8" justifyContent="flex-end">
      <Text fontSize="s3" color="gray.700" fontWeight="SemiBold" textTransform="capitalize">
        {amountConverter(amount)}
      </Text>
      <Text fontSize="s3" fontWeight="Regular">
        {getTypeProps(type)?.text}
      </Text>
    </Box>
  );
};
