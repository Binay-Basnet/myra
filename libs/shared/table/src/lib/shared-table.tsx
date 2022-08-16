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
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender } from '@tanstack/react-table';

import { NoDataState, Pagination, TableSearch, Text } from '@coop/shared/ui';

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
  noDataTitle,
  getRowId,
  variant = 'simple',
  showFooter,
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
    <TableContainer
      overflowX="auto"
      minH={isLoading || !data || data.length === 0 ? '400px' : '400px'}
      position="relative"
    >
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

      <ChakraTable size={tableSize} variant={variant}>
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
                  height="300px"
                  alignItems="center"
                >
                  <NoDataState title={noDataTitle} />
                </Flex>
              </Box>
            ))
          )}
          {table.getRowModel().rows.map((row) => {
            return (
              <Tr
                key={row.id}
                _hover={isStatic ? {} : { bg: 'background.500' }}
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

        {showFooter && (
          <Tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <Tr key={footerGroup.id}>
                {footerGroup.headers.map((footer) =>
                  footer.column.columnDef.meta?.Footer?.display ===
                  'none' ? null : (
                    <Th
                      key={footer.id}
                      isNumeric={footer.column.columnDef.meta?.isNumeric}
                      width={footer.column.columnDef.meta?.width}
                      colSpan={footer.column.columnDef.meta?.Footer?.colspan}
                    >
                      {footer.isPlaceholder
                        ? null
                        : flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                    </Th>
                  )
                )}
              </Tr>
            ))}
          </Tfoot>
        )}
      </ChakraTable>

      {pagination && data && data?.length !== 0 && (
        <Pagination
          total={pagination.total}
          startCursor={pagination.startCursor}
          endCursor={pagination.endCursor}
          pageSizeOptions={[10, 50, 100]}
        />
      )}
    </TableContainer>
  );
};

export default Table;
