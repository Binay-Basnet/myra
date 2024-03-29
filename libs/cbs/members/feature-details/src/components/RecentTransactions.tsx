import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import { EbankingTransaction, useGetAccountTransactionListsQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const RecentTransactions = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
    {
      filter: { memberIds: [id as string] },
      pagination: getPaginationQuery(),
    },
    {
      enabled: !!id,
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
      hasTable
      leftBtn={
        <Button
          variant="ghost"
          size="md"
          onClick={() => router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${id}&tab=transactions`)}
        >
          View All Transactions
        </Button>
      }
    >
      <TransactionTable data={transactionList} />
    </DetailsCard>
  );
};
