import React, { Fragment, Reducer, useReducer, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { IoAdd, IoCloseCircleOutline } from 'react-icons/io5';
import { useDeepCompareEffect } from 'react-use';
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
  Textarea,
} from '@chakra-ui/react';
import { AsyncSelect, Select } from 'chakra-react-select';
import _, { uniqueId } from 'lodash';

import { Grid, GridItem } from '@coop/shared/ui';

import { chakraDefaultStyles, searchBarStyle } from '../utils/ChakraSelectTheme';
import { components } from '../utils/SelectComponents';

export const isArrayEqual = <T,>(x: T[], y: T[]) => _(x).xorWith(y, _.isEqual).isEmpty();

interface RecordWithId {
  id?: number;
}

export type Column<T extends RecordWithId & Record<string, string | number>> = {
  id?: string;
  header?: string;
  accessor: keyof T;
  accessorFn?: (row: T) => string | number;
  hidden?: boolean;
  fieldType?: 'text' | 'number' | 'percentage' | 'textarea' | 'search' | 'date' | 'select';
  selectOptions?: { label: string; value: string }[];
  searchOptions?: { label: string; value: string }[];

  loadOptions?: (row: T) => Promise<{ label: string; value: string }[]>;

  isNumeric?: boolean;

  cell?: (row: T) => React.ReactNode;

  cellWidth?: 'auto' | 'lg' | 'md' | 'sm';
  colSpan?: number;
};

export interface EditableTableProps<T extends RecordWithId & Record<string, string | number>> {
  defaultData?: T[];

  columns: Column<T>[];

  canDeleteRow?: boolean;
  onChange?: (updatedData: Omit<T, 'id'>[]) => void;

  debug?: boolean;
  canAddRow?: boolean;
  searchPlaceholder?: string;
}

const cellWidthObject = {
  lg: '50%',
  md: '20%',
  sm: '15%',
};

enum EditableTableActionKind {
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete',
  REPLACE = 'Replace',
  ACCESSOR_FN_EDIT = 'Accessor',
}

type EditableTableAction<TData extends RecordWithId & Record<string, string | number>> =
  | {
      type: EditableTableActionKind.ADD;
      payload: TData;
    }
  | {
      type: EditableTableActionKind.EDIT;
      payload: {
        data: TData;
        column: Column<TData>;
        newValue: string;
      };
    }
  | {
      type: EditableTableActionKind.DELETE;
      payload: {
        data: TData;
      };
    }
  | {
      type: EditableTableActionKind.REPLACE;
      payload: {
        newData: TData[];
      };
    }
  | {
      type: EditableTableActionKind.ACCESSOR_FN_EDIT;
      payload: {
        data: TData;
        column: Column<TData>;
      };
    };

interface EditableState<T extends RecordWithId & Record<string, string | number>> {
  data: T[];
  columns: Column<T>[];
}

function editableReducer<T extends RecordWithId & Record<string, string | number>>(
  state: EditableState<T>,
  action: EditableTableAction<T>
): EditableState<T> {
  const { type, payload } = action;

  switch (type) {
    case EditableTableActionKind.ADD:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...payload,
            id: uniqueId('row_'),
          },
        ],
      };

    case EditableTableActionKind.EDIT:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === payload?.data?.id
            ? {
                ...item,
                [payload.column.accessor]: payload.column.isNumeric
                  ? +payload.newValue
                  : payload.newValue,
              }
            : item
        ),
      };
    case EditableTableActionKind.ACCESSOR_FN_EDIT:
      return {
        ...state,
        data: state.data.map((item) =>
          item.id === payload?.data?.id
            ? {
                ...item,
                [payload.column.accessor]: payload?.column?.accessorFn
                  ? payload.column.accessorFn(item)
                  : '',
              }
            : item
        ),
      };

    case EditableTableActionKind.DELETE:
      return {
        ...state,
        data: state.data.filter((data) => data.id !== payload.data.id),
      };

    case EditableTableActionKind.REPLACE:
      if (
        !isArrayEqual(
          payload.newData.map(({ id, ...rest }) => rest),
          state.data.map(({ id, ...rest }) => rest)
        )
      ) {
        return {
          ...state,
          data: payload.newData.map((data) => ({
            ...data,
            id: uniqueId('row_'),
          })),
        };
      }
      return state;

    default:
      return state;
  }
}

