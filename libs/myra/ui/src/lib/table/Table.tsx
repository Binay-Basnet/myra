import React from 'react';
import { BiFilter } from 'react-icons/bi';
import { Cell } from 'react-table';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Popover,
  Spinner,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Pagination } from '@coop/myra/ui';

import ListFilterPopover from './components/ListFilterPopover';
import { AmountFilterPopover } from './components/ListFilterPopover/ListFilterPopver';
import { Column, ExtraColumnProps, HeaderGroup, TableProps } from './types';
import { useTable } from './useTable';
import { PopoverContent, PopoverTrigger } from '../popover/Popover';

/**
 *  @description Add disableSortBy in each column to disable column sort in that column.
 *  @description Add a sortType function to override the default function in sorting.
 *  @see React table useSortBy docs for more options.
 */
export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection = true,
  size = 'default',
  isStatic = false,
  isLoading,
  manualSort = false,
  showFooters = false,
  pagination,
  ...props
}: TableProps<T>) {
  const tableInstance = useTable({
    columns,
    data,
    hasRowSelection,
    isStatic,
    manualSort,
    ...props,
  });

  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = tableInstance;

  if (isLoading) {
    return (
      <Flex justifyContent="center" height="300px" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (data?.length === 0) {
    return (
      <Flex justifyContent="center" height="300px" alignItems="center">
        <Text fontSize="r3" color="gray.500">
          No Data Found
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <TableContainer>
        <ChakraTable
          size={size}
          overflowX="hidden"
          width="100%"
          {...getTableProps()}
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (column: HeaderGroup<T> & ExtraColumnProps) => {
                    return (
                      <Th
                        {...column.getHeaderProps()}
                        width={column.width}
                        paddingX={column.paddingX}
                        paddingY={column.paddingY}
                        isNumeric={column.isNumeric}
                      >
                        <Box
                          display="flex"
                          gap="4px"
                          alignItems="center"
                          justifyContent={
                            column.isNumeric ? 'flex-end' : 'flex-start'
                          }
                        >
                          {isStatic ? (
                            <span>{column.render('Header')}</span>
                          ) : (
                            <span {...column.getSortByToggleProps()}>
                              {column.render('Header')}
                            </span>
                          )}

                          {column.isSorted ? (
                            <Flex
                              alignItems="center"
                              justifyContent="center"
                              {...column.getSortByToggleProps()}
                            >
                              {column.isSortedDesc ? (
                                <ArrowUpIcon
                                  color="primary.500"
                                  fontWeight="bold"
                                  w="4"
                                  h="6"
                                />
                              ) : (
                                <ArrowDownIcon
                                  w="4"
                                  h="6"
                                  color="primary.500"
                                  fontWeight="bold"
                                />
                              )}
                            </Flex>
                          ) : null}

                          {column.canFilter ? (
                            column.filterType === 'list' ? (
                              <ListFilterPopover
                                column={column}
                                uniqueOptions={
                                  column.uniqueOptionsForListFilter
                                }
                              />
                            ) : column.filterType === 'amount' ? (
                              <AmountFilterPopover column={column} />
                            ) : (
                              <Popover
                                isLazy
                                placement="bottom-end"
                                initialFocusRef={initialFocusRef}
                                colorScheme="primary"
                              >
                                {({ onClose }) => (
                                  <>
                                    <PopoverTrigger>
                                      <Flex
                                        alignItems="center"
                                        justifyContent="center"
                                        cursor="pointer"
                                      >
                                        {column.filterValue ? (
                                          <Icon as={BiFilter} />
                                        ) : (
                                          <Icon
                                            as={BiFilter}
                                            w="4"
                                            h="6"
                                            fontWeight="bold"
                                          />
                                        )}
                                      </Flex>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      _focus={{ boxShadow: 'E2' }}
                                    >
                                      {column.render('Filter', {
                                        onClose,
                                        initialFocusRef,
                                      })}
                                    </PopoverContent>
                                  </>
                                )}
                              </Popover>
                            )
                          ) : null}
                        </Box>
                      </Th>
                    );
                  }
                )}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {/*// TODO ( WILL CHANGE THIS ANY LATER )*/}
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr
                  _hover={{ background: '#EEF2F7' }}
                  bg={row.isSelected ? 'primary.0' : 'white'}
                  {...row.getRowProps()}
                >
                  {row.cells.map(
                    (
                      cell: Cell<T> & {
                        column: ExtraColumnProps;
                      }
                    ) => (
                      <Td
                        maxWidth={cell.column.maxWidth}
                        minWidth={cell.column.minWidth}
                        paddingX={cell.column.paddingX}
                        paddingY={cell.column.paddingY}
                        width={cell.column.width}
                        isNumeric={cell.column.isNumeric}
                        {...cell.getCellProps()}
                      >
                        <Text as="div" noOfLines={1}>
                          {cell.render('Cell')}
                        </Text>
                      </Td>
                    )
                  )}
                </Tr>
              );
            })}
          </Tbody>

          {showFooters ? (
            <Tfoot>
              {footerGroups.map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map(
                    (column: HeaderGroup<T> & ExtraColumnProps) => (
                      <Th
                        maxWidth={column.maxWidth}
                        minWidth={column.minWidth}
                        paddingX={column.paddingX}
                        paddingY={column.paddingY}
                        width={column.width}
                        isNumeric={column.isNumeric}
                        {...column.getFooterProps()}
                      >
                        {column.render('Footer')}
                      </Th>
                    )
                  )}
                </Tr>
              ))}
            </Tfoot>
          ) : null}
        </ChakraTable>
      </TableContainer>
      {pagination && (
        <Pagination
          total={pagination.total}
          startCursor={pagination.startCursor}
          endCursor={pagination.endCursor}
          pageSizeOptions={[10, 50, 100]}
        />
      )}
    </>
  );
}

export default Table;
export type { Column, HeaderGroup };
