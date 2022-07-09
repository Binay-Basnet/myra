import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender, getCoreRowModel } from '@tanstack/react-table';

import { Text } from '@coop/shared/ui';

import { useTable } from '../hooks/useTable';
import { TableProps } from '../types/Table';

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) => {
  const table = useTable<T>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <TableContainer overflowX="auto" overflowY="hidden" position="relative">
      <ChakraTable width={'100%'} display="block">
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
  );
};

export default Table;
