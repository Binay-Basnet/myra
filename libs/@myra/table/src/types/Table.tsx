import { ChangeEventHandler, MouseEventHandler } from 'react';
import { ColumnDef, Row, RowData, Table } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    column?: ColumnDef<TData, TValue>;
    isNumeric?: boolean;
    width?: number | string;
    Footer?: {
      colspan?: number;
      display?: 'none';
    };
  }
}

export type Maybe<T> = T | null;

export type Column<TData extends Maybe<Record<string, unknown>>> = {
  accessorKey?: keyof TData | 'actions';
  // cell?: (props1: CellContext<TData, unknown>) => JSX.Element;
} & ColumnDef<TData>;

export interface TableProps<TData extends Maybe<Record<string, unknown>>> {
  data: Maybe<Array<Maybe<TData>>> | TData[];
  columns: Maybe<Array<Maybe<Column<Maybe<TData>>>>> | Column<TData>[];

  pagination?: {
    total: number | string;
    pageInfo?: {
      startCursor?: string | null;
      endCursor?: string | null;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    } | null;
  };

  size?: 'default' | 'compact' | 'report' | 'small';
  isLoading?: boolean;
  isStatic?: boolean;
  isDetailPageTable?: boolean;

  searchPlaceholder?: string;

  getRowId?: (originalRow: TData) => string;

  variant?: 'simple' | 'report';
  showFooter?: boolean;
  noDataTitle?: string;

  rowOnClick?: (row: TData) => void;

  // Sorting Props
  enableSorting?: boolean;
  manualSorting?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  nClick?: MouseEventHandler<HTMLInputElement> | undefined;

  // Expand Props
  getSubRows?: (row: TData) => TData[];

  tableTitle?: string;
}

export type TableInstance<T> = Table<T>;
export type { Row };
