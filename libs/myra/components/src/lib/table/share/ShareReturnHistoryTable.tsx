import { useMemo } from 'react';
import { useGetShareHistoryQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';
import moment from 'moment';

type shareHistoryProps = {
  id: string;
};

export const ShareReturnHistoryTable = ({ id }: shareHistoryProps) => {
  const { data: shareHistoryTableData, isLoading } = useGetShareHistoryQuery({
    memberId: id,
  });

  const data = shareHistoryTableData?.share?.register?.edges;
  const rowData = useMemo(() => data, [data]);

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
                ? (row?.original?.node?.shareAmount).toFixed(2)
                : '-'}
            </span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: 'Share Cr',
        accessor: 'shareCr',

        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.transactionDirection === 'PURCHASE'
                ? (row?.original?.node?.shareAmount).toFixed(2)
                : '-'}
            </span>
          );
        },
      },
      {
        Header: 'Balance',
        accessor: 'node.balance',
        Cell: ({ row }) => {
          return (
            <span>
              {row?.original?.node?.transactionDirection === 'PURCHASE'
                ? (row?.original?.node?.balance).toFixed(2)
                : '-'}
            </span>
          );
        },
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
