import { forwardRef, useEffect, useRef, useId } from 'react';
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
import { useTableHook } from './useTableHook';

/* eslint-disable-next-line */
interface ChakraDataProps<T> {
  rowData: T[];
}
interface ChakraColumnsProps<T> {
  Header: string;
  accessor: string;
  Cell?: (arg: T) => JSX.Element;
}
export interface ChakraTableProps<T> {
  data: ChakraDataProps<T>;
  columns: ChakraColumnsProps<T>;
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableHook({ columns, data });

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
