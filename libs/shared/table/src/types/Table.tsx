import { ColumnDef, Row, Table } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    isNumeric?: boolean;
    width?: number | string;
    Footer?: {
      colspan?: number;
      display?: 'none';
    };
  }
}

export type Maybe<T> = T | null;

export type Column<TData extends Maybe<Record<string, unknown>>> =
  ColumnDef<TData>;

export interface TableProps<TData extends Maybe<Record<string, unknown>>> {
  data: Maybe<Array<Maybe<TData>>> | TData;
  columns: Maybe<Array<Maybe<Column<Maybe<TData>>>>> | Column<TData>[];

  pagination?: {
    total: number | string;
    startCursor: string;
    endCursor: string;
  };

  size?: 'default' | 'compact' | 'report';
  isLoading?: boolean;
  isStatic?: boolean;

  searchPlaceholder?: string;

  getRowId?: (originalRow: TData) => string;

  variant?: 'simple' | 'report';
  showFooter?: boolean;
  noDataTitle?: string;
}

export type TableInstance<T> = Table<T>;
export type { Row };
