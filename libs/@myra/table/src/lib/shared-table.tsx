import React from 'react';
import { Collapse } from '@chakra-ui/react';
import { ExpandedState } from '@tanstack/react-table';

import { Pagination } from '@myra-ui/components';

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
  } = props;

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [tableSize, setTableSize] = React.useState(size);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useTable<T>({
    columns,
    data,
    isStatic,

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
  });

  return (
    <>
      <Collapse in={Object.keys(rowSelection).length !== 0} animateOpacity>
        <TableSelectionBar tableInstance={table} columns={columns as Column<T>[]} />
      </Collapse>
      {!isStatic && (
        <TableSearch
          placeholder={searchPlaceholder}
          pagination={pagination}
          size={tableSize}
          setSize={setTableSize}
        />
      )}

      <TableContainer variant={variant}>
        <TableRoot ref={ref} size={tableSize} variant={variant} name={tableTitle}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableHeadRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeadCell
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
                  <TableBodyCell cell={cell} />
                ))}
              </TableBodyRow>
            ))}
          </TableBody>

          <TableFooter table={table} showFooter={showFooter} />
        </TableRoot>
        {pagination && data && data?.length !== 0 && (
          <Pagination
            total={pagination.total}
            pageInfo={pagination.pageInfo}
            pageSizeOptions={[100, 300, 500, 1000]}
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
