import { Box, Text } from '@myra-ui';

import { quantityConverter } from '@coop/shared/utils';

import { BalanceCard, RecentTransactions } from '../details';
import { useCOAAccountDetails } from '../../hooks';

export const Overview = () => {
  const { accountDetails } = useCOAAccountDetails();

  return (
    <>
      <Text fontSize="r3" fontWeight="600" color="gray.800">
        Overview
      </Text>

      <BalanceCard />

      <Box display="flex" justifyContent="space-between" bg="white" p="s16">
        <Box display="flex" gap="s4" alignItems="center">
          <Text fontSize="r1" fontWeight="400" color="gray.800">
            Total No. of Transactions:
          </Text>
          <Text fontSize="r1" fontWeight="600" color="gray.700">
            {quantityConverter(accountDetails?.totalNoOfTxns ?? 0)}
          </Text>
        </Box>
      </Box>

      <RecentTransactions />
    </>
  );
};
