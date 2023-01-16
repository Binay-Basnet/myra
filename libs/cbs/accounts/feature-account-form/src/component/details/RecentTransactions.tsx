import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import {
  EbankingTransaction,
  useAccountDetails,
  useGetAccountTransactionListsQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

interface IProps {
  isClosed?: boolean;
}

export const RecentTransactions = ({ isClosed }: IProps) => {
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
      title={isClosed ? 'Past Transactions' : 'Recent Transactions'}
      bg="white"
      hasTable
      leftBtn={
        <Button
          variant="ghost"
          onClick={() =>
            router.push(
              `${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${accountDetails?.accountId}&tab=transactions`
            )
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
