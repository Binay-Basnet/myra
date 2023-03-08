import React from 'react';

import { Column, Table } from '@myra-ui/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        name: string | null | undefined;
        id: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const RolesTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Role Name',
        accessorKey: 'name',
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
