import React, {
  Dispatch,
  ForwardedRef,
  Fragment,
  SetStateAction,
  useId,
  useMemo,
  useState,
} from 'react';
import { BsFilter } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Spacer,
  Text,
} from '@chakra-ui/react';
import qs from 'qs';

import { URLFilter } from '@coop/shared/utils';

type Option = {
  label: string;
  value: string;
};

export interface TableListFilterContentProps {
  data?: Option[];
  onClose?: () => void;
  filterValue?: Option[];
  setFilter?: (updater: Option[]) => void;
}

interface TableListFilterProps {
  data?: Option[];
  column: string;
  comparator?: '=' | '<' | '>' | '< >' | 'CONTAINS';
}

export const TableListFilter = ({ data, column, comparator }: TableListFilterProps) => {
  const router = useRouter();
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  const parsedQuery = qs.parse(router.query['filter'] as string, {
    allowDots: true,
    parseArrays: true,
    comma: true,
  }) as URLFilter;

  const filterCols = Object.keys(parsedQuery);

  return (
    <Popover
      isLazy
      placement="bottom-start"
      initialFocusRef={initialFocusRef}
      colorScheme="primary"
    >
      {({ onClose, isOpen }) => (
        <>
          <PopoverTrigger>
            <Box as="button" display="flex" alignItems="center">
              <Icon
                as={BsFilter}
                w="s20"
                h="s20"
                p="s4"
                rounded="br1"
                _hover={{ bg: 'background.500' }}
                bg={isOpen || filterCols.includes(column) ? 'background.500' : 'transparent'}
                color={isOpen ? 'primary.500' : ''}
              />
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent w="100%" boxShadow="E2" border="none" borderRadius="br2">
              {initialFocusRef && (
                <TableListFilterContent
                  data={data}
                  setFilter={(newFilter) => {
                    if (newFilter.length !== 0) {
                      const queryString = qs.stringify(
                        {
                          ...parsedQuery,
                          [column]: {
                            value: newFilter.map((f) => f.value),
                            compare: comparator || '=',
                          },
                        },
                        { allowDots: true, arrayFormat: 'brackets', encode: false }
                      );

                      router.push(
                        {
                          query: {
                            ...router.query,
                            filter: queryString,
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    } else {
                      router.push(
                        {
                          query: {
                            ...router.query,
                            filter: [],
                          },
                        },
                        undefined,
                        { shallow: true }
                      );
                    }
                  }}
                  filterValue={
                    data?.filter((d) =>
                      (parsedQuery?.[column]?.value as string[])?.includes(d.value)
                    ) || []
                  }
                  onClose={onClose}
                  ref={initialFocusRef}
                />
              )}
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};

export const TableListFilterContent = React.forwardRef(
  (
    { data, onClose, setFilter, filterValue }: TableListFilterContentProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const id = useId();
    const [selectedData, setSelectedData] = useState<Option[]>(filterValue ?? []);
    const [searchTerm, setSearchTerm] = useState('');

    const listData = useMemo(
      () => (data ? data?.filter((item) => item.label.match(new RegExp(searchTerm, 'i'))) : []),
      [data, searchTerm]
    );

    const isSelectionFull = useMemo(
      () => selectedData?.length === listData?.length,
      [listData?.length, selectedData?.length]
    );
    const isSelectionEmpty = useMemo(() => selectedData?.length === 0, [selectedData?.length]);

    return (
      <Box borderRadius="br1" width="350px" display="flex" flexDirection="column" bg="white">
        <Box px="s8" py="s12" borderBottom="1px" borderBottomColor="border.layout">
          <InputGroup color={searchTerm ? 'gray.500' : 'gray.300'}>
            <InputLeftElement>
              <Icon as={SearchIcon} size="sm" />
            </InputLeftElement>
            <Input
              bg="white"
              size="md"
              borderRadius="br2"
              py="12px"
              focusBorderColor="primary.500"
              fontSize="r1"
              border="1px"
              borderColor="gray.300"
              placeholder="Search"
              value={searchTerm}
              ref={ref}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>

        <Box display="flex" flexDirection="column" p="s8" gap="s12">
          {listData.length === 0 ? (
            <Box
              pt="s32"
              h="230px"
              fontSize="s3"
              color="gray.500"
              fontWeight={400}
              textAlign="center"
              whiteSpace="break-spaces"
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '7px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '7px',
                  background: '#EEF1F7',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#006837',
                  borderRadius: '24px',
                },
              }}
            >
              No Search result for &quot;{searchTerm}&quot;
            </Box>
          ) : (
            <Box gap="s12" display="flex" justifyContent="flex-end">
              <Text
                color={isSelectionFull ? 'gray.300' : 'gray.700'}
                fontSize="s3"
                fontWeight="400"
                cursor={isSelectionFull ? 'not-allowed' : 'pointer'}
                onClick={() => !isSelectionFull && setSelectedData(data ? [...data] : [])}
              >
                Select All
              </Text>
              <Text
                color={isSelectionEmpty ? 'gray.300' : 'gray.700'}
                fontSize="s3"
                fontWeight="400"
                cursor={isSelectionEmpty ? 'not-allowed' : 'pointer'}
                onClick={() => setSelectedData([])}
              >
                Deselect All
              </Text>
            </Box>
          )}

          <Box
            fontSize="s3"
            bg="white"
            borderRadius="br2"
            border="0px"
            maxHeight="230px"
            borderColor="border.layout"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '7px',
              },
              '&::-webkit-scrollbar-track': {
                width: '7px',
                background: '#EEF1F7',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#006837',
                borderRadius: '24px',
              },
            }}
          >
            {listData.map((listItem) => {
              const hasListItem = selectedData.includes(listItem);

              return (
                <Fragment key={listItem + id}>
                  <TableListCheckbox
                    isChecked={hasListItem}
                    listItem={listItem}
                    setSelectedData={setSelectedData}
                  />
                </Fragment>
              );
            })}
          </Box>
        </Box>

        <Flex
          p="s8"
          borderTop="1px"
          borderTopColor="border.layout"
          alignItems="center"
          fontSize="r1"
        >
          <Text
            color="gray.500"
            fontWeight="400"
            fontSize="s3"
            cursor={isSelectionFull ? 'not-allowed' : 'pointer'}
            onClick={() => setSelectedData([])}
          >
            Reset To Default
          </Text>
          <Spacer />
          <Button
            w="100px"
            onClick={() => {
              setFilter && setFilter(selectedData);
              onClose && onClose();
            }}
          >
            Apply
          </Button>
        </Flex>
      </Box>
    );
  }
);

interface ITableListCheckboxProps {
  isChecked: boolean;
  listItem: Option;
  setSelectedData: Dispatch<SetStateAction<Option[]>>;
}

const TableListCheckbox = React.memo(
  ({ listItem, setSelectedData, isChecked }: ITableListCheckboxProps) => (
    <Box
      display="flex"
      alignItems="center"
      px="s12"
      justifyContent="space-between"
      bg={isChecked ? 'highlight.500' : 'inherit'}
      _hover={{ background: 'highlight.500' }}
      cursor="pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        !isChecked
          ? setSelectedData((prev) => [...prev, listItem])
          : setSelectedData((prev) => prev.filter((item) => item.value !== listItem.value));
      }}
    >
      <Text cursor="pointer" paddingY="12px" fontWeight="normal" noOfLines={1} maxWidth={48}>
        {listItem.label}
      </Text>
      <Checkbox colorScheme="green" isChecked={isChecked} />
    </Box>
  ),
  (prevProps, nextProps) => prevProps.isChecked === nextProps.isChecked
);

export default TableListFilter;
