import { useMemo } from 'react';
import { ShareRegisterEdge, useGetShareHistoryQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';
import moment from 'moment';

type memberIdProp = {
  memberId: string;
};

export const ShareReturnHistoryTable = ({ memberId }: memberIdProp) => {
  const { data, isLoading } = useGetShareHistoryQuery({ memberId });
  const rowData = useMemo(() => data?.share?.register?.edges, [data]);

  const columns: Column<ShareRegisterEdge>[] = useMemo(
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
