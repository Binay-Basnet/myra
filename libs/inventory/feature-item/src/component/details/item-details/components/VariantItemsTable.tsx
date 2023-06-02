import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        sku: string | null | undefined;

        itemName: string | null | undefined;
        sellingPrice: string | null | undefined;
        costPrice: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const VariantsTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'SKU',
        accessorKey: 'sku',
      },
      {
        header: 'Item Name',
        accessorKey: 'itemName',
        meta: {
          width: '60%',
        },
      },
      {
        header: 'Selling Price',
        accessorKey: 'sellingPrice',
        cell: (props) => amountConverter(props?.row?.original?.sellingPrice || '0'),
      },
      {
        header: 'Selling Price',
        accessorKey: 'sellingPrice',
        cell: (props) => amountConverter(props?.row?.original?.costPrice || '0'),
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
