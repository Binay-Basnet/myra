import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        itemName: string | null | undefined;

        quantity: string | null | undefined;
        rate: string | null | undefined;
        tax: string | null | undefined;

        amount: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const CreditNoteProductDetailsTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Product',
        accessorKey: 'itemName',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
      },
      {
        header: 'Rate',
        accessorKey: 'rate',
      },
      {
        header: 'Tax(%)',
        accessorKey: 'tax',
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
