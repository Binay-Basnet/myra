import { DetailsCard } from '@coop/shared/ui';
import { useAccountDetails, useGetAccountTransactionList } from '@coop/shared/utils';

import { TransactionCard } from './TransactionCard';

export const RecentTransactions = () => {
  const { accountDetails } = useAccountDetails();

  const { transactionList } = useGetAccountTransactionList({
    accountId: accountDetails?.accountId,
  });

  return (
    <DetailsCard title="Recent Transactions" bg="white" hasTable>
      {transactionList
        ?.slice(0, 5)
        ?.map((item) => item && <TransactionCard transactionItem={item} />)}
    </DetailsCard>
  );
};
