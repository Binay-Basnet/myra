import React, { useEffect } from 'react';
import { AiOutlineExport } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { uniqBy } from 'lodash';

import { Table } from '../../lib/shared-table';
import {
  Column,
  Maybe,
  Row,
  TableInstance,
} from '../../types/Table';

interface TableSelectionBarProps<T extends Maybe<Record<string, unknown>>> {
  tableInstance: TableInstance<T>;
  columns: Column<T>[];
}
export const TableSelectionBar = <T extends Record<string, unknown>>({
  tableInstance: table,
  columns,
}: TableSelectionBarProps<T>) => {
  const [selectedRows, setSelectedRows] = React.useState<Row<T>[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const rowSelection = table.getState().rowSelection;
  const rowIds = React.useMemo(() => Object.keys(rowSelection), [rowSelection]);

  useEffect(() => {
    const currentPageRowIds = Object.keys(table.getRowModel().rowsById);

    if (currentPageRowIds.some((id) => rowIds.includes(id))) {
      setSelectedRows((prev) =>
        uniqBy([...prev, ...table.getSelectedRowModel().rows], 'id')
      );
    } else {
      setSelectedRows((prev) => prev.filter((row) => rowIds.includes(row.id)));
    }
  }, [rowIds, table]);

  return (
    <Box
      bg="primary.0"
      h="50px"
      px="s8"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <Button
        color="gray.800"
        fontWeight="500"
        variant="ghost"
        display="flex"
        alignItems="center"
        colorScheme="primary"
        gap="s8"
        onClick={onOpen}
      >
        <span>{rowIds.length} items selected</span>
        <Icon as={ArrowForwardIcon} color="primary.500" />
      </Button>

      <Box display="flex" alignItems="center" gap="s16">
        <Button colorScheme="neutral" variant="ghost">
          Delete
        </Button>
        <Button
          colorScheme="neutral"
          variant="ghost"
          leftIcon={<Icon as={AiOutlineExport} />}
        >
          Export Selected
        </Button>
        <Button
          color="danger.500"
          colorScheme="danger"
          variant="ghost"
          leftIcon={<Icon as={IoClose} />}
          onClick={() => table.resetRowSelection()}
        >
          Clear Selection
        </Button>
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent w="60vw" maxW="60vw">
          <Box
            h="50px"
            px="s16"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="r2" fontWeight="600">
              Selected Items
            </Text>
            <DrawerCloseButton />
          </Box>
          <Box
            bg="primary.0"
            h="50px"
            px="s16"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="gray.800" fontSize="r1" fontWeight="500">
              <span>{selectedRows.length} items selected</span>
            </Text>

            <Box display="flex" alignItems="center" gap="s16">
              <Button colorScheme="neutral" variant="ghost">
                Delete
              </Button>
              <Button
                colorScheme="neutral"
                variant="ghost"
                leftIcon={<Icon as={AiOutlineExport} />}
              >
                Export Selected
              </Button>
              <Button
                color="danger.500"
                colorScheme="danger"
                variant="ghost"
                leftIcon={<Icon as={IoClose} />}
              >
                Clear Selection
              </Button>
            </Box>
          </Box>
          <Table
            columns={columns}
            data={selectedRows.map((row) => row.original)}
            isStatic={true}
          />
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
