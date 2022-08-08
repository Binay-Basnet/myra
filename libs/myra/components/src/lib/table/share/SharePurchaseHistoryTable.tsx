import { useMemo } from 'react';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import { useGetShareHistoryQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { amountConverter, useTranslation } from '@coop/shared/utils';

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
        header: t['sn'],
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: t['sharePurchaseTableDate'],
        accessorFn: (row) => row?.node?.transactionDate,
        cell: (props) => {
          return (
            <span>{format(new Date(props.getValue()), 'yyyy-mm-dd')}</span>
          );
        },
      },

      {
        header: t['sharePurchaseNoOfShares'],
        accessorFn: (row) => row?.node?.endNumber,
      },

      {
        header: t['sharePurchaseTableShareNumber'],
        accessorFn: (row) => row?.node?.startNumber,

        cell: (props) => {
          return (
            <span>
              {props.getValue()} to {props?.row?.original?.node?.endNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        header: t['sharePurchaseTableShareDr'],
        accessorFn: (row) => row?.node?.debit,
        isNumeric: true,

        cell: (props) => {
          return (
            <span>
              {props.getValue() ? `${amountConverter(props.getValue())}` : '-'}
            </span>
          );
        },
      },
      {
        id: 'share-cr',
        header: t['sharePurchaseTableShareCr'],
        isNumeric: true,
        accessorFn: (row) => row?.node?.credit,
        cell: (props) => {
          return (
            <span>
              {' '}
              {props.getValue() ? `${amountConverter(props.getValue())}` : '-'}
            </span>
          );
        },
      },
      {
        header: t['sharePurchaseTableBalance'],
        accessorFn: (row) => row?.node?.balance,
        isNumeric: true,
        cell: (props) => {
          return <span>{amountConverter(props.getValue())}</span>;
        },
        // Footer: (props) => {
        //   return (
        //     <div>
        //       Rs.{' '}
        //       {props.rows
        //         .reduce(
        //           (sum, row) => Number(row.original.node.balance) + sum,
        //           0
        //         )
        //         .toLocaleString('en-IN')}
        //     </div>
        //   );
        // },
      },
    ],
    [router, t]
  );

  return (
    <Table
      isStatic={true}
      size="compact"
      isLoading={isFetching}
      data={rowData ?? []}
      columns={columns}
      // showFooters={true}
    />
  );
};
