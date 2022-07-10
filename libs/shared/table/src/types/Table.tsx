import {
  Cell,
  Column as RTColumn,
  ColumnDef,
  Row,
  RowModel,
  Table as RTTable,
} from '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    isNumeric?: boolean;
    width?: number | string;
  }
}

export type Maybe<T> = T | null;

export type Column<TData extends Record<string, unknown>> = ColumnDef<TData>;

export interface TableProps<TData extends Record<string, unknown>> {
  data: Maybe<Array<Maybe<TData>>>;
  columns: Array<Maybe<Column<TData>>>;

  pagination?: {
    total: number | string;
    startCursor: string;
    endCursor: string;
  };

  // data: TData[];
  // columns: Column<TData>[];
}
