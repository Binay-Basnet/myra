/* ===================================== */
/* ====== WIP New Table v2 ============= */
/* ===================================== */

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import * as ChakraTable from '@chakra-ui/table';
import { Cell, flexRender, Header, Row, Table } from '@tanstack/react-table';

import { EmptyState, Loader, NoDataState } from '@myra-ui';

import { Id_Type } from '@coop/cbs/data-access';
import { AclKey, EMPTYSTATE, MenuType, RouteValue } from '@coop/cbs/utils';

import { TableDateFilter } from '../../components/table-date-filter/TableDateFilter';
import TableListFilter from '../../components/table-list-filter/TableListFilter';
import { Maybe } from '../../types';
import { TableSize, TableVariant } from '../../types/Table';

export interface TableContainerProps {
  children: React.ReactNode;
  isLoading?: boolean;
  data: Maybe<Record<string, unknown>>[];
  variant: TableVariant;
}

export const TableContainer = ({ children, isLoading, data, variant }: TableContainerProps) => (
  <ChakraTable.TableContainer
    minH={isLoading || !data || data.length === 0 ? '400px' : 'auto'}
    sx={
      variant === 'report'
        ? {
            maxH: '420px',
            overflowY: 'auto',
            border: '1px',
            borderColor: 'border.layout',
            borderRadius: 'br2',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '@media print': {
              w: '100%',
              h: '100%',
              display: 'block',
              maxH: 'none',
              overflow: 'visible',
              borderRadius: '0',
            },
          }
        : {}
    }
  >
    {children}
  </ChakraTable.TableContainer>
);

/* ===================================== */
/* =========== Table Root ============== */
/* ===================================== */

export interface TableRootProps extends ChakraTable.TableProps {
  size: TableSize;
  variant: TableVariant;
  name?: string;
}

export const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ size, variant, name, ...props }, ref) => (
    <ChakraTable.Table
      sx={{
        pageBreakInside: 'auto',
      }}
      size={size}
      variant={variant}
      data-table-title={name}
      ref={ref}
      {...props}
    />
  )
);

/* ===================================== */
/* =========== Table Head ============== */
/* ===================================== */

export interface TableHeaderProps extends ChakraTable.TableHeadProps {
  children: React.ReactNode;
}

export const TableHeader = (props: TableHeaderProps) => (
  <ChakraTable.Thead display="table-header-group" {...props} />
);

/* ===================================== */
/* =========== Table Head Row ============== */
/* ===================================== */

export interface TableHeadRowProps extends ChakraTable.TableRowProps {
  children: React.ReactNode;
}

export const TableHeadRow = (props: TableHeadRowProps) => (
  <ChakraTable.Tr
    sx={{
      pageBreakBefore: 'always',
      pageBreakInside: 'auto !important',
      pageBreakAfter: 'auto !important',
    }}
    {...props}
  />
);

/* ===================================== */
/* =========== Table Head Row ============== */
/* ===================================== */

export interface TableHeadCellProps<T extends Record<string, unknown>>
  extends ChakraTable.TableCellProps {
  children?: React.ReactNode;
  isDetailPageTable?: boolean;
  header: Header<T, unknown>;
  variant: TableVariant;
}

export const TableHeadCell = <T extends Record<string, unknown>>({
  isDetailPageTable,
  header,
  children,
  variant,
  ...props
}: TableHeadCellProps<T>) => (
  <ChakraTable.Th
    sx={{
      pageBreakInside: 'auto !important',
      pageBreakAfter: 'auto !important',
    }}
    bg={isDetailPageTable ? 'highlight.500' : 'gray.0'}
    key={header.id}
    colSpan={header.colSpan}
    isNumeric={header.column.columnDef.meta?.isNumeric}
    minW={header.column.columnDef.meta?.width}
    w={header.column.columnDef.meta?.width}
    textAlign={header.column.columns.length !== 0 ? 'center' : 'left'}
    position={variant === 'report' ? 'sticky' : 'unset'}
    top={(header.depth - 1) * 35}
    zIndex={1}
    {...props}
  >
    <Box display="flex" gap="s8" alignItems="center">
      {header.isPlaceholder ? null : (
        <Box display="inline">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Box>
      )}
      {header.column.getCanFilter() ? (
        header.column.columnDef.filterFn === 'dateTime' ? (
          <TableDateFilter column={header.column.id} />
        ) : (
          <TableListFilter
            column={header.column.id}
            data={header.column.columnDef.meta?.filterMaps?.list}
          />
        )
      ) : null}
    </Box>

    {children}
  </ChakraTable.Th>
);

/* ===================================== */
/* =========== Table Head Row ============== */
/* ===================================== */

export interface TableBodyProps extends ChakraTable.TableBodyProps {
  isLoading?: boolean;
  data: Maybe<Record<string, unknown>>[];
}

