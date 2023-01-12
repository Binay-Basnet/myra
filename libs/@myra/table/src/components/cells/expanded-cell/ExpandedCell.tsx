import { BiChevronRight } from 'react-icons/bi';
import { Row, Table } from '@tanstack/react-table';

import { Box, Icon, Text } from '@myra-ui/foundations';

/** ****************************************** Table Expand Cell Component ******************************************* */

interface ExpandedCellProps<T extends Record<string, unknown>> {
  row: Row<T>;
  value: React.ReactNode;
}

export const ExpandedCell = <T extends Record<string, unknown>>({
  row,
  value,
}: ExpandedCellProps<T>) => (
  <TableExpanded
    isExpanded={!row.getIsExpanded()}
    canExpand={row.getCanExpand()}
    toggleExpand={row.getToggleExpandedHandler()}
    depth={row.depth}
    value={value}
  />
);

/** ****************************************** Table Expand Header Component ******************************************* */

interface ExpandedHeaderProps<T extends Record<string, unknown>> {
  table: Table<T>;
  value: React.ReactNode;
}

export const ExpandedHeader = <T extends Record<string, unknown>>({
  table,
  value,
}: ExpandedHeaderProps<T>) => (
  <TableExpanded
    isExpanded={!table.getIsAllRowsExpanded()}
    canExpand
    toggleExpand={table.getToggleAllRowsExpandedHandler() as () => void}
    value={value}
  />
);

/** ****************************************** Table Expand Component ******************************************* */

interface ITableExpandedProps {
  canExpand: boolean;
  toggleExpand: () => void;
  isExpanded: boolean;
  depth?: number;
  value: React.ReactNode;
}

const TableExpanded = ({
  canExpand,
  toggleExpand,
  isExpanded,
  depth,
  value,
}: ITableExpandedProps) => (
  <Box display="flex" alignItems="center" gap="s8" pl={`${(depth || 0) * 2}rem`}>
    {canExpand ? (
      <Box
        onClick={toggleExpand}
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="br1"
        bg={isExpanded ? 'transparent' : 'gray.200'}
        _hover={{ bg: isExpanded ? 'gray.100' : 'gray.200' }}
        h="s20"
        w="s20"
      >
        <Icon
          color="gray.600"
          cursor="pointer"
          size="sm"
          transition="all 0.1s ease"
          transform={!isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
          as={BiChevronRight}
        />
      </Box>
    ) : null}

    <Text fontSize="s3" color="gray.700">
      {value as string}
    </Text>
  </Box>
);
