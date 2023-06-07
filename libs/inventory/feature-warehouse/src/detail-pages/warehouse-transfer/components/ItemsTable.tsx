import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { amountConverter, quantityConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        quantity: string | null | undefined;
        rate: string | null | undefined;
        amount: string | null | undefined;
        itemName: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ItemsTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },

      {
        header: 'Item Name',
        accessorKey: 'itemName',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity',
        cell: (props) => quantityConverter(props?.row?.original?.quantity || '0'),
      },
      {
        header: 'Rate',
        accessorKey: 'rate',
        cell: (props) => amountConverter(props?.row?.original?.rate || '0'),
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) => amountConverter(props?.row?.original?.amount || '0'),
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
