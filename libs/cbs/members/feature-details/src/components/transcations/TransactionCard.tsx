import { Box, Chips, Text } from '@myra-ui';

import { MemberRecentTransactionViewTxnType } from '@coop/cbs/data-access';

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
          {txnType === MemberRecentTransactionViewTxnType?.Debit ? (
            <Chips
              variant="solid"
              theme="danger"
              size="md"
              type="label"
              label={String(noOfShares as unknown)}
            />
          ) : (
            <Chips
              variant="solid"
              theme="success"
              size="md"
              type="label"
              label={String(noOfShares as unknown)}
            />
          )}
        </Box>
      )}
    </Box>
  </Box>
);
