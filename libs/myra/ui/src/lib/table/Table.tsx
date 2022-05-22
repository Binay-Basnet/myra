import { useTable } from './useTable';
import {
  Box,
  Flex,
  Icon,
  Popover,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  Cell,
  Column,
  ExtraColumnProps,
  HeaderGroup,
  TableProps,
} from './types';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';
import { BsFilter } from 'react-icons/all';
import { PopoverContent, PopoverTrigger } from '../popover/Popover';
import React from 'react';

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

  // TODO ( Implement Manual Sort From API )
  manualSort = false,
  ...props
}: TableProps<T>) {
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  const tableInstance = useTable({
    columns,
    data,
    hasRowSelection,
    isStatic,
    manualSort,
    ...props,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer>
      <ChakraTable size={size} {...getTableProps()}>
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
                        <span {...column.getSortByToggleProps()}>
                          {column.render('Header')}
                        </span>

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
                                    {' '}
                                    {column.filterValue ? (
                                      <Icon as={BsFilter} />
                                    ) : (
                                      <Icon
                                        as={BsFilter}
                                        w="4"
                                        h="6"
                                        fontWeight="bold"
                                      />
                                    )}
                                  </Flex>
                                </PopoverTrigger>
                                <PopoverContent _focus={{ boxShadow: 'E2' }}>
                                  {column.render('Filter', {
                                    onClose,
                                    initialFocusRef,
                                  })}
                                </PopoverContent>
                              </>
                            )}
                          </Popover>
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
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      <Text noOfLines={0}>{cell.render('Cell')}</Text>
                    </Td>
                  )
                )}
              </Tr>
            );
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
}

export default Table;
export type { Column };
