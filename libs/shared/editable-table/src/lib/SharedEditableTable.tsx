import { useState } from 'react';
import {
  Box,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Input,
} from '@chakra-ui/react';

type Column<T> = {
  id?: string;
  header?: string;
  accessor: keyof T;
  hidden?: boolean;
  fieldType?: 'text' | 'number' | 'percentage' | 'textarea' | 'select';
  isNumeric?: boolean;

  cellWidth?: 'auto' | 'lg' | 'md' | 'sm';
};
export interface EditableTableProps<T> {
  defaultData?: T[];
  columns: Column<T>[];
}

const cellWidthObj = {
  lg: '30%',
  md: '20%',
  sm: '15%',
};

export function EditableTable<T>({
  columns,
  defaultData,
}: EditableTableProps<T>) {
  const [currentData, setCurrentData] = useState<T[]>(defaultData ?? []);

  return (
    <Flex flexDir="column">
      <Flex
        w="100%"
        borderTopRadius="br2"
        h="40px"
        overflow="hidden"
        alignItems="center"
        bg="gray.700"
        color="white"
      >
        <Box w="s36" flexShrink={0} />
        {columns
          .filter((column) => !column.hidden)
          .map((column) => (
            <Box
              fontWeight="600"
              fontSize="r1"
              textAlign={column.isNumeric ? 'right' : 'left'}
              px="s8"
              flexGrow={column.cellWidth === 'auto' ? 1 : 0}
              flexBasis={
                column.cellWidth === 'auto'
                  ? '100%'
                  : column.cellWidth
                  ? cellWidthObj[column.cellWidth]
                  : '30%'
              }
            >
              {column.header}
            </Box>
          ))}
        <Box w="s36" flexShrink={0} />
      </Flex>

      <Box
        w="100%"
        overflow="hidden"
        bg="white"
        border="1px"
        borderColor="border.layout"
      >
        {defaultData?.map((data, index) => (
          <HStack
            w="100%"
            minH="36px"
            overflow="hidden"
            alignItems="stretch"
            bg="white"
            spacing={0}
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            <Box w="s36" minH="s36" flexShrink={0} />
            {columns
              .filter((column) => !column.hidden)
              .map((column) => (
                <Editable
                  w="100%"
                  minH="inherit"
                  display="flex"
                  alignItems="center"
                  justifyContent={column.isNumeric ? 'flex-end' : 'flex-start'}
                  fontSize="r1"
                  borderLeft="1px"
                  borderLeftColor="border.layout"
                  flexGrow={column.cellWidth === 'auto' ? 1 : 0}
                  flexBasis={
                    column.cellWidth === 'auto'
                      ? '100%'
                      : column.cellWidth
                      ? cellWidthObj[column.cellWidth]
                      : '30%'
                  }
                  textAlign={column.isNumeric ? 'right' : 'left'}
                  defaultValue={data[column.accessor] as string}
                >
                  <EditablePreview width="100%" px="s8" />

                  <Input
                    py="0"
                    h="100%"
                    w="100%"
                    px="s8"
                    minH="inherit"
                    bg="gray.100"
                    _focus={{ boxShadow: 'none' }}
                    _focusWithin={{ boxShadow: 'none' }}
                    border="none"
                    borderRadius="0"
                    as={EditableInput}
                  />
                </Editable>
              ))}
            <Box w="s36" h="s36" flexShrink={0} />
          </HStack>
        ))}
      </Box>
    </Flex>
  );
}

export default EditableTable;
