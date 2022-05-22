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

export type BaseColumn<T extends Record<string, unknown>> = {
  Header: string;
  accessor: keyof T;
};

export type ExtraColumnProps = {
  width?: number | string;
  maxWidth?: number;
  isNumeric?: boolean;
  paddingX?: string | number | number[];
  paddingY?: string | number | number[];
  imgSrc?: string;
};

export type Column<T extends Record<string, unknown>> = BaseColumn<T> &
  ExtraColumnProps & {
    disableSortBy?: boolean;
    disableFilters?: boolean;
    filter?: FilterType<T> | DefaultFilterTypes | string;

    Filter?: Renderer<FilterColumnProps<T>>;
    Cell?: Renderer<CellProps<T>>;
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

  name?: string;
  manualSort?: boolean;
  isStatic?: boolean;
}

export type TableProps<T extends Record<string, unknown>> = BaseTableProps<T> &
  SortTableProps;

export { Cell, HeaderGroup } from 'react-table';
