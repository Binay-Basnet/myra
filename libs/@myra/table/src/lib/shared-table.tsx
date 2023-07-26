import React, { useEffect } from 'react';
import { Collapse } from '@chakra-ui/react';
import { rankItem } from '@tanstack/match-sorter-utils';
import { ExpandedState, FilterFn, getPaginationRowModel } from '@tanstack/react-table';

import { Pagination } from '@myra-ui/components';

import { DEFAULT_PAGE_SIZE } from '@coop/shared/utils';

import {
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableContainer,
  TableEmptyState,
  TableFooter,
  TableHeadCell,
  TableHeader,
  TableHeadRow,
  TableLoader,
  TableRoot,
} from './Table-v2/TableComponents';
// eslint-disable-next-line import/no-cycle
import { TableSearch, TableSelectionBar } from '../components';
// eslint-disable-next-line import/no-cycle
import { useTable } from '../hooks/useTable';
import { Column, TableProps } from '../types/Table';

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const TableWithoutRef = <T,>(
  props: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) => {
  const {
    columns,
    data,
    pagination,
    isStatic = false,
    searchPlaceholder,
    size = 'default',
    isLoading,
    noDataTitle,
    getRowId,
    variant = 'simple',
    showFooter,
    rowOnClick,
    enableSorting,
    manualSorting = true,
    getSubRows,
    tableTitle,
    menu,
    forms,
    isDetailPageTable,
    allowSelection,
    onRowSelect,
    allowSearch,
    tablePagination,
    enableAllFilters = true,
    freezeFirstColumn,
  } = props;

  const [expanded, setExpanded] = React.useState<ExpandedState>({ '0': true });

  const [tableSize, setTableSize] = React.useState(size);
  const [rowSelection, setRowSelection] = React.useState({});

  const [globalFilter, setGlobalFilter] = React.useState('');

  useEffect(() => {
    onRowSelect && onRowSelect(Object.keys(rowSelection));
  }, [rowSelection]);

  useEffect(() => {
    setRowSelection([]);
  }, [data]);

  const table = useTable<T>(
    tablePagination
      ? {
          columns,
          data,
          isStatic,
          allowSelection,

          state: {
            rowSelection,
            expanded,
            globalFilter,
          },

          globalFilterFn: fuzzyFilter,

          onGlobalFilterChange: setGlobalFilter,

          onExpandedChange: setExpanded,
          onRowSelectionChange: setRowSelection,
          getRowId,

          filterFns: {
            dateTime: () => true,
            amount: () => true,
          },

          enableSorting,
          manualSorting,
          enableGlobalFilter: enableAllFilters,

          getSubRows,

          getPaginationRowModel: getPaginationRowModel(),

          initialState: {
            pagination: { pageSize: DEFAULT_PAGE_SIZE },
          },
        }
      : {
          columns,
          data,
          isStatic,
          allowSelection,

          state: {
            rowSelection,
            expanded,
          },

          onExpandedChange: setExpanded,
          onRowSelectionChange: setRowSelection,
          getRowId,

          filterFns: {
            dateTime: () => true,
            amount: () => true,
          },
          manualFiltering: true,

          enableSorting,
          manualSorting,
          getSubRows,

          manualPagination: true,
        }
  );

  return (
    <>
      {!isStatic && (
        <Collapse in={Object.keys(rowSelection).length !== 0} animateOpacity>
          <TableSelectionBar tableInstance={table} columns={columns as Column<T>[]} />
        </Collapse>
      )}
      {(!isStatic || allowSearch) && (
        <TableSearch
          placeholder={searchPlaceholder}
          pagination={pagination}
          size={tableSize}
          setSize={setTableSize}
          isStatic={isStatic}
          table={table}
          tablePagination={!!tablePagination}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      )}

      <TableContainer data={data} variant={variant}>
        <TableRoot ref={ref} size={tableSize} variant={variant} name={tableTitle}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeadRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeadCell
                    freezeFirstColumn={freezeFirstColumn}
                    variant={variant}
                    header={header}
                    isDetailPageTable={isDetailPageTable}
                  />
                ))}
              </TableHeadRow>
            ))}
          </TableHeader>
          <TableBody isLoading={isLoading} data={data}>
            <TableLoader isLoading={isLoading} />
            <TableEmptyState
              isLoading={isLoading}
              data={data}
              menu={menu}
              forms={forms}
              noDataTitle={noDataTitle}
            />

            {table.getRowModel().rows.map((row) => (
              <TableBodyRow isStatic={isStatic} row={row} rowOnClick={rowOnClick}>
                {row.getVisibleCells().map((cell) => (
                  <TableBodyCell freezeFirstColumn={freezeFirstColumn} cell={cell} />
                ))}
              </TableBodyRow>
            ))}
          </TableBody>

          <TableFooter table={table} showFooter={showFooter} />
        </TableRoot>

        {(pagination || tablePagination) && data && data?.length !== 0 && (
          <Pagination
            table={table}
            total={tablePagination ? data?.length : Number(pagination?.total)}
            pageInfo={pagination?.pageInfo}
            pageSizeOptions={[100, 300, 500, 1000]}
            tablePagination={tablePagination}
          />
        )}
      </TableContainer>
    </>
  );
};

export const Table = React.forwardRef(TableWithoutRef) as <T>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => ReturnType<typeof TableWithoutRef>;

export default Table;
