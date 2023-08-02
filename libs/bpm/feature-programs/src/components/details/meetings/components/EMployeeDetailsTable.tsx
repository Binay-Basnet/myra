import React from 'react';

import { Column, Table } from '@myra-ui/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;

        name: string | null | undefined;
        designation: string | null | undefined;
        email: string | null | undefined;
        contact: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const EmployeeDetailsTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Member Name',
        accessorKey: 'name',
      },
      {
        header: 'Position',
        accessorKey: 'designation',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Phone Number',
        accessorKey: 'contact',
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
