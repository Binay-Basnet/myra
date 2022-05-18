import { Column, useRowSelect, useTable as useReactTable } from 'react-table';
import { TableProps } from './react-table-config';
import { selectionHook } from './hooks/selectionHook';

const rowSelectionHooks = [useRowSelect, selectionHook];

export function useTable<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection,
  ...props
}: TableProps<T>) {
  const hooks = hasRowSelection ? rowSelectionHooks : [];

  const tableInstance = useReactTable<T>(
    {
      ...props,
      data,
      columns,
    },
    ...hooks
  );

  return tableInstance;
}

export type { Column, HeaderGroup } from 'react-table';
