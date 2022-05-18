/* eslint-disable-next-line */

import { Column, HeaderGroup, useRowSelect, useTable } from './useTable';
import {
  Checkbox,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { forwardRef, RefObject, useEffect, useRef } from 'react';
import { Cell, CellProps, HeaderProps, Hooks } from 'react-table';

interface IIndeterminateInputProps {
  indeterminate?: boolean;
  checked?: boolean;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, checked, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref || defaultRef) as RefObject<HTMLInputElement>;

  useEffect(() => {
    if (defaultRef?.current?.indeterminate) {
      defaultRef.current.indeterminate = indeterminate ?? false;
    }
  }, [resolvedRef, checked]);

  return (
    <Checkbox
      colorScheme="primary"
      isIndeterminate={indeterminate}
      isChecked={checked}
      {...rest}
    />
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

interface ExtraColumnProps {
  isNumeric?: boolean;
  paddingX?: string | number | number[];
  paddingY?: string | number | number[];
  imgSrc?: string;
}

export interface TableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Array<Column<T> & ExtraColumnProps>;
  name?: string;
}

function selectionHook<T extends Record<string, unknown>>(hooks: Hooks<T>) {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: '_selector',
      minWidth: 45,
      width: 45,
      maxWidth: 45,

      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<T>) => (
        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      Cell: ({ row }: CellProps<T>) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    ...columns,
  ]);
}

const hooks = [useRowSelect, selectionHook];

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  ...props
}: TableProps<T>) {
  const tableInstance = useTable<T>(
    {
      ...props,
      data,
      columns,
    },
    ...hooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <TableContainer>
      <ChakraTable bg="white" size="sm" {...getTableProps()}>
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
