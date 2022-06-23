import { useMemo } from 'react';
import { useGetShareHistoryQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import format from 'date-fns/format';
import { useRouter } from 'next/router';
import { useTranslation } from '@coop/shared/utils';
// import { amountConverter } from '../../../../../util/src/utilFunctions/amountFunc';

type shareHistoryProps = {
  id: string;
};

export const SharePurchaseHistoryTable = ({ id }: shareHistoryProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: shareHistoryTableData, isFetching } = useGetShareHistoryQuery({
    memberId: id,
  });
  const data = shareHistoryTableData?.share?.register?.edges;
  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['sn'],
        accessor: 'node.id',
        width: '2',
        Cell: ({ row }) => {
          return <span>{Number(row?.id) + 1}</span>;
        },
      },

      {
        Header: t['sharePurchaseTableDate'],
        accessor: 'node.transactionDate',
        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },

      {
        Header: t['sharePurchaseTableShareNumber'],
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
        Header: t['sharePurchaseTableShareDr'],
        accessor: 'node.shareDr',
        isNumeric: true,

        Cell: ({ value, row }) => {
          return (
            <span> {value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: t['sharePurchaseTableShareCr'],
        isNumeric: true,
        accessor: 'node.shareCr',
        Cell: ({ value, row }) => {
          return (
            <span> {value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        Header: t['sharePurchaseTableBalance'],
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
    [router.locale]
  );

  return (
    <Table
      isStatic={true}
      size="compact"
      isLoading={isFetching}
      data={rowData ?? []}
      columns={columns}
      showFooters={true}
    />
  );
};
