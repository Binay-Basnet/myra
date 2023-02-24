import { TableOptions } from '@tanstack/react-table';

import { Column } from './Table';

export type Maybe<T> = T | null;

export type IUseTableProps<T extends Record<string, unknown>> = Omit<
  TableOptions<T>,
  'data' | 'columns' | 'getCoreRowModel'
> & {
  data: Maybe<T>[];
  columns: Column<Maybe<T>>[];
  isStatic: boolean;
};
