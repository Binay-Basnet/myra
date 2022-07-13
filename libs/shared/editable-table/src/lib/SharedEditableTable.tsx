import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { IoAdd, IoCloseCircleOutline } from 'react-icons/io5';
import {
  Box,
  Collapse,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react';
import { uniqueId } from 'lodash';

import { Grid } from '@coop/shared/ui';

interface RecordWithId {
  _id?: number;
}

type Column<T extends RecordWithId & Record<string, string | number>> = {
  id?: string;
  header?: string;
  accessor: keyof T;
  accessorFn?: (row: T) => string | number;
  hidden?: boolean;
  fieldType?: 'text' | 'number' | 'percentage' | 'textarea' | 'search';
  isNumeric?: boolean;

  cellWidth?: 'auto' | 'lg' | 'md' | 'sm';
};

export interface EditableTableProps<
  T extends RecordWithId & Record<string, string | number>
> {
  defaultData?: T[];
  columns: Column<T>[];
}

const cellWidthObj = {
  lg: '30%',
  md: '20%',
  sm: '15%',
};

// const AddIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="10"
//     height="11"
//     viewBox="0 0 10 11"
//     fill="none"
//   >
//     <path
//       d="M5 1V10M9.5 5.5H0.5"
//       stroke="#636972"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//   </svg>
// );

export function EditableTable<
  T extends RecordWithId & Record<string, string | number>
>({ columns, defaultData }: EditableTableProps<T>) {
  const [currentData, setCurrentData] = useState(defaultData ?? []);

  useEffect(() => {
    setCurrentData((prev) =>
      prev.map((item) =>
        item._id
          ? item
          : {
              ...item,
              _id: uniqueId('row_'),
            }
      )
    );
  }, [currentData.length]);

  return (
    <>
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
            .map((column, index) => (
              <Fragment key={index}>
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
              </Fragment>
            ))}
          <Box w="s36" flexShrink={0} />
        </Flex>

        <Box
          w="100%"
          overflow="hidden"
          bg="white"
          borderX="1px"
          borderColor="border.layout"
        >
          {currentData?.map((data, index) => (
            <Fragment key={`${data._id}${index}`}>
              <MemoEditableTableRow
                columns={columns}
                setCurrentData={setCurrentData}
                data={data}
              />
            </Fragment>
          ))}
        </Box>

        <Box
          w="100%"
          bg="white"
          borderBottom="1px"
          borderX="1px"
          borderColor="border.layout"
          borderBottomRadius="br2"
          h="36px"
          overflow="hidden"
          px="s8"
          display="flex"
          alignItems="center"
          color="gray.600"
          _hover={{ bg: 'gray.100' }}
          cursor="pointer"
          gap="s4"
          onClick={() => {
            const newObj = columns.reduce(
              (o, key) => ({ ...o, [key.accessor]: key.isNumeric ? 0 : '' }),
              {}
            );

            setCurrentData((prev) => [...prev, { ...newObj } as T]);
          }}
        >
          <Icon as={IoAdd} fontSize="xl" />
          <Text fontSize="s3" lineHeight="1.5">
            New
          </Text>
        </Box>
      </Flex>

      <Box
        bg="gray.700"
        color="white"
        fontSize="r1"
        mt="s20"
        p="s8"
        borderRadius="br2"
      >
        <pre>{JSON.stringify(currentData, null, 2)}</pre>
      </Box>
    </>
  );
}

export default EditableTable;

interface IEditableTableRowProps<
  T extends RecordWithId & Record<string, string | number>
> {
  columns: Column<T>[];
  data: T;
  setCurrentData: Dispatch<SetStateAction<T[]>>;
}

const EditableTableRow = <
  T extends RecordWithId & Record<string, string | number>
