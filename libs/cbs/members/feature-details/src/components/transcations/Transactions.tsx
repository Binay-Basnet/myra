import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, DetailsCard, Table, Text } from '@myra-ui';

import { useGetMemberKymDetailsOverviewQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const TransactionTable = () => {
  const router = useRouter();
  const memberDetails = useGetMemberKymDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberRecentTrans =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.recentTransactions;

  const memberRecentTransWithIndex =
    memberRecentTrans?.map((trans, index) => ({
      index: index + 1,
      ...trans,
    })) ?? [];

  const columns = useMemo<Column<typeof memberRecentTransWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
      },
      {
        header: 'Transaction ID',
        accessorKey: 'noOfShares',
        cell: (props) =>
          props.getValue() ? <Text color="primary.500">#{props.getValue() as string}</Text> : 'N/A',
      },
      {
        header: 'Type',
        accessorKey: 'txnType',
        cell: (props) =>
          props.getValue() ? (
            <Text fontWeight="Medium" fontSize="s3" lineHeight="17px">
              {props.getValue() as string}
            </Text>
          ) : (
            'N/A'
          ),
      },

      {
        header: 'Account / Particulars',
        accessorKey: 'title',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Total',
        accessorKey: 'amount',
        cell: (props) =>
          props.table ? (
            <Text fontWeight="Medium" fontSize="r1" lineHeight="17px" color="primary.500">
              {amountConverter(props.getValue() as string)}
            </Text>
          ) : (
            'N/A'
          ),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  if (!memberRecentTransWithIndex || Object.keys(memberRecentTransWithIndex).length === 0)
    return null;
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
  //     pagination: { ...getPaginationQuery(), first: -1, after: '' },
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
    <DetailsCard title="Recent Transactions" hasTable>
      <Table isDetailPageTable isStatic data={memberRecentTransWithIndex} columns={columns} />
    </DetailsCard>
    // <DetailsCard title="Recent Transactions" bg="white" hasTable>
    //   {memberRecentTrans?.map(
    //     (item) =>
    //       item && (
    //         <TransactionViewCard
    //           title={item?.title as string}
    //           txnType={item?.txnType}
    //           amount={item?.amount as string}
    //           date={item?.date as string}
    //           noOfShares={item?.noOfShares as number}
    //         />
    //       )
    //   )}
    // </DetailsCard>
  );
};
