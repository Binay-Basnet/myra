import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { IUseTableProps } from '../types/UseTable';

export const useTable = <T extends Record<string, unknown>>({
  data,
  columns,
  ...rest
}: IUseTableProps<T>) => {
  return useReactTable<T>({
    defaultColumn: {
      meta: {
        width: '150px',
      },
    },

    getRowId: (row) => (row?.['node'] as any).id,

    enableRowSelection: true,
    data: data as unknown as T[],
    columns: columns as unknown as ColumnDef<T>[],

    getCoreRowModel: getCoreRowModel(),
    ...rest,
  });
};
