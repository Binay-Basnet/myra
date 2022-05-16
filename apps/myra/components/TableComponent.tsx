import { forwardRef, useEffect, useRef, useId } from 'react';
import { useTable, useSortBy, useRowSelect } from 'react-table';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  // Checkbox,
  // chakra,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChakraTableProps<T> {
  data: T[];
  columns: T[];
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
  const defaultRef = useRef<HTMLInputElement | null>(null);
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

IndeterminateCheckbox.displayName = 'IndeterminateCheckbox';

export default function TableComponent<T>(props: ChakraTableProps<T>) {
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
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
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
            <Tr key={id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  key={id}
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr key={id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    key={id}
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
