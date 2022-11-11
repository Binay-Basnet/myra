import React from 'react';

import { Column, Table } from '@coop/shared/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        accounttName: string | null | undefined;
        used: number | null | undefined;
        left: number | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ReportTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Account Name',
        accessorKey: 'accounttName',
        meta: {
          width: '40%',
        },
      },
      {
        header: 'No- of leaves used',
        accessorKey: 'used',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'No- of leaves left',
        accessorKey: 'left',
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
