import { MemberRecentTransactionViewTxnType } from '@coop/cbs/data-access';
import { Box, Tags, Text } from '@coop/shared/ui';

interface ITransactionview {
  date: string;
  title: string;
  amount: string;
  txnType: MemberRecentTransactionViewTxnType | null | undefined;
  noOfShares: number;
}

export const TransactionViewCard = ({
  date,
  title,
  amount,
  noOfShares,
  txnType,
}: ITransactionview) => (
  <Box
    h="80px"
    display="flex"
    justifyContent="space-between"
    borderBottom="1px solid"
    alignItems="center"
    borderBottomColor="border.layout"
    key={`${date}${title}${amount}`}
  >
    <Box display="flex" flexDirection="column" gap="s4">
      <Text fontSize="s3" fontWeight="500">
        {title}
      </Text>
      <Text fontSize="s3" fontWeight="400">
        {date}
      </Text>
    </Box>
    <Box>
      <Box
        display="flex"
        justifyContent="flex-start"
        color={txnType === MemberRecentTransactionViewTxnType?.Debit ? 'danger.500' : 'primary.500'}
      >
        <Text fontSize="s3" fontWeight="400">
          {txnType === MemberRecentTransactionViewTxnType?.Debit ? '-' : '+'}
        </Text>
        <Text fontSize="s3" fontWeight="400">
          {' '}
          {amount}
        </Text>
      </Box>
      {noOfShares && (
        <Box>
          <Tags
            label={String(noOfShares as unknown)}
            type="chip"
            bg={
              txnType === MemberRecentTransactionViewTxnType?.Debit ? 'danger.100' : 'primary.100'
            }
            labelColor={
              txnType === MemberRecentTransactionViewTxnType?.Debit ? 'danger.500' : 'primary.500'
            }
          />
        </Box>
      )}
    </Box>
  </Box>
);
