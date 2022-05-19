import { useTable } from './useTable';
import {
  Box,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
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
} from './react-table-config';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

/**
 *  @description Add disableSortBy in each column to disable column sort in that column.
 *  @description Add a sortType function to override the default function in sorting.
 *  @see React table useSortBy docs for more options.
 */
export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection = true,
  sort = false,
  size = 'default',
  isStatic = false,
  // TODO ( Implement Manual Sort From API )
  manualSort = false,
  ...props
}: TableProps<T>) {
  const tableInstance = useTable({
    columns,
    data,
    hasRowSelection,
    sort,
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
                (column: HeaderGroup<T> & ExtraColumnProps) => (
                  <Th
                    {...column.getHeaderProps(
                      !isStatic ? column.getSortByToggleProps() : undefined
                    )}
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
                      <span>{column.render('Header')}</span>

                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowUpIcon
                              color="primary.500"
                              fontWeight="bold"
                              w="4"
                              h="6"
                            />
                          ) : (
                            <ArrowDownIcon
                              color="primary.500"
                              fontWeight="bold"
                              w="4"
                              h="6"
                            />
                          )
                        ) : (
                          ''
                        )}
                      </span>
                    </Box>
                  </Th>
                )
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
                      isTruncated
                      maxWidth={cell.column.maxWidth}
                      minWidth={cell.column.minWidth}
                      paddingX={cell.column.paddingX}
                      paddingY={cell.column.paddingY}
                      width={cell.column.width}
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render('Cell')}
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
