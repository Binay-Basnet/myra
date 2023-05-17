import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';
import { quantityConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        itemId: string | null | undefined;
        itemName: string | null | undefined;
        warehouseName: string | null | undefined;
        newQuantity: string | null | undefined;
        oldQuantity: string | number | null | undefined;
        quantityAdjusted: string | null | undefined;
        date: Record<'local' | 'en' | 'np', string> | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const QuantityAdjustmentTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Item Id',
        accessorKey: 'itemId',
        meta: {
          width: '60%',
        },
      },

      {
        header: 'Date',
        accessorKey: 'date',
        accessorFn: (row) => localizedDate(row?.date),
      },
      {
        header: 'Warehouse Name',
        accessorKey: 'warehouseName',
      },
      {
        header: 'Old Quantity',
        accessorKey: 'oldQuantity',
        accessorFn: (props) => quantityConverter(props?.oldQuantity || '0'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'New Quantity',
        accessorKey: 'newQuantity',
        accessorFn: (props) => quantityConverter(props?.newQuantity || '0'),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Adjusted Quantity',
        accessorKey: 'quantityAdjusted',
        accessorFn: (props) => quantityConverter(props?.quantityAdjusted || '0'),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
