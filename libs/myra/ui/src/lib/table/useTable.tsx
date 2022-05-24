import {
  useFilters,
  useRowSelect,
  useSortBy,
  useTable as useReactTable,
} from 'react-table';
import { selectionHook } from './hooks/selectionHook';
import { useMemo } from 'react';
import { Column, TableProps } from './types';
import { amountFilter } from './filters/amountFilter';

const rowSelectionHooks = [useRowSelect, selectionHook];

const filterTypes = {
  numberAll: amountFilter,
};

export function useTable<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection,
  sort,
  isStatic,
  manualSort,
  filter,
  disableSortAll,
  disableFilterAll,
  ...props
}: TableProps<T>) {
  const defaultColumn: Partial<Column<T>> = useMemo(
    () => ({
      disableFilters: disableFilterAll,
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
      filterTypes,
      defaultColumn,
      manualSortBy: manualSort,
      disableFilters: !filter,
      disableSortBy: !sort,
      isMultiSortEvent: (e) => {
        return !e.shiftKey;
      },
    },
    ...hooks
  );
}

export type { Column, HeaderGroup } from 'react-table';
