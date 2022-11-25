import React from 'react';

import { Column, Table } from '@coop/shared/table';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        accountType: string | null | undefined;
        accountName: string | null | undefined;
        totalBalance: string | 0;
        interestRate: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const LoanTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Account Type',
        accessorKey: 'accountType',
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
      },
      {
        header: 'Balance',
        accessorKey: 'totalBalance',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interestRate',
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
