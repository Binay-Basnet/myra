import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        itemId: string | null | undefined;
        newValue: string | null | undefined;
        date: Record<'local' | 'en' | 'np', string> | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ValueAdjustmentTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Item Id',
        accessorKey: 'itemId',
        meta: {
          width: '60%',
        },
      },

      {
        header: 'Date',
        accessorKey: 'date',
        accessorFn: (row) => localizedDate(row?.date),
      },
      {
        header: 'New Adjusted Value',
        accessorKey: 'newValue',
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
