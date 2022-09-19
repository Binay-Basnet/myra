import { ColumnDef, Row, Table } from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

export type Column<TData extends Maybe<Record<string, unknown>>> = ColumnDef<TData>;

export interface TableProps<TData extends Maybe<Record<string, unknown>>> {
  data: Maybe<Array<Maybe<TData>>> | TData;
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

  searchPlaceholder?: string;

  getRowId?: (originalRow: TData) => string;

  variant?: 'simple' | 'report';
  showFooter?: boolean;
  noDataTitle?: string;

  rowOnClick?: (row: TData) => void;
}

export type TableInstance<T> = Table<T>;
export type { Row };
