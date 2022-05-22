import {
  useFilters,
  useRowSelect,
  useSortBy,
  useTable as useReactTable,
} from 'react-table';
import { selectionHook } from './hooks/selectionHook';
import { useMemo } from 'react';
import { Column, TableProps } from './types';

const rowSelectionHooks = [useRowSelect, selectionHook];

export function useTable<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection,
  sort,
  isStatic,
  manualSort,
  disableSortAll,
  ...props
}: TableProps<T>) {
  const defaultColumn: Partial<Column<T>> = useMemo(
    () => ({
      disableFilters: true,
      disableSortBy: disableSortAll,
      Filter: () => null,
    }),
    []
  );

  const hooks = isStatic
    ? []
    : hasRowSelection
    ? [useFilters, useSortBy, ...rowSelectionHooks]
    : [];

  return useReactTable<T>(
    {
      ...props,
      data,
      columns,
      defaultColumn,
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
