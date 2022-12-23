import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import {
  EbankingTransaction,
  useAccountDetails,
  useGetAccountTransactionListsQuery,
} from '@coop/cbs/data-access';
import { getRouterQuery } from '@coop/shared/utils';

export const RecentTransactions = () => {
  const router = useRouter();

  const { accountDetails } = useAccountDetails();

  const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
    {
      filter: { accountIds: [accountDetails?.accountId as string] },
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      enabled: !!accountDetails?.accountId,
    }
  );

  const transactionList = useMemo(
    () =>
      transactionListQueryData?.account?.listTransactions?.edges
        ?.slice(0, 10)
        ?.map((item) => item?.node as EbankingTransaction) ?? [],
    [transactionListQueryData]
  );

  return (
    <DetailsCard
      title="Recent Transactions"
      bg="white"
      hasTable
      leftBtn={
        <Button
          variant="ghost"
          onClick={() =>
            router.push(`/savings/details/${accountDetails?.accountId}?tab=transactions`)
          }
        >
          View all transactions
        </Button>
      }
    >
      <TransactionTable data={transactionList} hasIndex />
    </DetailsCard>
  );
};