>({
  columns,
  data,
  setCurrentData,
}: IEditableTableRowProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log(JSON.stringify(data, null, 2));

  useEffect(() => {
    columns.forEach((column) =>
      column.accessorFn
        ? setCurrentData((prev) =>
            prev.map((item) =>
              item._id === data._id
                ? {
                    ...item,
                    [column.accessor]: column.isNumeric
                      ? Number(column?.accessorFn?.(data))
                      : column?.accessorFn?.(data),
                  }
                : item
            )
          )
        : null
    );
  }, [JSON.stringify(data)]);

  return (
    <>
      <HStack
        w="100%"
        minH="36px"
        overflow="hidden"
        alignItems="stretch"
        bg="white"
        spacing={0}
        borderBottom={isExpanded ? '0' : '1px'}
        borderBottomColor="border.layout"
      >
        <Box
          as="button"
          w="s36"
          borderRadius="0"
          minH="s36"
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.600"
          cursor="pointer"
          bg={isExpanded ? 'background.500' : 'white'}
          _hover={{ bg: 'gray.100' }}
          _focus={{ bg: 'background.500' }}
          _focusVisible={{ outline: 'none' }}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <Icon
            as={BsChevronRight}
            fontSize="xl"
            transition="transform 0.2s ease"
            transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
          />
        </Box>
        {columns
          .filter((column) => !column.hidden)
          .map((column, index) => {
            const accessorFnValue = column?.accessorFn?.(data);

            return (
              <Fragment key={index}>
                <Editable
                  isDisabled={
                    column.fieldType === 'search' || !!column?.accessorFn
                  }
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
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
                  value={
                    column.accessorFn
                      ? accessorFnValue
                        ? String(accessorFnValue)
                        : ''
                      : String(
                          data[column.accessor] ? data[column.accessor] : ''
                        )
                  }
                >
                  <EditablePreview
                    width="100%"
                    height="100%"
                    px="s8"
                    display="flex"
                    alignItems="center"
                    justifyContent={
                      column.isNumeric ? 'flex-end' : 'flex-start'
                    }
                  />

                  <Input
                    py="0"
                    h="100%"
                    type={column.isNumeric ? 'number' : 'text'}
                    w="100%"
                    px="s8"
                    minH="inherit"
                    bg="primary.100"
                    textAlign={column.isNumeric ? 'right' : 'left'}
                    justifyContent={
                      column.isNumeric ? 'flex-end' : 'flex-start'
                    }
                    _focus={{ boxShadow: 'none' }}
                    _focusWithin={{ boxShadow: 'none' }}
                    border="none"
                    borderRadius="0"
                    value={String(data[column.accessor] ?? '')}
                    onChange={(e) => {
                      setCurrentData((prev) =>
                        prev.map((item) =>
                          item._id === data._id
                            ? {
                                ...item,
                                [column.accessor]: column.isNumeric
                                  ? +e.target.value
                                  : e.target.value,
                              }
                            : item
                        )
                      );
                    }}
                    as={EditableInput}
                  />
                </Editable>
              </Fragment>
            );
          })}
        <Box
          w="s36"
          minH="s36"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          borderLeft="1px"
          borderLeftColor="border.layout"
          cursor="pointer"
          _hover={{ bg: 'gray.100' }}
          onClick={() => {
            setCurrentData((prev) =>
              prev.filter((prevData) => prevData._id !== data._id)
            );
          }}
        >
          <Icon as={IoCloseCircleOutline} color="danger.500" fontSize="2xl" />
        </Box>
      </HStack>
      <Collapse in={isExpanded} animateOpacity>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap="s20"
          p="s20"
          bg="background.500"
          borderY="1px"
          borderColor="border.layout"
        >
          {columns
            .filter((column) => column.hidden)
            .map((column, index) => (
              <Fragment key={index}>
                <Flex flexDir="column" gap="s4">
                  <Text
                    fontSize="s3"
                    fontWeight="medium"
                    lineHeight="1.5"
                    color="gray.700"
                  >
                    {column.header}
                  </Text>
                  <Input
                    bg="white"
                    textAlign={column.isNumeric ? 'right' : 'left'}
                    placeholder={column.header}
                    defaultValue={String(data[column.accessor] ?? '')}
                    onChange={(e) => {
                      setCurrentData((prev) =>
                        prev.map((item) =>
                          item._id === data._id
                            ? {
                                ...item,
                                [column.accessor]: e.target.value,
                              }
                            : item
                        )
                      );
                    }}
                  />
                </Flex>
              </Fragment>
            ))}
        </Grid>
      </Collapse>
    </>
  );
};

const MemoEditableTableRow = React.memo(
  EditableTableRow,
  (prevProps, nextProps) => {
    return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
  }
) as typeof EditableTableRow;
