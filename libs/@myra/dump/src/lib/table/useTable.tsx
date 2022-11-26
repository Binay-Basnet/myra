import { useMemo } from 'react';
import {
  Column,
  useFilters,
  useRowSelect,
  useSortBy,
  useTable as useReactTable,
} from 'react-table';

import { amountFilter } from './filters/amountFilter';
import { selectionHook } from './hooks/selectionHook';
import { TableProps } from './types';

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
}: Omit<TableProps<T>, 'pagination'>) {
  const defaultColumn: Partial<Column<T>> = useMemo(
    () => ({
      disableFilters: disableFilterAll,
      disableSortBy: disableSortAll,
      filter: 'includesSome',
      filterType: 'list',
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
      data: data as unknown as T[],
      columns: columns as unknown as Column<T>[],
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
