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
        <Box w="s36" />
        {columns
          .filter((column) => !column.hidden)
          .map((column) => (
            <Box
              fontWeight="600"
              fontSize="r1"
              textAlign={column.isNumeric ? 'right' : 'left'}
              px="s8"
              flexBasis={
                100 / columns.filter((column) => !column.hidden).length + '%'
              }
            >
              {column.header}
            </Box>
          ))}
        <Box w="s36" />
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
            h="36px"
            overflow="hidden"
            alignItems="center"
            bg="white"
            spacing={0}
            borderBottom="1px"
            borderBottomColor="border.layout"
            divider={
              <Divider orientation="vertical" borderColor="border.layout" />
            }
          >
            <Box w="s36" h="s36" />
            {columns
              .filter((column) => !column.hidden)
              .map((column) => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={column.isNumeric ? 'flex-end' : 'flex-start'}
                  height="100%"
                  fontSize="r1"
                  flexGrow={column.cellWidth === 'auto' ? 1 : 0}
                  // flexBasis={
                  //   100 / columns.filter((column) => !column.hidden).length +
                  //   '%'
                  // }
                  textAlign={column.isNumeric ? 'right' : 'left'}
                >
                  {/* {data[column.accessor] as string} */}
                  <Editable
                    w="100%"
                    defaultValue={data[column.accessor] as string}
                  >
                    <Box px="s8">
                      <EditablePreview />
                    </Box>

                    <Input
                      py="0"
                      h="s36"
                      w="100%"
                      px="s8"
                      bg="gray.100"
                      _focus={{ boxShadow: 'none' }}
                      _focusWithin={{ boxShadow: 'none' }}
                      border="none"
                      borderRadius="0"
                      as={EditableInput}
                    />
                  </Editable>
                </Box>
              ))}
            <Box w="s36" h="s36" />
          </HStack>
        ))}
      </Box>
    </Flex>
  );
}

export default EditableTable;
