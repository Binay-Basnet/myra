import { AccessorFn, ColumnDef, DeepKeys, Row, RowData, Table } from '@tanstack/react-table';

import { Id_Type } from '@coop/cbs/data-access';
import { AclKey, MenuType, RouteValue } from '@coop/cbs/utils';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    column?: ColumnDef<TData, TValue>;
    isNumeric?: boolean;
    width?: number | string;
    Footer?: {
      colspan?: number;
      display?: 'none';
    };
    filterMaps?: {
      list?: string[];
    };
  }
}

export type Pagination = {
  total: number | string;
  pageInfo?: {
    startCursor?: string | null;
    endCursor?: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
};

export type Maybe<T> = T | null;
export type TableSize = 'default' | 'compact' | 'small' | 'report';
export type TableVariant = 'simple' | 'report';

export interface TableProps<TData extends Maybe<Record<string, unknown>>> {
  data: Maybe<TData>[];
  columns: Column<Maybe<TData>>[];

  pagination?: Pagination;
  size?: TableSize;
  variant?: TableVariant;

  isLoading?: boolean;
  isStatic?: boolean;

  searchPlaceholder?: string;
  noDataTitle?: string;

  rowOnClick?: (row: TData) => void;
  getSubRows?: (row: TData) => TData[];
  getRowId?: (originalRow: TData) => string;

  enableSorting?: boolean;
  manualSorting?: boolean;

  menu?: MenuType;
  forms?: {
    label: string;
    aclKey: AclKey;
    route: RouteValue;
    idType?: Id_Type;
  }[];

  tableTitle?: string;
  showFooter?: boolean;
  isDetailPageTable?: boolean;
}

export type Column<TData extends Maybe<Record<string, unknown>>> = Omit<
  ColumnDef<TData, unknown>,
  'accessorKey' | 'accessorFn' | 'id'
> & {
  id?: string;
  accessorFn?: AccessorFn<TData>;
  accessorKey?: DeepKeys<TData> | 'actions';
  columns?: Column<TData>[];
};

export type TableInstance<T> = Table<T>;
export type { Row };
