import React from 'react';
import {
  CellProps,
  DefaultFilterTypes,
  FilterProps,
  FilterType,
  Renderer,
} from 'react-table';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never;

export type FilterColumnProps<T extends Record<string, unknown>> =
  FilterProps<T> & {
    onClose?: () => void;
    initialFocusRef?: React.RefObject<HTMLInputElement>;
  };

export type BaseColumn<T extends Maybe<Record<string, unknown>>> = {
  Header?: string;
  accessor: DotNestedKeys<T> | 'actions';
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

export type Column<T extends Maybe<Record<string, unknown>>> = BaseColumn<T> &
  ExtraColumnProps & {
    id?: string;
    disableSortBy?: boolean;
    disableFilters?: boolean;
    filter?:
      | FilterType<NonNullable<T>>
      | DefaultFilterTypes
      | 'numberAll'
      | Omit<string, DefaultFilterTypes | 'numberAll'>;

    Filter?: Renderer<FilterColumnProps<NonNullable<T>>>;
    Cell?: Renderer<CellProps<NonNullable<T>>>;
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

export type Maybe<T> = T | null;

export type PartialNull<T> = {
  [P in keyof T]?: T[P] | null;
};

export interface BaseTableProps<T extends Record<string, unknown>> {
  data: Maybe<Array<Maybe<T>>>;
  columns: Maybe<Array<Maybe<Column<Maybe<T>>>>>;
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

export type { Cell, HeaderGroup } from 'react-table';
