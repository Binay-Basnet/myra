/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment, Reducer, useEffect, useMemo, useReducer, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { IoAdd, IoCloseCircleOutline } from 'react-icons/io5';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';
import {
  Box,
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
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import { AsyncSelect, chakraComponents, Select } from 'chakra-react-select';
import _, { debounce, uniqueId } from 'lodash';

import { Checkbox, Collapse, Grid, GridItem, SwitchTabs } from '@myra-ui';
import { DatePicker } from '@myra-ui/date-picker';

import { useAppSelector } from '@coop/cbs/data-access';

import { chakraDefaultStyles } from '../utils/ChakraSelectTheme';

export const isArrayEqual = <T,>(x: T[], y: T[]) => _(x).xorWith(y, _.isEqual).isEmpty();

type DateValue = {
  local?: string;
  en?: string;
  np?: string;
};

type EditableValue =
  | string
  | number
  | boolean
  | {
      label: string;
      value: string;
    }
  | DateValue;

interface RecordWithId {
  _id?: number;
}

interface ModalProps {
  trigger: (props: { id: string; name: string; under: string } | null) => React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;

  isMulti: boolean;
  selectableNodes: 'leaf' | 'root' | 'all';
}

export type Column<T extends RecordWithId & Record<string, EditableValue>> = {
  id?: string;
  header?: string;
  accessor: keyof T;
  accessorFn?: (row: T) => EditableValue;
  hidden?: boolean;
  fieldType?:
    | 'text'
    | 'number'
    | 'percentage'
    | 'textarea'
    | 'search'
    | 'date'
    | 'select'
    | 'checkbox'
    | 'modal'
    | 'switch';
  selectOptions?: { label: string; value: string }[];
  searchOptions?: { label: string; value: string }[];

  loadOptions?: (row: T) => Promise<{ label: string; value: string }[]>;

  isNumeric?: boolean;
  isTime?: boolean;
  getDisabled?: (row: T) => boolean;

  cell?: (row: T) => React.ReactNode;
  modal?: React.ComponentType<ModalProps>;

  cellWidth?: 'auto' | 'lg' | 'md' | 'sm';
  colSpan?: number;

  searchLoading?: boolean;
  searchCallback?: (newSearch: string) => void;

  addItemHandler?: () => void;
  addItemLabel?: string;
};

export interface EditableTableProps<T extends RecordWithId & Record<string, EditableValue>> {
  defaultData?: T[];

  columns: Column<T>[];

  canDeleteRow?: boolean;
  onChange?: (updatedData: Omit<T, '_id'>[]) => void;

  debug?: boolean;
  canAddRow?: boolean;
  searchPlaceholder?: string;

  getRowId?: () => Promise<{ newId: string }>;

  hideSN?: boolean;
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
  ADD_WITH_ID = 'AddWithId',
  ACCESSOR_FN_EDIT = 'Accessor',
  SELECT_ALL = 'SelectAll',
  COLUMN_UPDATE = 'ColumnUpdate',
}

type EditableTableAction<TData extends RecordWithId & Record<string, EditableValue>> =
  | {
      type: EditableTableActionKind.ADD;
      payload: TData;
    }
  | {
      type: EditableTableActionKind.ADD_WITH_ID;
      payload: {
        data: TData;
        newId: string;
      };
    }
  | {
      type: EditableTableActionKind.EDIT;
      payload: {
        data: TData;
        column: Column<TData>;
        newValue: string | boolean | DateValue;
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
    }
  | {
      type: EditableTableActionKind.SELECT_ALL;
      payload: { column: Column<TData>; isChecked: boolean };
    }
  | { type: EditableTableActionKind.COLUMN_UPDATE; payload: { columns: Column<TData>[] } };

interface EditableState<T extends RecordWithId & Record<string, EditableValue>> {
  data: T[];
  columns: Column<T>[];
}

function editableReducer<T extends RecordWithId & Record<string, EditableValue>>(
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
            _id: uniqueId('row_'),
          },
        ],
      };

    case EditableTableActionKind.ADD_WITH_ID:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...payload.data,
            id: payload.newId,
            _id: uniqueId('row_'),
          },
        ],
      };

    case EditableTableActionKind.EDIT:
      // eslint-disable-next-line no-case-declarations
      const accessorValue = state.columns.reduce((acc, curr) => {
        if (curr.accessorFn) {
          acc = {
            ...acc,
            [curr.accessor]: curr.accessorFn({
              ...payload.data,
              [payload.column.accessor]: payload.column.isNumeric
                ? payload.newValue || 0
                : payload.newValue,
            }),
          };
        }
        return acc;
      }, {});

      return {
        ...state,
        data: state.data.map((item) =>
          item._id === payload?.data?._id
            ? {
                ...item,
                ...accessorValue,
                [payload.column.accessor]: payload.column.isNumeric
                  ? payload.newValue || 0
                  : payload.newValue,
              }
            : item
        ),
      };
    case EditableTableActionKind.ACCESSOR_FN_EDIT:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === payload?.data?._id
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
        data: state.data.filter((data) => data._id !== payload.data._id),
      };

    case EditableTableActionKind.REPLACE:
      if (
        !isArrayEqual(
          // eslint-disable-next-line unused-imports/no-unused-vars
          payload.newData.map(({ _id, ...rest }) => rest),
          // eslint-disable-next-line unused-imports/no-unused-vars
          state.data.map(({ _id, ...rest }) => rest)
        )
      ) {
        return {
          ...state,
          data: payload.newData.map((data) => ({
            ...data,
            _id: uniqueId('row_'),
          })),
        };
      }
      return state;

    case EditableTableActionKind.SELECT_ALL:
      return {
        ...state,
        data: state.data.map((item) => ({
          ...item,
          [payload.column.accessor]:
            payload?.column?.getDisabled && payload.column.getDisabled(item)
              ? item[payload.column.accessor]
              : payload?.isChecked,
        })),
      };

    case EditableTableActionKind.COLUMN_UPDATE:
      return {
        ...state,
        columns: payload.columns,
      };
    default:
      return state;
  }
}

