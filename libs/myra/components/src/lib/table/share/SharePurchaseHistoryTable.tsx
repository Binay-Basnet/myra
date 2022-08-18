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

  const { data: shareHistoryTableData, isFetching } = useGetShareHistoryQuery(
    {
      memberId: id,
    },
    {
      staleTime: 0,
    }
  );

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
        // footer: () => '',
      },

      {
        header: t['sharePurchaseTableDate'],
        accessorFn: (row) => row?.transactionDate,
        // footer: () => '',
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
        // footer: () => '',
      },

      {
        id: 'share-dr',
        header: t['sharePurchaseTableShareDr'],
        accessorFn: (row) => row?.debit,

        cell: (props) => {
          return (
            <span>
              {props.getValue() ? `${amountConverter(props.getValue())}` : '-'}
            </span>
          );
        },
        // footer: () => '',
      },
      {
        id: 'share-cr',
        header: t['sharePurchaseTableShareCr'],
        meta: {
          isNumeric: true,
        },
        // footer: () => '',
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
        meta: {
          isNumeric: true,
        },

        // footer: (col) => console.log(col),
        cell: (props) => {
          return <span>{amountConverter(props.getValue())}</span>;
        },
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
      // showFooter
    />
  );
};
