import { AiOutlineStock } from 'react-icons/ai';

import { useGetTotalExpenseQuery } from '@coop/ebanking/data-access';
import { Box, Grid, Icon, TextFields } from '@myra-ui';
import { amountConverter } from '@coop/shared/utils';

export const TransactionHeaderCard = () => {
  const { data } = useGetTotalExpenseQuery();
  const totalExpense =
    data?.eBanking?.account?.list?.recentTransactions?.summary?.expensesThisMonth;

  return (
    <Box
      display="flex"
      flexDir="column"
      p="s16"
      bg="primary.500"
      color="white"
      gap="s24"
      borderRadius="br2"
    >
      <TextFields variant="stickyCardHeader">Transaction History</TextFields>

      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        <Box display="flex" alignItems="center" gap="s12">
          <Box
            borderRadius="br2"
            bg="primary.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={AiOutlineStock} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total expenses this month
            </TextFields>
            <TextFields variant="stickyCardHeader">{amountConverter(totalExpense ?? 0)}</TextFields>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