const flexBasisFunc = (column: Pick<Column<Record<string, EditableValue>>, 'cellWidth'>) => {
  if (column.cellWidth === 'auto') {
    return '100%';
  }
  if (column.cellWidth) {
    return cellWidthObject[column.cellWidth];
  }
  return '30%';
};

export const EditableTable = <T extends RecordWithId & Record<string, EditableValue>>({
  columns,
  defaultData = [],
  canDeleteRow = true,
  onChange,
  debug = false,
  canAddRow = true,
  searchPlaceholder,
  getRowId,
  hideSN,
}: EditableTableProps<T>) => {
  const [state, dispatch] = useReducer<Reducer<EditableState<T>, EditableTableAction<T>>>(
    editableReducer,
    {
      data: defaultData.map((d) => ({ ...d, _id: uniqueId('row_') })) ?? [],
      columns,
    }
  );

  useDeepCompareEffect(() => {
    if (onChange) {
      // eslint-disable-next-line unused-imports/no-unused-vars
      onChange(state.data.map(({ _id, ...rest }) => rest) as Omit<T, '_id'>[]);
    }
  }, [state.data]);

  useEffect(() => {
    if (
      defaultData &&
      // !columns.some((column) => !!column.searchOptions) &&
      !isArrayEqual(
        defaultData,
        state.data.map(({ _id, ...rest }) => rest)
      )
    ) {
      dispatch({
        type: EditableTableActionKind.REPLACE,
        payload: {
          newData: defaultData,
        },
      });
    }
  }, [defaultData]);

  useDeepCompareEffect(() => {
    dispatch({
      type: EditableTableActionKind.COLUMN_UPDATE,
      payload: {
        columns,
      },
    });
  }, [columns]);

  // useEffect(() => {
  //   ref?.current?.inputRef.focus();
  // });

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
            !hideSN && (
              <Box
                w="s36"
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="600"
                fontSize="r1"
                pl="8px"
              >
                S.N.
              </Box>
            )
          )}

          {columns
            .filter((column) => !column.hidden)
            .map((column) => (
              <Fragment key={String(column.accessor)}>
                <Box
                  fontWeight="600"
                  fontSize="r1"
                  // textAlign={column.isNumeric ? 'right' : 'left'}
                  flexGrow={column.cellWidth === 'auto' ? 1 : 0}
                  flexBasis={flexBasisFunc(column)}
                  display="flex"
                  px="s8"
                  gap="s4"
                >
                  <Text>{column.header}</Text>

                  {column?.fieldType === 'checkbox' && (
                    <Checkbox
                      isChecked={state?.data?.findIndex((item) => !item[column?.accessor]) === -1}
                      onChange={(e) => {
                        dispatch({
                          type: EditableTableActionKind.SELECT_ALL,
                          payload: {
                            column,
                            isChecked: e.target.checked,
                          },
                        });
                      }}
                    />
                  )}
                </Box>
              </Fragment>
            ))}
          {canDeleteRow ? <Box w="s36" flexShrink={0} /> : null}
        </Flex>

        <Box w="100%" bg="white" borderX="1px" borderColor="border.layout">
          {state?.data.map((data, index) => (
            <Fragment key={`${data._id}`}>
              <MemoEditableTableRow
                canDeleteRow={canDeleteRow}
                columns={columns}
                dispatch={dispatch}
                data={data}
                index={index}
                hideSN={hideSN}
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
            <EditableSearch
              columns={columns}
              dispatch={dispatch}
              searchPlaceholder={searchPlaceholder}
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
            onClick={async () => {
              if (getRowId) {
                const response = await getRowId();

                if (response.newId) {
                  dispatch({
                    type: EditableTableActionKind.ADD_WITH_ID,
                    payload: {
                      data: Object.fromEntries(
                        columns.map((key) => [key.accessor, key.isNumeric ? 0 : ''])
                      ) as T,
                      newId: response.newId,
                    },
                  });
                }
              } else {
                dispatch({
                  type: EditableTableActionKind.ADD,
                  payload: Object.fromEntries(
                    columns.map((key) => [
                      key.accessor,
                      key.isNumeric ? 0 : key.fieldType === 'checkbox' ? false : '',
                    ])
                  ) as T,
                });
              }
            }}
          >
            <Icon as={IoAdd} fontSize="xl" color="primary.500" />
            <Text color="primary.500" fontSize="s3" lineHeight="1.5">
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

interface EditableSearchProps<T extends RecordWithId & Record<string, EditableValue>> {
  columns: Column<T>[];
  searchPlaceholder?: string;
  dispatch: React.Dispatch<EditableTableAction<T>>;
}

const EditableSearch = <T extends RecordWithId & Record<string, EditableValue>>({
  columns,
  searchPlaceholder,
  dispatch,
}: EditableSearchProps<T>) => {
  const [searchValue, setSearchValue] = useState('');

  const searchColumn = useMemo(() => columns.find((column) => column.searchOptions), [columns]);

  const debouncedSearch = debounce((e) => {
    columns.find((column) => column.searchCallback)?.searchCallback?.(e.target.value);
  }, 800);

  return (
    <AutoComplete
      openOnFocus
      disableFilter
      isOpen
      emptyState={false}
      isLoading={searchColumn?.searchLoading}
      onSelectOption={({ item: newValue }: any) => {
        dispatch({
          type: EditableTableActionKind.ADD,
          payload: columns.reduce(
            (o, key) =>
              key.fieldType === 'search'
                ? {
                    ...o,
                    [key.accessor]: {
                      label: newValue.label,
                      value: newValue.value,
                    },
                  }
                : {
                    ...o,
                    [key.accessor]: key.isNumeric ? 0 : '',
                  },
            {}
          ) as T,
        });
      }}
    >
      <AutoCompleteInput
        bg="white"
        loadingIcon={null}
        _hover={{ bg: 'gray.50' }}
        _focus={{ bg: 'gray.50' }}
        borderTopRadius={0}
        height="36px"
        placeholder={searchPlaceholder || 'Search'}
        value={searchValue}
        onChange={(e: any) => {
          setSearchValue(e.target.value);
          debouncedSearch(e);
        }}
        variant="filled"
        isDisabled={searchColumn?.getDisabled && searchColumn?.getDisabled({} as T)}
      />

      <AutoCompleteList
        border="1px"
        borderColor="border.layout"
        mt="-6px"
        boxShadow="none"
        fontSize="r1"
        fontStyle="unset"
        fontWeight={500}
      >
        {(!searchColumn?.searchOptions || searchColumn?.searchOptions?.length === 0) && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            py="s24"
            fontSize="r1"
            color="gray.400"
          >
            No Options Found !!!
          </Box>
        )}
        {searchColumn?.searchOptions?.map((option) => (
          <AutoCompleteItem
            key={option.value}
            label={option.label}
            value={option.value}
            textTransform="capitalize"
          >
            {option.label}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};

interface IEditableTableRowProps<T extends RecordWithId & Record<string, EditableValue>> {
  columns: Column<T>[];
  data: T;
  canDeleteRow?: boolean;
  index: number;

  hideSN?: boolean;

  dispatch: React.Dispatch<EditableTableAction<T>>;
}

interface IEditableTableRowProps<T extends RecordWithId & Record<string, EditableValue>> {
  columns: Column<T>[];
  data: T;
  canDeleteRow?: boolean;
  index: number;

  hideSN?: boolean;

  dispatch: React.Dispatch<EditableTableAction<T>>;
}

const EditableTableRow = <T extends RecordWithId & Record<string, EditableValue>>({
  columns,
  data,
  index,
  dispatch,
  canDeleteRow,
  hideSN,
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
            data-testid={`showMore${index}`}
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
          !hideSN && (
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
          )
        )}

        {columns
          .filter((column) => !column.hidden)
          .map((column) => (
            <Fragment key={column.accessor as string}>
              <EditableCell column={column} data={data} dispatch={dispatch} index={index} />
            </Fragment>
          ))}
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
            data-testid={`deleteRow-${index}`}
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

interface EditableCellProps<T extends RecordWithId & Record<string, EditableValue>> {
  column: Column<T>;
  data: T;
  index?: number;
  dispatch: React.Dispatch<EditableTableAction<T>>;
}

const EditableCell = <T extends RecordWithId & Record<string, EditableValue>>({
  column,
  dispatch,
  data,
  index,
}: EditableCellProps<T>) => {
  const router = useRouter();

  const preference = useAppSelector((state) => state?.auth?.preference);

  const [asyncOptions, setAsyncOptions] = useState<{ label: string; value: string }[]>([]);

  const Modal = column.modal;

  useEffect(() => {
    async function getAsyncOptions() {
      if (column?.loadOptions) {
        const options = await column.loadOptions(data);

        setAsyncOptions(options);
      }
    }

    if (column?.loadOptions) {
      getAsyncOptions();
    }
  }, [column?.loadOptions]);

  const dataValue = data[column.accessor];

  return (
    <Editable
      position="relative"
      _after={
        column.fieldType === 'percentage'
          ? {
              content: "'%'",
              color: 'primary.500',
              bg: column?.getDisabled?.(data) ? 'gray.50' : 'white',
              position: 'absolute',
              height: '100%',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              px: 's8',
            }
          : {}
      }
      isDisabled={column.getDisabled ? column.getDisabled(data) : column.fieldType === 'search'}
      isPreviewFocusable
      selectAllOnFocus={false}
      w="100%"
      minH="inherit"
      display="flex"
      alignItems="center"
      justifyContent={
        column.isNumeric
          ? 'flex-end'
          : column.fieldType === 'checkbox' || column.fieldType === 'switch'
          ? 'center'
          : 'flex-start'
      }
      fontSize="r1"
      borderLeft="1px"
      borderLeftColor="border.layout"
      flexGrow={column.cellWidth === 'auto' ? 1 : 0}
      data-testId={`${column?.accessor?.toString()}-${index}`}
      flexBasis={flexBasisFunc(column)}
      value={
        column.fieldType === 'search'
          ? typeof dataValue === 'object' && 'label' in dataValue
            ? dataValue.label
            : String(dataValue)
          : data[column.accessor]
          ? (data[column.accessor] as string)
          : ''
      }
    >
      {column.fieldType === 'modal' ? (
        Modal ? (
          <Modal
            value={data[column.accessor] as string}
            trigger={(props) => (
              <Text
                _hover={{ bg: 'gray.100' }}
                color={!props ? 'primary.500' : 'gray.700'}
                cursor="pointer"
                px="s8"
                w="100%"
                h="100%"
                display="flex"
                alignItems="center"
              >
                {props ? `${props.id} - ${props.name}` : 'Search for Ledger'}
              </Text>
            )}
            onChange={(newValue) => {
              dispatch({
                type: EditableTableActionKind.EDIT,
                payload: {
                  data,
                  newValue,
                  column,
                },
              });
            }}
            isMulti={false}
            selectableNodes="leaf"
          />
        ) : null
      ) : column.fieldType === 'checkbox' ||
        column.fieldType === 'switch' ? null : column.fieldType ===
        'select' ? null : column.fieldType === 'date' ? null : column.cell ? (
        <Box px="s8" width="100%" cursor="not-allowed">
          {column.cell(data)}
        </Box>
      ) : (
        <EditablePreview
          width="100%"
          mr={column.fieldType === 'percentage' ? 's24' : '0'}
          cursor={column.fieldType === 'search' ? 'not-allowed' : 'text'}
          height="100%"
          px="s8"
          display="flex"
          alignItems="center"
          sx={
            column.getDisabled && column.getDisabled(data)
              ? {
                  cursor: 'not-allowed',
                  bg: 'gray.50',
                  borderRadius: '0',
                }
              : {}
          }
          justifyContent={column.isNumeric ? 'flex-end' : 'flex-start'}
        />
      )}

      {column.fieldType === 'select' ? (
        <Box w="100%" h="100%">
          {column.loadOptions ? (
            <AsyncSelect
              value={asyncOptions?.find((option) => option.value === data[column.accessor])}
              components={{
                SingleValue: column?.cell
                  ? (props) => (
                      <chakraComponents.SingleValue {...props}>
                        {column?.cell?.(data)}
                      </chakraComponents.SingleValue>
                    )
                  : (props) => <chakraComponents.SingleValue {...props} />,
                DropdownIndicator: () => null,
              }}
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
              noOptionsMessage={({ inputValue }) => (!inputValue ? 'Type to Search' : 'No Options')}
              isDisabled={column.getDisabled && column.getDisabled(data)}
            />
          ) : (
            <Select
              components={{
                SingleValue: column?.cell
                  ? (props) => (
                      <chakraComponents.SingleValue {...props}>
                        {column?.cell?.(data)}
                      </chakraComponents.SingleValue>
                    )
                  : (props) => <chakraComponents.SingleValue {...props} />,
                DropdownIndicator: () => null,
              }}
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
              isDisabled={column.getDisabled && column.getDisabled(data)}
            />
          )}
        </Box>
      ) : column?.fieldType === 'checkbox' ? (
        <Checkbox
          isChecked={Boolean(data[column.accessor])}
          onChange={(e) => {
            dispatch({
              type: EditableTableActionKind.EDIT,
              payload: {
                data,
                newValue: e.target.checked,
                column,
              },
            });
          }}
          isDisabled={column.getDisabled && column.getDisabled(data)}
        />
      ) : column?.fieldType === 'date' ? (
        <DatePicker
          calendarType={preference?.date || 'AD'}
          locale={router.locale as 'en' | 'ne'}
          value={dataValue ? { ad: (dataValue as DateValue).en } : undefined}
          onChange={(e) => {
            dispatch({
              type: EditableTableActionKind.EDIT,
              payload: {
                data,
                newValue: { np: e.bs, en: e.ad, local: '' },
                column,
              },
            });
          }}
        />
      ) : column?.fieldType === 'switch' ? (
        <SwitchTabs
          value={data[column.accessor] as string}
          onChange={(nextValue) => {
            if (nextValue === 'true' || nextValue === 'false') {
              dispatch({
                type: EditableTableActionKind.EDIT,
                payload: {
                  data,
                  newValue: nextValue === 'true',
                  column,
                },
              });
            } else {
              dispatch({
                type: EditableTableActionKind.EDIT,
                payload: {
                  data,
                  newValue: nextValue,
                  column,
                },
              });
            }
          }}
          options={[
            {
              label: 'No',
              value: false,
              isDisabled: column.getDisabled && column.getDisabled(data),
            },
            {
              label: 'Yes',
              value: true,
              isDisabled: column.getDisabled && column.getDisabled(data),
            },
          ]}
        />
      ) : (
        <Input
          //  mt="-1px"
          py="0"
          h="100%"
          // data-testId={`${column?.accessor?.toString()}-${index}`}
          type={column.isNumeric ? 'number' : column.isTime ? 'time' : 'text'}
          w="100%"
          px="s8"
          minH="inherit"
          bg="primary.100"
          textAlign={column.isNumeric ? 'right' : 'left'}
          justifyContent={column.isNumeric ? 'flex-end' : 'flex-start'}
          _focus={{ boxShadow: 'none' }}
          _focusWithin={{ boxShadow: 'none' }}
          border="none"
          onWheel={(e) => e.currentTarget.blur()}
          borderRadius="0"
          // value={data[column.accessor] !== '' ? String(data[column.accessor]) : '1234'}
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
};
