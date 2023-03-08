import React from 'react';

import { Column, Table } from '@myra-ui/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        id: string | null | undefined;

        branchCode: string | null | undefined;
        name: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ServiceCenterTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Service Center Code',
        accessorKey: 'branchCode',
      },
      {
        header: 'Service Center Name',
        accessorKey: 'name',
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
