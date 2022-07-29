import { TableOptions } from '@tanstack/react-table';

import { Column } from './Table';
export type Maybe<T> = T | null;

export type IUseTableProps<T extends Record<string, unknown>> = Omit<
  TableOptions<T>,
  'data' | 'columns' | 'getCoreRowModel'
> & {
  data: Maybe<Array<Maybe<T>>> | T;
  columns: Maybe<Array<Maybe<Column<Maybe<T>>>>> | Column<T>[];
  isStatic: boolean;
};
