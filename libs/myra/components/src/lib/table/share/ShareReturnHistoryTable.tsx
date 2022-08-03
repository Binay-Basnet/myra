import { useMemo } from 'react';
import { useRouter } from 'next/router';
import format from 'date-fns/format';

import { useGetShareHistoryQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type memberIdProp = {
  id: string;
};

export const ShareReturnHistoryTable = ({ id }: memberIdProp) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data, isFetching } = useGetShareHistoryQuery({ memberId: id });
  const rowData = useMemo(() => data?.share?.register?.edges ?? [], [data]);

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
        Header: t['shareReturnTableDate'],
        accessor: 'node.transactionDate',
        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },

      {
        Header: t['shareReturnTableShareNumber'],
        accessor: 'node.startNumber',

        Cell: ({ value, row }) => {
          return (
            <span>
              {value} to {row?.original?.node?.endNumber}
            </span>
          );
        },
      },

      {
        id: 'share-dr',
        Header: t['shareReturnTableShareDr'],
        accessor: 'node.debit',
        isNumeric: true,

        Cell: ({ value, row }) => {
          return (
            <span>{value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        id: 'share-cr',
        Header: t['shareReturnTableShareCr'],
        isNumeric: true,
        accessor: 'node.credit',
        Cell: ({ value, row }) => {
          return (
            <span> {value ? `${value.toLocaleString('en-IN')}` : '-'}</span>
          );
        },
      },
      {
        Header: t['shareReturnTableBalance'],
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
      isLoading={isFetching}
      data={rowData ?? []}
      columns={columns}
      showFooters={true}
    />
  );
};
