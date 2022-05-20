import {
  useRowSelect,
  useSortBy,
  useTable as useReactTable,
} from 'react-table';
import { TableProps } from './react-table-config';
import { selectionHook } from './hooks/selectionHook';

const rowSelectionHooks = [useRowSelect, selectionHook];

export function useTable<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection,
  sort,
  isStatic,
  manualSort,
  ...props
}: TableProps<T>) {
  const hooks = isStatic
    ? []
    : hasRowSelection
    ? [useSortBy, ...rowSelectionHooks]
    : [];

  return useReactTable<T>(
    {
      ...props,
      data,
      columns,
      manualSortBy: manualSort,
      disableSortBy: !sort,
      isMultiSortEvent: (e) => {
        return !e.shiftKey;
      },
    },
    ...hooks
  );
}

export type { Column, HeaderGroup } from 'react-table';
