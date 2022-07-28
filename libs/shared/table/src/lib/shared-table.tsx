import React from 'react';
import {
  Box,
  Collapse,
  Flex,
  Spinner,
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
import { Column, TableProps } from '../types/Table';

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  pagination,
  isStatic = false,
  searchPlaceholder,
  size = 'default',
  isLoading,
  getRowId,
}: TableProps<T>) => {
  const [tableSize, setTableSize] = React.useState(size);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useTable<T>({
    columns,
    data,
    isStatic,

    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getRowId,
  });

  return (
    <>
      <Collapse in={Object.keys(rowSelection).length !== 0} animateOpacity>
        <TableSelectionBar
          tableInstance={table}
          columns={columns as Column<T>[]}
        />
      </Collapse>
      {!isStatic && (
        <TableSearch
          placeholder={searchPlaceholder}
          pagination={pagination}
          size={tableSize}
          setSize={setTableSize}
        />
      )}

      <TableContainer
        overflowX="auto"
        overflowY="hidden"
        minH={isLoading || !data || data.length === 0 ? '400px' : 'auto'}
        position="relative"
      >
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
          <Tbody position="relative">
            {isLoading ? (
              <Box
                position="absolute"
                width="100%"
                height="100%"
                zIndex={10}
                bg="#ffffff99"
                display="flex"
                justifyContent="center"
                pt="100px"
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="primary.500"
                  size="xl"
                />
              </Box>
            ) : (
              !data ||
              (data?.length === 0 && (
                <Box
                  position="absolute"
                  width="100%"
                  height="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Flex
                    justifyContent="center"
                    height="250px"
                    alignItems="center"
                  >
                    <Text fontSize="r3" color="gray.500">
                      No Data Found
                    </Text>
                  </Flex>
                </Box>
              ))
            )}
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
