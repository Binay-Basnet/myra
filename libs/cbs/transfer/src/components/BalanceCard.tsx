import { Box, Text } from '@myra-ui';

import { BalanceValue } from '@coop/cbs/data-access';
import { amountToWordsConverter, debitCreditConverter } from '@coop/shared/utils';

interface IBalanceCardProps {
  label: string;
  balance: BalanceValue | null | undefined;
}

export const BalanceCard = ({ label, balance }: IBalanceCardProps) => (
  <Box display="flex" flexDirection="column" gap="s4" width="100%">
    <Text fontSize="s3" fontWeight={500} color="gray.600">
      {label}
    </Text>
    <Text fontSize="r2" fontWeight={600} color="primary">
      {debitCreditConverter(balance?.amount || 0, balance?.amountType as string)}
    </Text>
    <Text fontSize="r2" fontWeight={600} color="primary">
      {amountToWordsConverter(balance?.amount || 0)}
    </Text>
  </Box>
);
