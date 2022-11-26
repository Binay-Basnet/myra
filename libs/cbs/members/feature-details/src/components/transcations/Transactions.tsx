import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailsCard } from '@myra-ui';

import { TransactionViewCard } from './TransactionCard';

export const TransactionTable = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberRecentTrans =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.recentTransactions;
  // ................................................... For Later ...................................................................//
  // const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
  //   {
  //     filter: {
  //       memberIds: [router.query['id'] as string],
  //       date: {
  //         from: {
  //           en: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
  //           np: '',
  //           local: '',
  //         },
  //         to: { en: format(new Date(), 'yyyy-MM-dd'), np: '', local: '' },
  //       },
  //     },
  //     pagination: { ...getRouterQuery({ type: ['PAGINATION'] }), first: -1, after: '' },
  //   },
  //   {
  //     enabled: !!router.query['id'],
  //   }
  // );
  // const transactionData = transactionListQueryData?.account?.listTransactions?.edges;
  // const trasactionItems = transactionData?.map((item) => ({
  //   date: item?.node?.date,
  //   month: item?.node?.month,
  //   id: item?.node?.id,
  //   accountId: item?.node?.accountId,
  //   name: item?.node?.name,
  //   transactionDirection: item?.node?.transactionDirection,
  //   amount: item?.node?.amount,
  // }));

  return (
    <DetailsCard title="Recent Transactions" bg="white" hasTable>
      {memberRecentTrans?.map(
        (item) =>
          item && (
            <TransactionViewCard
              title={item?.title as string}
              txnType={item?.txnType}
              amount={item?.amount as string}
              date={item?.date as string}
              noOfShares={item?.noOfShares as number}
            />
          )
      )}
    </DetailsCard>
  );
};
