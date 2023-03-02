import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
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
  const columnsWithRowSelection = [getCheckBoxColumn<T>(), ...columns];

  const columnsWithoutRowSelection = columns;

  return useReactTable<T>({
    defaultColumn: {
      enableSorting: false,
      meta: {
        width: '100px',
      },
      enableColumnFilter: false,
    },

    enableRowSelection: true,

  

    data: data as T[],
    columns: (isStatic ? columnsWithoutRowSelection : columnsWithRowSelection) as ColumnDef<T>[],

    ...rest,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
};
