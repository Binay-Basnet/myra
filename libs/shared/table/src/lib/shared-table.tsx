import React, { HTMLProps, RefObject, useEffect } from 'react';
import {
  Checkbox,
  CheckboxProps,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender, Row } from '@tanstack/react-table';
import { uniqBy } from 'lodash';

import { Pagination, Text } from '@coop/shared/ui';

import { useTable } from '../hooks/useTable';
import { TableProps } from '../types/Table';

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  pagination,
}: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = React.useState<Row<T>[]>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const rowIds = React.useMemo(() => Object.keys(rowSelection), [rowSelection]);

  const table = useTable<T>({
    columns: [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
        meta: {
          width: '20px',
        },
      },
      ...columns,
    ],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,

    data,
  });

  useEffect(() => {
    const currentPageRowIds = Object.keys(table.getRowModel().rowsById);

    if (currentPageRowIds.some((id) => rowIds.includes(id))) {
      setSelectedRows((prev) =>
        uniqBy([...prev, ...table.getSelectedRowModel().rows], 'id')
      );
    } else {
      setSelectedRows((prev) => prev.filter((row) => rowIds.includes(row.id)));
    }
  }, [rowIds, table]);

  return (
    <>
      <TableContainer overflowX="auto" overflowY="hidden" position="relative">
        <ChakraTable size="default">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    isNumeric={header.column.columnDef.meta?.isNumeric}
                    width={header.column.columnDef.meta?.width}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id} _hover={{ bg: 'background.500' }}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        isNumeric={cell.column.columnDef.meta?.isNumeric}
                        width={cell.column.columnDef.meta?.width}
                      >
                        <Text
                          as="div"
                          textOverflow="ellipsis"
                          overflow="hidden"
                          width={cell.column.columnDef.meta?.width}
                          whiteSpace="nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Text>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </ChakraTable>
      </TableContainer>
      {pagination && data && data?.length !== 0 && (
        <Pagination
          total={pagination.total}
          startCursor={pagination.startCursor}
          endCursor={pagination.endCursor}
          pageSizeOptions={[10, 50, 100]}
        />
      )}
    </>
  );
};

export default Table;

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  checked,
  ...rest
}: { indeterminate?: boolean } & CheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref?.current?.indeterminate) {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate, checked]);

  return (
    <Checkbox
      colorScheme="primary"
      isChecked={checked}
      isIndeterminate={indeterminate}
      {...rest}
    />
  );
}
