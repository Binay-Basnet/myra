import {
  AccessorFn,
  ColumnDef,
  DeepKeys,
  FilterFn,
  Row,
  RowData,
  Table,
} from '@tanstack/react-table';

import { Id_Type } from '@coop/cbs/data-access';
import { AclKey, MenuType, RouteValue } from '@coop/cbs/utils';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    isNumeric?: boolean;
    width?: number | string;
    Footer?: {
      colspan?: number;
      display?: 'none';
    };
    filterMaps?: {
      comparator?: '=' | '<' | '>' | '< >' | 'CONTAINS';
      list?:
        | ({
            label?: string | null | undefined;
            value?: unknown;
          } | null)[]
        | undefined;
    };
  }

  interface FilterFns {
    dateTime: FilterFn<unknown>;
    amount: FilterFn<unknown>;
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
export type TableSize = 'default' | 'compact' | 'small' | 'report' | 'dataGrid';
export type TableVariant = 'simple' | 'report' | 'dataGrid';

export interface TableProps<TData> {
  data: TData[];
  columns: Column<TData>[];

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
    route?: RouteValue;
    idType?: Id_Type;
    onClick?: () => void;
  }[];

  tableTitle?: string;
  showFooter?: boolean;
  isDetailPageTable?: boolean;
}

export type Column<TData> = Omit<ColumnDef<TData, unknown>, 'accessorKey' | 'accessorFn' | 'id'> & {
  id?: string;
  accessorFn?: AccessorFn<TData>;
  accessorKey?: DeepKeys<TData> | 'actions';
  columns?: Column<TData>[];
};

export type TableInstance<T> = Table<T>;
export type { Row };
