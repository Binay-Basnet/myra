import { forwardRef, RefObject, useEffect, useId, useRef } from 'react';
import { Column, useRowSelect, useSortBy, useTable } from 'react-table';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChakraTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column[];
  Cell?: (arg: T) => JSX.Element;
}

interface IIndeterminateInputProps {
  indeterminate?: boolean;
  name: string;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref || defaultRef) as RefObject<HTMLInputElement>;

  useEffect(() => {
    if (defaultRef?.current?.indeterminate) {
      defaultRef.current.indeterminate! = indeterminate!;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default function TableComponent<T extends Record<string, unknown>>(
  props: ChakraTableProps<T>
) {
  const id = useId();
  const { data, columns } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // selectedFlatRows,
  } = useTable({ columns, data }, useSortBy, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((column) => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }: any) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }: any) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...column,
    ]);
  });
  return (
    <TableContainer
      style={{
        width: '100%',
        height: 'auto',
      }}
    >
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={id}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  // {...column.getHeaderProps(column.getSortByToggleProps())}
                  {...column.getHeaderProps([
                    {
                      style: {
                        backgroundColor: '#ffffff',
                        color: '#343C46',
                        fontWeight: 'bold',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                      },
                    },
                  ])}
                  key={id}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  {/* <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span> */}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={id}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps([
                      {
                        style: {
                          background: '#FFFFFF',
                          color: '#1D2530',
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          fontSize: 13,
                        },
                      },
                    ])}
                    key={id}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
