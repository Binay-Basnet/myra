import React from 'react';

import { Column, Table } from '@coop/shared/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        date: string | null | undefined;
        type: string | null | undefined;
        toFrom: string | null | undefined;
        shareCr: number | null | undefined;
        shareDr: number | null | undefined;
        balance: number | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ShareTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
      },
      {
        header: 'Type',
        accessorKey: 'type',
        meta: {
          width: '50%',
        },
      },
      {
        header: 'To-From',
        accessorKey: 'toFrom',
      },
      {
        header: 'Share Cr',
        accessorKey: 'shareCr',
      },
      {
        header: 'Share Dr',
        accessorKey: 'shareDr',
      },
      {
        header: 'Balance',
        accessorKey: 'balance',
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
