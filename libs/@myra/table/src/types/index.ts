import { ColumnDef, DeepKeys } from '@tanstack/react-table';

export type Column<TData extends Record<string, unknown>> = Omit<
  ColumnDef<TData, unknown>,
  'accessorKey'
> & {
  accessorKey: DeepKeys<TData> | 'actions';
};

type Pagination = {
  total: number | string;
  pageInfo?: {
    startCursor?: string | null;
    endCursor?: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
};

type TableSize = 'default' | 'compact';
type TableVariant = 'simple' | 'report';

export interface TableProps<TData extends Record<string, unknown>> {
  data: TData[];
  columns: Column<TData>[];

  pagination?: Pagination;
  size?: TableSize;
  variant?: TableVariant;

  isLoading?: boolean;
  isStatic?: boolean;
}
