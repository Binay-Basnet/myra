import {
  ActionType,
  Column,
  ColumnGroup,
  ColumnWithLooseAccessor,
  ColumnWithStrictAccessor,
  Meta,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByHooks,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

declare module 'react-table' {
  export type UseTableOptions<D extends object> = {
    columns: Array<Column<D>>;
    data: readonly D[];
  } & Partial<{
    initialState: Partial<TableState<D>>;
    stateReducer: (
      newState: TableState<D>,
      action: ActionType,
      previousState: TableState<D>,
      instance?: TableInstance<D>
    ) => TableState<D>;
    useControlledState: (state: TableState<D>, meta: Meta<D>) => TableState<D>;
    defaultColumn: Partial<Column<D>>;
    getSubRows: (originalRow: D, relativeIndex: number) => D[];
    getRowId: (
      originalRow: D,
      relativeIndex: number,
      parent?: Row<D>
    ) => string;
    autoResetHiddenColumns: boolean;
  }>;

  export interface TableOptions<D extends Record<string, unknown>>
    extends UseTableOptions<D>,
      UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UseGroupByOptions<D>,
      UsePaginationOptions<D>,
      UseResizeColumnsOptions<D>,
      UseRowSelectOptions<D>,
      UseSortByOptions<D> {}

  export interface Hooks<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseExpandedHooks<D>,
      UseGroupByHooks<D>,
      UseRowSelectHooks<D>,
      UseSortByHooks<D> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderInstanceProps<D>,
      UseExpandedInstanceProps<D>,
      UseFiltersInstanceProps<D>,
      UseGlobalFiltersInstanceProps<D>,
      UseGroupByInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseFlexLayoutInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderState<D>,
      UseExpandedState<D>,
      UseFiltersState<D>,
      UseGlobalFiltersState<D>,
      UseGroupByState<D>,
      UsePaginationState<D>,
      UseResizeColumnsState<D>,
      UseRowSelectState<D>,
      UseSortByState<D> {
    rowCount: number;
  }

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnOptions<D>,
      UseGroupByColumnOptions<D>,
      UseResizeColumnsColumnOptions<D>,
      UseSortByColumnOptions<D> {
    align?: string;
  }

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnProps<D>,
      UseGroupByColumnProps<D>,
      UseResizeColumnsColumnProps<D>,
      UseFlexLayoutColumnProps<D>,
      UseSortByColumnProps<D> {}

  export type Cell<
    D extends Record<string, unknown> = Record<string, unknown>
  > = UseGroupByCellProps<D>;

  export interface Row<D extends Record<string, unknown>>
    extends UseExpandedRowProps<D>,
      UseGroupByRowProps<D>,
      UseRowSelectRowProps<D> {}
}

export interface ExtraColumnProps {
  isNumeric?: boolean;
  paddingX?: string | number | number[];
  paddingY?: string | number | number[];
  imgSrc?: string;
  hasSort?: boolean;
}

export type SubColumn<D extends Record<string, unknown>> =
  | ColumnGroup<D>
  | ColumnWithLooseAccessor<D>
  | ColumnWithStrictAccessor<D>;

export type Column<T> = SubColumn<T> & ExtraColumnProps;

export interface TableProps<T extends Record<string, unknown>> {
  data: T[];
  hasRowSelection?: boolean;
  columns: Array<Column<T>>;
  name?: string;
  size?: 'default' | 'compact';
  sort?: boolean;
  manualSort?: boolean;
  isStatic?: boolean;
}

export { Cell, HeaderGroup } from 'react-table';
