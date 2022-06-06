import { useMemo } from 'react';
import { useGetShareHistoryQuery } from '@saccos/myra/graphql';
import { Column, Table } from '@saccos/myra/ui';
import moment from 'moment';

type memberIdProp = {
  memberId: string;
};

export const ShareReturnHistoryTable = ({ memberId }: memberIdProp) => {
  const { data, isLoading } = useGetShareHistoryQuery({ memberId });
  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'SN',
        accessor: 'node.id',
        maxWidth: 4,
        Cell: ({ row }) => {
          return <span>{Number(row?.id) + 1}</span>;
        },
      },

      {
        Header: 'Date',
        accessor: 'node.transactionDate',
        width: '80%',
        Cell: ({ value }) => {
          return <span>{moment(value).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        Header: 'No. of Share',
        accessor: 'node.noOfShare',
        maxWidth: 48,
      },
      {
        Header: 'Share Number',
        accessor: 'node.shareAmount',
        maxWidth: 48,
        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.shareStartNumber} {'to '}
              {row?.original?.node?.shareEndNumber}
            </span>
          );
        },
      },
      {
        id: 'share-dr',
        Header: 'Share Dr',
        accessor: 'node.shareStatus',

        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.transactionDirection === 'RETURN'
                ? row?.original?.node?.shareAmount
                : '-'}
            </span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: 'Share Cr',
        accessor: 'node.shareStatus',

        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.transactionDirection === 'PURCHASE'
                ? row?.original?.node?.shareAmount
                : '-'}
            </span>
          );
        },
      },
      {
        Header: 'Balance',
        accessor: 'node.balance',
      },
    ],
    []
  );

  return (
    <Table
      isLoading={isLoading}
      data={rowData ?? []}
      columns={columns}
      sort={true}
    />
  );
};
