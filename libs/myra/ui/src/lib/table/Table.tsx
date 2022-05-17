import { Cell, Column, HeaderGroup, TableOptions, useTable } from './useTable';
import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

interface ExtraColumnProps {
  isNumeric?: boolean;
  paddingX?: string | number | number[];
  paddingY?: string | number | number[];
}

export interface TableProps<T extends Record<string, unknown>>
  extends TableOptions<T> {
  columns: ReadonlyArray<
    Column<T> & ExtraColumnProps & Record<string, unknown>
  >;
  name?: string;
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  ...props
}: TableProps<T>) {
  const tableInstance = useTable<T>({
    ...props,
    data,
    columns,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer>
      <ChakraTable
        bg="white"
        variant="simple"
        colorScheme="blackAlpha"
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(
                (column: HeaderGroup<T> & ExtraColumnProps) => (
                  <Th
                    paddingX={column.paddingX}
                    width={column.width}
                    color="gray.900"
                    fontSize="sm"
                    letterSpacing="normal"
                    fontWeight="semibold"
                    paddingY={column.paddingY ?? '18px'}
                    textTransform="capitalize"
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
              <Tr {...row.getRowProps()}>
                {row.cells.map(
                  (
                    cell: Cell<T> & {
                      column: ExtraColumnProps;
                    }
                  ) => (
                    <Td
                      isTruncated
                      paddingX={cell.column.paddingX}
                      paddingY={cell.column.paddingY ?? '24px'}
                      maxWidth={cell.column.maxWidth}
                      minWidth={cell.column.minWidth}
                      width={cell.column.width}
                      letterSpacing="wide"
                      color="gray.700"
                      fontSize="sm"
                      fontWeight="light"
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
