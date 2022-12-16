import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { IUseTableProps } from '../types/UseTable';
// eslint-disable-next-line import/no-cycle
import { getCheckBoxColumn } from '../utils/getCheckBoxColumn';

export const useTable = <T extends Record<string, unknown>>({
  data,
  columns,
  isStatic,
  ...rest
}: IUseTableProps<T>) => {
  const columnsWithRowSelection = [
    getCheckBoxColumn<T>(),
    ...(columns as unknown as ColumnDef<T>[]),
  ];

  const columnsWithoutRowSelection = columns as unknown as ColumnDef<T>[];

  return useReactTable<T>({
    defaultColumn: {
      enableSorting: false,
      meta: {
        width: '100px',
      },
    },

    enableRowSelection: true,

    data: data as unknown as T[],
    columns: isStatic ? columnsWithoutRowSelection : columnsWithRowSelection,

    ...rest,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
};
