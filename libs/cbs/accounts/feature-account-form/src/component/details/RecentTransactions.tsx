import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import { useAccountDetails } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

interface IProps {
  isClosed?: boolean;
}

export const RecentTransactions = ({ isClosed }: IProps) => {
  const router = useRouter();

  const { accountDetails, transactionList, transactionLoading: isFetching } = useAccountDetails();

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
      <TransactionTable data={transactionList.slice(0, 10)} isLoading={isFetching} />
    </DetailsCard>
  );
};
