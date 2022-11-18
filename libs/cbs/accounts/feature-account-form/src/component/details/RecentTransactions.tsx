import { useRouter } from 'next/router';

import { useAccountDetails, useGetAccountTransactionList } from '@coop/cbs/data-access';
import { Button, DetailsCard } from '@coop/shared/ui';

import { TransactionCard } from './TransactionCard';

export const RecentTransactions = () => {
  const router = useRouter();

  const { accountDetails } = useAccountDetails();

  const { transactionList } = useGetAccountTransactionList({
    accountId: accountDetails?.accountId,
  });

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
      {transactionList
        ?.slice(0, 5)
        ?.map((item) => item && <TransactionCard transactionItem={item} />)}
    </DetailsCard>
  );
};
