import { useMemo } from 'react';
import { useGetShareHistoryQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import format from 'date-fns/format';

type memberIdProp = {
  id: string;
};

export const ShareReturnHistoryTable = ({ id }: memberIdProp) => {
  const { data, isLoading } = useGetShareHistoryQuery({ memberId: id });
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
        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },

      {
        Header: 'Share Number',
        accessor: 'node.shareStartNumber',

        Cell: ({ value, row }) => {
          return (
            <span>
              {value} to {row?.original?.node?.shareEndNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        Header: 'Share Dr',
        accessor: 'node.shareDr',
        isNumeric: true,

        Cell: ({ value, row }) => {
          return (
            <span>{value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: 'Share Cr',
        isNumeric: true,
        accessor: 'node.shareCr',
        Cell: ({ value, row }) => {
          return (
            <span> {value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        Header: 'Balance',
        accessor: 'node.balance',
        isNumeric: true,
        Cell: ({ value }) => {
          return <span>{value.toLocaleString('en-IN')}</span>;
        },
        Footer: (props) => {
          return (
            <div>
              Rs.{' '}
              {props.rows
                .reduce(
                  (sum, row) => Number(row.original.node.balance) + sum,
                  0
                )
                .toLocaleString('en-IN')}
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
      isLoading={isLoading}
      data={rowData ?? []}
      columns={columns}
      showFooters={true}
    />
  );
};
