import { useRouter } from 'next/router';
import format from 'date-fns/format';
import subDays from 'date-fns/subDays';

import { useGetAccountTransactionListsQuery } from '@coop/cbs/data-access';
import { DetailsCard } from '@coop/shared/ui';
import { getRouterQuery } from '@coop/shared/utils';

import { TransactionCard } from './TransactionsCardCOmponent';

export const TransactionTable = () => {
  const router = useRouter();

  const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
    {
      filter: {
        memberIds: [router.query['id'] as string],
        date: {
          from: {
            en: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
            np: '',
            local: '',
          },
          to: { en: format(new Date(), 'yyyy-MM-dd'), np: '', local: '' },
        },
      },
      pagination: { ...getRouterQuery({ type: ['PAGINATION'] }), first: -1, after: '' },
    },
    {
      enabled: !!router.query['id'],
    }
  );
  const transactionData = transactionListQueryData?.account?.listTransactions?.edges;
  const trasactionItems = transactionData?.map((item) => ({
    date: item?.node?.date,
    month: item?.node?.month,
    id: item?.node?.id,
    accountId: item?.node?.accountId,
    name: item?.node?.name,
    transactionDirection: item?.node?.transactionDirection,
    amount: item?.node?.amount,
  }));

  return (
    <DetailsCard title="Recent Transactions" bg="white" hasTable>
      {trasactionItems?.map((item) => item && <TransactionCard transactionItem={item} />)}
    </DetailsCard>
  );
};
