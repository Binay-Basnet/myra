/* eslint-disable-next-line */

import { useTable } from './useTable';
import {
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

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  hasRowSelection = true,
  size = 'default',
  ...props
}: TableProps<T>) {
  const tableInstance = useTable({ columns, data, hasRowSelection, ...props });

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
                    width={column.width}
                    {...column.getHeaderProps()}
                    isNumeric={column.isNumeric}
                  >
                    {column.render('Header')}
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
                      width={cell.column.width}
                      /*  isTruncated*/
                      /*  paddingX={cell.column.paddingX}
                        paddingY={cell.column.paddingY ?? '24px'}

                        letterSpacing="wide"
                        color="gray.700"
                        fontSize="sm"
                        fontWeight="light"*/
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
