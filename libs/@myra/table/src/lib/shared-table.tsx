import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Collapse,
  Flex,
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { flexRender, SortingState } from '@tanstack/react-table';
import qs from 'qs';

import { Loader, Modal, Pagination } from '@myra-ui/components';
import { Text } from '@myra-ui/foundations';
import { NoDataState, WIPState } from '@myra-ui/templates';

// eslint-disable-next-line import/no-cycle
import { TableSearch, TableSelectionBar } from '../components';
// eslint-disable-next-line import/no-cycle
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
  rowOnClick,
  enableSorting,
  manualSorting = true,
  onChange,
}: TableProps<T>) => {
  const router = useRouter();
  const sortQuery = router?.query['sort'] as string;

  const [tableSize, setTableSize] = React.useState(size);
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const table = useTable<T>({
    columns,
    data,
    isStatic,

    state: {
      sorting,
      rowSelection,
    },

    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getRowId,
    enableSorting,
    manualSorting,
  });

  useEffect(() => {
    if (sortQuery) {
      setSorting([
        {
          id: qs.parse(sortQuery)['column'] as string,
          desc: qs.parse(sortQuery)['arrange'] === 'desc',
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <Collapse in={Object.keys(rowSelection).length !== 0} animateOpacity>
        <TableSelectionBar tableInstance={table} columns={columns as Column<T>[]} />
      </Collapse>
      {!isStatic && (
        <>
          <TableSearch
            placeholder={searchPlaceholder}
            pagination={pagination}
            size={tableSize}
            setSize={setTableSize}
            // onClick={() => setIsModalOpen(true)}
            onChange={onChange}
          />
          <Modal open={isModalOpen} onClose={handleModalClose} isCentered width="3xl">
            <WIPState />
          </Modal>
        </>
      )}

      <TableContainer
        minH={isLoading || !data || data.length === 0 ? '400px' : 'auto'}
        {...(variant === 'report'
          ? { borderRadius: 'br1', border: '0px', borderColor: 'border.element' }
          : {})}
      >
        <ChakraTable
          size={tableSize}
          variant={variant}
          {...(variant === 'report'
            ? {
                border: '0',
                borderRadius: 'br1',

                borderColor: 'border.element',
              }
            : {})}
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    isNumeric={header.column.columnDef.meta?.isNumeric}
                    width={header.column.columnDef.meta?.width}
                    textAlign={header.column.columns.length !== 0 ? 'center' : 'left'}
                    px="s12"
                    py="0"
                    bg={isStatic ? 'highlight.500' : ''}
                  >
                    {header.isPlaceholder ? null : (
                      <Box
                        cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                        {...{
                          onClick: (e) => {
                            const toggleSort = header.column.getToggleSortingHandler();

                            if (toggleSort && header.column.getCanSort()) {
                              toggleSort(e);
                              if (header.column.getNextSortingOrder()) {
                                router.push(
                                  {
                                    query: {
                                      ...router.query,
                                      sort: qs.stringify({
                                        column: header.column.id,
                                        arrange: header.column.getNextSortingOrder(),
                                      }),
                                    },
                                  },
                                  undefined,
                                  { shallow: true }
                                );
                              } else {
                                delete router.query['sort'];
                                router.push(router, undefined, { shallow: true });
                              }
                            }
                          },
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort()
                          ? {
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null
                          : null}
                      </Box>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody position={isLoading || !data || data?.length === 0 ? 'relative' : 'static'}>
            {isLoading ? (
              <Box as="tr">
                <Box
                  position="absolute"
                  width="100%"
                  height="100%"
                  as="td"
                  zIndex={10}
                  bg="#ffffff99"
                  display="flex"
                  justifyContent="center"
                  pt="100px"
                >
                  <Loader />
                </Box>
              </Box>
            ) : (
              !data ||
              (data?.length === 0 && (
                <Box
                  position="absolute"
                  width="100%"
                  as="tr"
                  height="100%"
                  display="flex"
                  justifyContent="center"
                >
                  <Flex as="td" justifyContent="center" height="300px" alignItems="center">
                    <NoDataState title={noDataTitle} />
                  </Flex>
                </Box>
              ))
            )}
            {table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                _hover={isStatic ? {} : { bg: 'highlight.500' }}
                bg={row.getIsSelected() ? 'primary.0' : 'white'}
                cursor={rowOnClick ? 'pointer' : 'default'}
                onClick={(e) => {
                  rowOnClick && rowOnClick(row.original);
                  e.stopPropagation();
                }}
              >
                {row.getVisibleCells().map((cell) => (
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
                      color="gray.800"
                      whiteSpace="nowrap"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Text>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>

          {showFooter && (
            <Tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) =>
                    footer.column.columnDef.meta?.Footer?.display === 'none' ? null : (
                      <Th
                        key={footer.id}
                        isNumeric={footer.column.columnDef.meta?.isNumeric}
                        width={footer.column.columnDef.meta?.width}
                        colSpan={footer.column.columnDef.meta?.Footer?.colspan}
                      >
                        {footer.isPlaceholder
                          ? null
                          : flexRender(footer.column.columnDef.footer, footer.getContext())}
                      </Th>
                    )
                  )}
                </Tr>
              ))}
            </Tfoot>
          )}
        </ChakraTable>
      </TableContainer>

      {pagination && data && data?.length !== 0 && (
        <Pagination
          total={pagination.total}
          pageInfo={pagination.pageInfo}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      )}
    </>
  );
};

export default Table;