export const EditableTable = <T extends RecordWithId & Record<string, string | number>>({
  columns,
  defaultData = [],
  canDeleteRow = true,
  onChange,
  debug = false,
  canAddRow = true,
  searchPlaceholder,
}: EditableTableProps<T>) => {
  const [state, dispatch] = useReducer<Reducer<EditableState<T>, EditableTableAction<T>>>(
    editableReducer,
    {
      data: defaultData ?? [],
      columns,
    }
  );

  useDeepCompareEffect(() => {
    if (onChange) {
      onChange(state.data.map(({ id, ...rest }) => rest));
    }
  }, [state.data]);

  useDeepCompareEffect(() => {
    if (defaultData) {
      dispatch({
        type: EditableTableActionKind.REPLACE,
        payload: {
          newData: defaultData,
        },
      });
    }
  }, [defaultData]);

  return (
    <>
      <Flex flexDir="column">
        <Flex
          w="100%"
          borderTopRadius="br2"
          h="40px"
          alignItems="center"
          bg="gray.700"
          color="white"
        >
          {columns.some((column) => column.hidden) ? (
            <Box w="s36" flexShrink={0} />
          ) : (
            <Box
              w="s36"
              flexShrink={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="600"
              fontSize="r1"
              px="s16"
            >
              S.N.
            </Box>
          )}

          {columns
            .filter((column) => !column.hidden)
            .map((column, index) => (
              <Fragment key={index}>
                <Box
                  fontWeight="600"
                  fontSize="r1"
                  textAlign={column.isNumeric ? 'right' : 'left'}
                  flexGrow={column.cellWidth === 'auto' ? 1 : 0}
                  flexBasis={
                    column.cellWidth === 'auto'
                      ? '100%'
                      : column.cellWidth
                      ? cellWidthObject[column.cellWidth]
                      : '30%'
                  }
                >
                  <Text px="s8">{column.header}</Text>
                </Box>
              </Fragment>
            ))}
          {canDeleteRow ? <Box w="s36" flexShrink={0} /> : null}
        </Flex>

        <Box w="100%" bg="white" borderX="1px" borderColor="border.layout">
          {state?.data.map((data, index) => (
            <Fragment key={`${data.id}${index}`}>
              <MemoEditableTableRow
                canDeleteRow={canDeleteRow}
                columns={columns}
                dispatch={dispatch}
                data={data}
                index={index}
              />
            </Fragment>
          ))}
        </Box>

        {!canAddRow ? null : columns.some((column) => column.fieldType === 'search') ? (
          <Box
            borderBottom="1px"
            borderX="1px"
            borderColor="border.layout"
            borderBottomRadius="br2"
          >
            <Select
              components={components}
              placeholder={searchPlaceholder ?? 'Search for items'}
              options={columns.find((column) => column.searchOptions)?.searchOptions}
              chakraStyles={searchBarStyle}
              value=""
              onChange={(newValue) => {
                dispatch({
                  type: EditableTableActionKind.ADD,
                  payload: columns.reduce(
                    (o, key) =>
                      key.fieldType === 'search'
                        ? {
                            ...o,
                            [key.accessor]: newValue.value,
                          }
                        : {
                            ...o,
                            [key.accessor]: key.isNumeric ? 0 : '',
                          },
                    {}
                  ) as T,
                });
              }}
            />
          </Box>
        ) : (
          <Box
            w="100%"
            bg="white"
            borderBottom="1px"
            borderX="1px"
            borderColor="border.layout"
            borderBottomRadius="br2"
            h="36px"
            px="s8"
            display="flex"
            alignItems="center"
            color="gray.600"
            _hover={{ bg: 'gray.100' }}
            cursor="pointer"
            gap="s4"
            onClick={() => {
              dispatch({
                type: EditableTableActionKind.ADD,
                payload: Object.fromEntries(
                  columns.map((key) => [key.accessor, key.isNumeric ? 0 : ''])
                ) as T,
              });
            }}
          >
            <Icon as={IoAdd} fontSize="xl" />
            <Text fontSize="s3" lineHeight="1.5">
              New
            </Text>
          </Box>
        )}
      </Flex>

      {debug && (
        <Box bg="gray.700" color="white" fontSize="r1" mt="s20" p="s8" borderRadius="br2">
          <pre>{JSON.stringify({ ...state, hook_form: defaultData }, null, 2)}</pre>
        </Box>
      )}
    </>
  );
};

export default EditableTable;

interface IEditableTableRowProps<T extends RecordWithId & Record<string, string | number>> {
  columns: Column<T>[];
  data: T;
  canDeleteRow?: boolean;
  index: number;

  dispatch: React.Dispatch<EditableTableAction<T>>;
}

const EditableTableRow = <T extends RecordWithId & Record<string, string | number>>({
  columns,
  data,
  index,
  dispatch,
  canDeleteRow,
}: IEditableTableRowProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <HStack
        w="100%"
        minH="36px"
        alignItems="stretch"
        bg="white"
        spacing={0}
        borderBottom={isExpanded ? '0' : '1px'}
        borderBottomColor="border.layout"
      >
        {columns.some((column) => column.hidden) ? (
          <Box
            as="button"
            type="button"
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
            onClick={() => {
              setIsExpanded((previous) => !previous);
            }}
          >
            <Icon
              as={BsChevronRight}
              fontSize="xl"
              transition="transform 0.2s ease"
              transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
            />
          </Box>
        ) : (
          <Box
            w="s36"
            borderRadius="0"
            minH="s36"
            flexShrink={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.600"
            cursor="pointer"
            _hover={{ bg: 'gray.100' }}
            _focus={{ bg: 'background.500' }}
            _focusVisible={{ outline: 'none' }}
          >
            {index + 1}
          </Box>
        )}

        {columns
          .filter((column) => !column.hidden)
          .map((column) => {
            if (column.accessorFn) {
              dispatch({
                type: EditableTableActionKind.ACCESSOR_FN_EDIT,
                payload: {
                  data,
                  column,
                },
              });
            }
            return (
              <Fragment key={column.id}>
                <EditableCell column={column} data={data} dispatch={dispatch} />
              </Fragment>
            );
          })}
        {canDeleteRow ? (
          <Box
            as="button"
            w="s36"
            minH="s36"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            borderLeft="1px"
            borderLeftColor="border.layout"
            cursor="pointer"
            _focus={{ bg: 'background.500' }}
            _focusVisible={{ outline: 'none' }}
            _hover={{ bg: 'gray.100' }}
            onClick={() => {
              dispatch({
                type: EditableTableActionKind.DELETE,
                payload: {
                  data,
                },
              });
            }}
          >
            <Icon as={IoCloseCircleOutline} color="danger.500" fontSize="2xl" />
          </Box>
        ) : null}
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
            .map((column) => (
              <GridItem colSpan={column.colSpan ?? 1} key={column.id}>
                <Flex flexDir="column" gap="s4">
                  <Text fontSize="s3" fontWeight="medium" lineHeight="1.5" color="gray.700">
                    {column.header}
                  </Text>

                  {/* TODO - IMPLEMENT FIELD TYPE FOR SELECT */}
                  {column.fieldType === 'textarea' ? (
                    <Textarea
                      bg="white"
                      fontSize="r1"
                      _hover={{
                        borderColor: 'gray.500',
                      }}
                      placeholder={column.header}
                      defaultValue={String(data[column.accessor] ?? '')}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        dispatch({
                          type: EditableTableActionKind.EDIT,
                          payload: {
                            data,
                            newValue: e.target.value,
                            column,
                          },
                        });
                      }}
                    />
                  ) : (
                    <Input
                      bg="white"
                      textAlign={column.isNumeric ? 'right' : 'left'}
                      placeholder={column.header}
                      defaultValue={String(data[column.accessor] ?? '')}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                          type: EditableTableActionKind.EDIT,
                          payload: {
                            data,
                            newValue: e.target.value,
                            column,
                          },
                        });
                      }}
                    />
                  )}
                </Flex>
              </GridItem>
            ))}
        </Grid>
      </Collapse>
    </>
  );
};

