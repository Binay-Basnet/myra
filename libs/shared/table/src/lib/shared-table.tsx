import React from 'react';
import {
  Collapse,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';

import { Pagination, TableSearch, Text } from '@coop/shared/ui';

import { TableSelectionBar } from '../components';
import { useTable } from '../hooks/useTable';
import { TableProps } from '../types/Table';
import { getCheckBoxColumn } from '../utils/getCheckBoxColumn';

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  pagination,
  isStatic = false,
  searchPlaceholder,
  size = 'default',
  getRowId,
}: TableProps<T>) => {
  const [tableSize, setTableSize] = React.useState(size);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useTable<T>({
    getRowId,

    columns: isStatic ? columns : [getCheckBoxColumn<T>(), ...columns],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,

    data,
  });

  return (
    <>
      <Collapse in={Object.keys(rowSelection).length !== 0} animateOpacity>
        <TableSelectionBar tableInstance={table} columns={columns} />
      </Collapse>
      {!isStatic && (
        <TableSearch
          placeholder={searchPlaceholder}
          pagination={pagination}
          size={tableSize}
          setSize={setTableSize}
        />
      )}
      <TableContainer overflowX="auto" overflowY="hidden" position="relative">
        <ChakraTable size={tableSize}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    isNumeric={header.column.columnDef.meta?.isNumeric}
                    width={header.column.columnDef.meta?.width}
                    px="s12"
                    py="0"
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
                <Tr
                  key={row.id}
                  _hover={{ bg: 'background.500' }}
                  bg={row.getIsSelected() ? 'primary.0' : 'white'}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        key={cell.id}
                        isNumeric={cell.column.columnDef.meta?.isNumeric}
                        width={cell.column.columnDef.meta?.width}
                        px="s12"
                        py="0"
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
