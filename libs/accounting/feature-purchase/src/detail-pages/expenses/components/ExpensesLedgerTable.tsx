import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        accountId: string | null | undefined;
        amount: string | null | undefined;
        tax: string | null | undefined;
        taxAmount: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ExpensesLedgerTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Account ID',
        accessorKey: 'accountId',
        meta: {
          width: '40%',
        },
      },

      {
        header: 'Tax Amount',
        accessorFn: (row) => amountConverter(row?.taxAmount || '0'),
      },

      {
        header: 'Total Amount',
        accessorFn: (row) => amountConverter(row?.amount || '0'),
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
