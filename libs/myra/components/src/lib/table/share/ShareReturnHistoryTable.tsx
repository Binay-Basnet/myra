import { useMemo } from 'react';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import { useGetShareHistoryQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type memberIdProp = {
  id: string;
};

export const ShareReturnHistoryTable = ({ id }: memberIdProp) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, isFetching } = useGetShareHistoryQuery({ memberId: id });
  const rowData = useMemo(() => data?.share?.history?.history ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['sn'],
        accessorFn: (row) => row?.member?.id,
      },

      {
        header: t['shareReturnTableDate'],
        accessorFn: (row) => row?.transactionDate,
        cell: (props) => {
          return (
            <span>{format(new Date(props.getValue()), 'yyyy-mm-dd')}</span>
          );
        },
      },

      {
        header: t['shareReturnNoOfShares'],
        accessorFn: (row) => row?.endNumber,
      },

      {
        header: t['shareReturnTableShareNumber'],
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
        header: t['shareReturnTableShareDr'],
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
        header: t['shareReturnTableShareCr'],
        isNumeric: true,
        accessorFn: (row) => row?.credit,
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
        header: t['shareReturnTableBalance'],
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
      isLoading={isFetching}
      data={rowData ?? []}
      columns={columns}
      // showFooters={true}
    />
  );
};