export const TableBody = ({ isLoading, data, ...props }: TableBodyProps) => (
  <ChakraTable.Tbody
    sx={{
      pageBreakInside: 'auto !important',
      pageBreakAfter: 'auto !important',
    }}
    h={isLoading || !data || data.length === 0 ? '400px' : 'auto'}
    position={isLoading || !data || data?.length === 0 ? 'relative' : 'static'}
    {...props}
  />
);

export interface TableLoaderProps {
  isLoading?: boolean;
}

export const TableLoader = ({ isLoading }: TableLoaderProps) => {
  if (isLoading) {
    return (
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
    );
  }
  return null;
};

export interface TableEmptyStateProps {
  data: Maybe<Record<string, unknown>>[];
  menu?: MenuType;
  forms?: {
    label: string;
    aclKey: AclKey;
    route: RouteValue;
    idType?: Id_Type;
  }[];
  noDataTitle?: string;
}

export const TableEmptyState = ({ menu, forms, data, noDataTitle }: TableEmptyStateProps) => {
  const emptyStateData = EMPTYSTATE[menu as keyof typeof EMPTYSTATE];

  const sidebarForms = forms || EMPTYSTATE[menu as keyof typeof EMPTYSTATE]?.buttonLink;

  if (!data || data?.length === 0) {
    return (
      <Box
        position="absolute"
        width="70vw"
        as="tr"
        height="100vh"
        display="flex"
        justifyContent="center"
      >
        <Flex as="td" justifyContent="center" height="300px" alignItems="center">
          {menu ? (
            <EmptyState
              menuIcon={emptyStateData?.icon}
              menu={emptyStateData?.title}
              forms={sidebarForms}
              docLink={emptyStateData.docLink}
            />
          ) : (
            <NoDataState title={noDataTitle} />
          )}
        </Flex>
      </Box>
    );
  }
  return null;
};

export interface TableBodyRowProps<T extends Record<string, unknown>>
  extends ChakraTable.TableRowProps {
  row: Row<T>;
  isStatic: boolean;
  rowOnClick?: (row: T) => void;
}

export const TableBodyRow = <T extends Record<string, unknown>>({
  row,
  isStatic,
  rowOnClick,
  ...props
}: TableBodyRowProps<T>) => (
  <ChakraTable.Tr
    key={row.id}
    sx={{
      pageBreakInside: 'avoid',
      pageBreakAfter: 'auto',
    }}
    _hover={isStatic ? {} : { bg: 'highlight.500' }}
    bg={row.getIsSelected() ? 'primary.0' : 'white'}
    cursor={rowOnClick ? 'pointer' : 'default'}
    onClick={(e) => {
      rowOnClick && rowOnClick(row.original);
      e.stopPropagation();
    }}
    {...props}
  />
);

export interface TableBodyCellProps<T extends Record<string, unknown>>
  extends ChakraTable.TableCellProps {
  cell: Cell<T, unknown>;
}

export const TableBodyCell = <T extends Record<string, unknown>>({
  cell,
  ...props
}: TableBodyCellProps<T>) => (
  <ChakraTable.Td
    key={cell.id}
    isNumeric={cell.column.columnDef.meta?.isNumeric}
    minW={cell.column.columnDef.meta?.width}
    w={cell.column.columnDef.meta?.width}
    sx={{
      pageBreakInside: 'avoid',
      pageBreakAfter: 'auto',
    }}
    bg="white"
    {...props}
  >
    <Text as="div" textOverflow="ellipsis" overflow="hidden" color="gray.800" whiteSpace="nowrap">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Text>
  </ChakraTable.Td>
);

export interface TableFooterProps<T extends Record<string, unknown>>
  extends ChakraTable.TableFooterProps {
  showFooter?: boolean;
  table: Table<T>;
}

export const TableFooter = <T extends Record<string, unknown>>({
  showFooter,
  table,
  ...props
}: TableFooterProps<T>) => {
  if (showFooter) {
    return (
      <ChakraTable.Tfoot display="table-header-group" {...props}>
        {table.getFooterGroups().map((footerGroup, index) => {
          if (index !== 0) return null;

          return (
            <ChakraTable.Tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) =>
                footer.column.columnDef.meta?.Footer?.display === 'none' ? null : (
                  <ChakraTable.Th
                    key={footer.id}
                    isNumeric={footer.column.columnDef.meta?.isNumeric}
                    width={footer.column.columnDef.meta?.width}
                    colSpan={footer.column.columnDef.meta?.Footer?.colspan}
                  >
                    {footer.isPlaceholder
                      ? null
                      : flexRender(footer.column.columnDef.footer, footer.getContext())}
                  </ChakraTable.Th>
                )
              )}
            </ChakraTable.Tr>
          );
        })}
      </ChakraTable.Tfoot>
    );
  }

  return null;
};
