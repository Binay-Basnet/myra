import { TableOptions } from '@tanstack/react-table';

import { Column } from './Table';

export type Maybe<T> = T | null;

export type IUseTableProps<TData> = Omit<
  TableOptions<TData>,
  'data' | 'columns' | 'getCoreRowModel'
> & {
  data: TData[];
  columns: Column<TData>[];

  isStatic: boolean;
};
