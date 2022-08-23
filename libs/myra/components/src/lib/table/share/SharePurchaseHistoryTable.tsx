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
        footer: () => '',
        accessorFn: (row) => row?.id,
        cell: (props) => {
          return <span>{props.row.index + 1}</span>;
        },

        meta: {
          width: '10%',
        },
      },

      {
        header: t['sharePurchaseTableDate'],
        footer: () => '',
        accessorFn: (row) => row?.transactionDate,
      },

      {
        header: t['sharePurchaseTableShareNumber'],
        accessorFn: (row) => row?.startNumber,
        footer: () => '',
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
        footer: () => '',

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
        footer: () => '',

        // meta: {
        //   width: '20%',
        // },
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
        footer: () => shareHistoryTableData?.share.history?.balance?.amount,
        cell: (props) => {
          return <span>{amountConverter(props.getValue())}</span>;
        },
        meta: {
          isNumeric: true,
        },
      },
    ],
    [router, t, isFetching]
  );

  return (
    <Table
      showFooter={true}
      isStatic={true}
      size="compact"
      isLoading={isFetching}
      data={rowData ?? []}
      columns={columns}
    />
  );
};
