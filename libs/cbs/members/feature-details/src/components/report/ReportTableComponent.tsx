import React from 'react';

import { Column, Table } from '@coop/shared/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        code: string | null | undefined;
        reportName: string | null | undefined;
        category: string | null | undefined;
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
        header: 'Code',
        accessorKey: 'code',
        meta: {
          width: '10%',
        },
      },
      {
        header: 'Report Name',
        accessorKey: 'reportName',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Category',
        accessorKey: 'category',
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
