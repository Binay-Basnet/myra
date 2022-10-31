import { useRouter } from 'next/router';

import {
  MemberRecentTransactionViewTxnType,
  useGetMemberDetailsOverviewQuery,
} from '@coop/cbs/data-access';
import { Box, Tags, Text } from '@coop/shared/ui';

export const RecentTransactions = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberRecentTrans =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.recentTransactions;

  return (
    <Box p="s16" bg="white">
      <Box display="flex" justifyContent="space-between" alignItems="center" h="50px">
        <Text fontWeight="600" fontSize="r1">
          Recent Transactions{' '}
        </Text>
      </Box>
      {memberRecentTrans && (
        <Box>
          {memberRecentTrans?.slice(0, 10).map((items) => (
            <Box
              h="80px"
              display="flex"
              justifyContent="space-between"
              borderBottom="1px solid"
              alignItems="center"
              borderBottomColor="border.layout"
              key={`${items?.date}${items?.title}${items?.amount}`}
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" fontWeight="500">
                  {items?.title}
                </Text>
                <Text fontSize="s3" fontWeight="400">
                  {items?.date}
                </Text>
              </Box>
              <Box>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  color={
                    items?.txnType === MemberRecentTransactionViewTxnType?.Debit
                      ? 'danger.500'
                      : 'primary.500'
                  }
                >
                  <Text fontSize="s3" fontWeight="400">
                    {items?.txnType === MemberRecentTransactionViewTxnType?.Debit ? '-' : '+'}
                  </Text>
                  <Text fontSize="s3" fontWeight="400">
                    {' '}
                    {items?.amount}
                  </Text>
                </Box>
                {items?.noOfShares && (
                  <Box>
                    <Tags
                      label={String(items?.noOfShares as unknown)}
                      type="chip"
                      bg={
                        items?.txnType === MemberRecentTransactionViewTxnType?.Debit
                          ? 'danger.100'
                          : 'primary.100'
                      }
                      labelColor={
                        items?.txnType === MemberRecentTransactionViewTxnType?.Debit
                          ? 'danger.500'
                          : 'primary.500'
                      }
                    />
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
