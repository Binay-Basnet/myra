import { ColumnDef, TableOptions } from '@tanstack/react-table';
export type Maybe<T> = T | null;

export type Column<TData extends Record<string, unknown>> = ColumnDef<TData>;

export type IUseTableProps<T extends Record<string, unknown>> =
  | TableOptions<T>
  | {
      data: Maybe<Array<Maybe<T>>>;
      columns: Maybe<Array<Maybe<Column<T>>>>;
    };
