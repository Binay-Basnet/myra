import {
  CellProps,
  DefaultFilterTypes,
  FilterProps,
  FilterType,
  Renderer,
} from 'react-table';
import React from 'react';

export type FilterColumnProps<T extends Record<string, unknown>> =
  FilterProps<T> & {
    onClose?: () => void;
    initialFocusRef?: React.RefObject<HTMLInputElement>;
  };

export type BaseColumn<T extends Record<string, unknown>> =
  | {
      Header: string;
      accessor: keyof T;
    }
  | {
      Header?: never | undefined;
      accessor: 'actions';
    };

export type ExtraColumnProps = Partial<{
  width: number | string;
  maxWidth: number;
  isNumeric: boolean;
  paddingX: string | number | number[];
  paddingY: string | number | number[];
  imgSrc: string;

  filterType?: 'list' | 'amount';
  uniqueOptionsForListFilter?: string[];
}>;

export type Column<T extends Record<string, unknown>> = BaseColumn<T> &
  ExtraColumnProps & {
    disableSortBy?: boolean;
    disableFilters?: boolean;
    filter?: FilterType<T> | DefaultFilterTypes | string | 'numberAll';

    Filter?: Renderer<FilterColumnProps<T>>;
    Cell?: Renderer<CellProps<T>>;
  };

export type FilterTableProps =
  | {
      filter: true;
      disableFilterAll?: boolean;
    }
  | {
      filter?: false;
      disableFilterAll?: never;
    };

export type SortTableProps =
  | {
      sort: true;
      disableSortAll?: boolean;
    }
  | {
      sort?: false;
      disableSortAll?: never;
    };

export interface BaseTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  size?: 'default' | 'compact';
  hasRowSelection?: boolean;

  isLoading?: boolean;
  name?: string;
  manualSort?: boolean;
  isStatic?: boolean;
}

export type TableProps<T extends Record<string, unknown>> = BaseTableProps<T> &
  SortTableProps &
  FilterTableProps;

export { Cell, HeaderGroup } from 'react-table';
