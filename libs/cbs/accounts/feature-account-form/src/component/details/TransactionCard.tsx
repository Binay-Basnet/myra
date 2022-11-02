import { EbankingTransactionDirection } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

export const TransactionCard = ({ transactionItem }) => (
  <Box
    h="80px"
    display="flex"
    justifyContent="space-between"
    borderBottom="1px solid"
    alignItems="center"
    borderBottomColor="border.layout"
    // key={`${transactionItem?.date}${transactionItem?.title}${transactionItem?.amount}`}
  >
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3" fontWeight="500">
        {transactionItem?.name}
      </Text>
      <Text fontSize="s3" fontWeight="400">
        {transactionItem?.date}
      </Text>
    </Box>
    <Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        color={
          transactionItem?.transactionDirection === EbankingTransactionDirection?.Outgoing
            ? 'danger.500'
            : 'primary.500'
        }
      >
        <Text fontSize="s3" fontWeight="400">
          {transactionItem?.transactionDirection === EbankingTransactionDirection?.Outgoing
            ? '-'
            : '+'}
        </Text>
        <Text fontSize="s3" fontWeight="400">
          {' '}
          {transactionItem?.amount}
        </Text>
      </Box>
    </Box>
  </Box>
);