const MemoEditableTableRow = React.memo(
  EditableTableRow,
  (previousProps, nextProps) =>
    JSON.stringify(previousProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(previousProps.columns) === JSON.stringify(nextProps.columns)
) as typeof EditableTableRow;

interface EditableCellProps<T extends RecordWithId & Record<string, string | number>> {
  column: Column<T>;
  data: T;
  dispatch: React.Dispatch<EditableTableAction<T>>;
}

const EditableCell = <T extends RecordWithId & Record<string, string | number>>({
  column,
  dispatch,
  data,
}: EditableCellProps<T>) => (
  <Editable
    _after={
      column.fieldType === 'percentage'
        ? {
            content: "'%'",
            color: 'primary.500',
            position: 'absolute',
            fontWeight: '500',
            px: 's8',
          }
        : {}
    }
    isDisabled={column.fieldType === 'search' || !!column?.accessorFn}
    isPreviewFocusable
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
        ? cellWidthObject[column.cellWidth]
        : '30%'
    }
    value={
      column.fieldType === 'search'
        ? column.searchOptions?.find((search) => search.value === data[column.accessor])?.label
        : column.accessorFn
        ? column.accessorFn(data)
          ? String(column.accessorFn(data))
          : ''
        : String(data[column.accessor] ? data[column.accessor] : '')
    }
  >
    {column.cell ? (
      <Box px="s8" width="100%" cursor="not-allowed">
        {column.cell(data)}
      </Box>
    ) : column.fieldType === 'select' ? null : (
      <EditablePreview
        width="100%"
        mr={column.fieldType === 'percentage' ? 's24' : '0'}
        cursor={column.fieldType === 'search' || !!column?.accessorFn ? 'not-allowed' : 'text'}
        height="100%"
        px="s8"
        display="flex"
        alignItems="center"
        justifyContent={column.isNumeric ? 'flex-end' : 'flex-start'}
      />
    )}

    {column.fieldType === 'select' ? (
      <Box w="100%">
        {column.loadOptions ? (
          <AsyncSelect
            onChange={(newValue: { label: string; value: string }) => {
              dispatch({
                type: EditableTableActionKind.EDIT,
                payload: {
                  data,
                  newValue: newValue.value,
                  column,
                },
              });
            }}
            chakraStyles={chakraDefaultStyles}
            loadOptions={() => column.loadOptions && column.loadOptions(data)}
          />
        ) : (
          <Select
            value={column.selectOptions?.find((option) => option.value === data[column.accessor])}
            onChange={(newValue: { label: string; value: string }) => {
              dispatch({
                type: EditableTableActionKind.EDIT,
                payload: {
                  data,
                  newValue: newValue.value,
                  column,
                },
              });
            }}
            chakraStyles={chakraDefaultStyles}
            options={column.selectOptions}
          />
        )}
      </Box>
    ) : (
      <Input
        //  mt="-1px"
        py="0"
        h="100%"
        type={column.isNumeric ? 'number' : 'text'}
        w="100%"
        px="s8"
        minH="inherit"
        bg="primary.100"
        textAlign={column.isNumeric ? 'right' : 'left'}
        justifyContent={column.isNumeric ? 'flex-end' : 'flex-start'}
        _focus={{ boxShadow: 'none' }}
        _focusWithin={{ boxShadow: 'none' }}
        border="none"
        borderRadius="0"
        value={String(data[column.accessor] ?? '')}
        onChange={(e) => {
          dispatch({
            type: EditableTableActionKind.EDIT,
            payload: {
              data,
              newValue: e.target.value,
              column,
            },
          });
        }}
        as={EditableInput}
      />
    )}
  </Editable>
);
