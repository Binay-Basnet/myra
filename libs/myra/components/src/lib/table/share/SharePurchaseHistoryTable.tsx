import { useMemo } from 'react';
import { useRouter } from 'next/router';

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
  const data = shareHistoryTableData?.share?.history?.history;
  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['sn'],
        accessorFn: (row) => row?.id,
        cell: (props) => {
          return <span>{props.row.index + 1}</span>;
        },
      },

      {
        header: t['sharePurchaseTableDate'],
        accessorFn: (row) => row?.transactionDate,
      },

      {
        header: t['sharePurchaseNoOfShares'],
        accessorFn: (row) => row?.shareAmount,
      },

      {
        header: t['sharePurchaseTableShareNumber'],
        accessorFn: (row) => row?.startNumber,

        cell: (props) => {
          return (
            <span>
              {props.getValue()} to {props?.row?.original?.endNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        header: t['sharePurchaseTableShareDr'],
        accessorFn: (row) => row?.debit,
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
        accessorFn: (row) => row?.credit,
        cell: (props) => {
          return (
            <span>
              {props.getValue() ? `${amountConverter(props.getValue())}` : '-'}
            </span>
          );
        },
      },
      {
        header: t['sharePurchaseTableBalance'],
        accessorFn: (row) => row?.balance,
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
