import { useMemo } from 'react';
import { useGetShareHistoryQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';
import moment from 'moment';

type memberIdProp = {
  memberId: string;
};

export const SharePurchaseHistoryTable = ({ memberId }: memberIdProp) => {
  const { data, isLoading } = useGetShareHistoryQuery({ memberId });
  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'SN',
        accessor: 'node.id',
        width: '2',
        Cell: ({ row }) => {
          return <span>{Number(row?.id) + 1}</span>;
        },
      },

      {
        Header: 'Date',
        accessor: 'node.transactionDate',
        width: '10%',
        Cell: ({ value }) => {
          return <span>{moment(value).format('YYYY-MM-DD')}</span>;
        },
      },
      {
        Header: 'No. of Share',
        accessor: 'node.noOfShare',
        isNumeric: true,
        Footer: (props) => {
          return (
            <div>
              {props.rows.reduce(
                (sum, row) => Number(row.original.node.noOfShare) + sum,
                0
              )}
            </div>
          );
        },
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
        isNumeric: true,

        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.transactionDirection === 'RETURN'
                ? row?.original?.node?.shareAmount.toFixed(2)
                : '-'}
            </span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: 'Share Cr',
        accessor: 'node.shareStatus',
        isNumeric: true,
        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.transactionDirection === 'PURCHASE'
                ? row?.original?.node?.shareAmount.toFixed(2)
                : '-'}
            </span>
          );
        },
      },
      {
        Header: 'Balance',
        accessor: 'node.balance',
        isNumeric: true,
        Cell: ({ value }) => {
          return <span>{value.toFixed(2)}</span>;
        },
        Footer: (props) => {
          return (
            <div>
              {props.rows
                .reduce(
                  (sum, row) => Number(row.original.node.balance) + sum,
                  0
                )
                .toFixed(2)}
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <Table
      isStatic={true}
      size="compact"
      isLoading={isLoading}
      data={rowData ?? []}
      columns={columns}
      sort={true}
      showFooters={true}
    />
  );
};
