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
  Spacer,
  Text,
} from '@chakra-ui/react';
import qs from 'qs';

import { PopoverContent, PopoverTrigger } from '@myra-ui/components';

type ListData = { label: string; value: string }[];

export interface TableListFilterContentProps {
  data?: ListData;
  onClose?: () => void;
  filterValue?: ListData;
  setFilter?: (updater: ListData) => void;
}

interface TableListFilterProps {
  data?: ListData;
}

export const TableListFilter = ({ data }: TableListFilterProps) => {
  const router = useRouter();
  // const [filter, setFilter] = useState<ListData>([]);
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

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
                bg={isOpen ? 'background.500' : 'transparent'}
                color={isOpen ? 'primary.500' : ''}
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent _focus={{ boxShadow: 'E2' }}>
            {initialFocusRef && (
              <TableListFilterContent
                data={data}
                setFilter={(newValue) => {
                  router.push({
                    query: {
                      filter: qs.stringify(newValue.map((v) => v.value)),
                    },
                  });
                }}
                filterValue={[]}
                onClose={onClose}
                ref={initialFocusRef}
              />
            )}
          </PopoverContent>
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
    const [selectedData, setSelectedData] = useState<ListData>(filterValue ?? []);
    const [searchTerm, setSearchTerm] = useState('');

    const listData = useMemo(() => (data ? [...data] : []), []);

    const isSelectionFull = useMemo(
      () => selectedData?.length === listData?.length,
      [selectedData?.length]
    );
    const isSelectionEmpty = useMemo(() => selectedData?.length === 0, [selectedData?.length]);

    return (
      <Box
        borderRadius="br1"
        shadow="E2"
        width="360px"
        display="flex"
        flexDirection="column"
        gap="s16"
        padding="s16"
        bg="white"
      >
        <InputGroup color="neutralColorLight.Gray-50">
          <InputLeftElement>
            <Icon as={SearchIcon} size="sm" />
          </InputLeftElement>
          <Input
            type="search"
            bg="white"
            borderRadius="br1"
            py="12px"
            focusBorderColor="primary.500"
            fontSize="r1"
            border="1px"
            borderColor="gray.500"
            placeholder="Search"
            value={searchTerm}
            ref={ref}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Box display="flex" flexDirection="column" gap="s8">
          <Box gap="s20" display="flex" justifyContent="flex-end" color="gray.800" fontSize="r1">
            <Text
              color={isSelectionFull ? 'gray.300' : 'gray.800'}
              fontWeight="medium"
              cursor={isSelectionFull ? 'not-allowed' : 'pointer'}
              onClick={() => !isSelectionFull && setSelectedData(data ? [...data] : [])}
            >
              Select All
            </Text>
            <Text
              color={isSelectionEmpty ? 'gray.300' : 'gray.800'}
              fontWeight="medium"
              cursor={isSelectionEmpty ? 'not-allowed' : 'pointer'}
              onClick={() => setSelectedData([])}
            >
              Deselect All
            </Text>
          </Box>
          <Box
            fontSize="s3"
            bg="white"
            borderRadius="br2"
            border="1px"
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
        <Flex alignItems="center" fontSize="r1">
          <Text
            color="gray.800"
            fontWeight="medium"
            paddingX="s8"
            cursor={isSelectionFull ? 'not-allowed' : 'pointer'}
            onClick={() => setSelectedData([])}
          >
            Reset To Default
          </Text>
          <Spacer />
          <Button
            paddingX="12"
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
  listItem: { label: string; value: string };
  setSelectedData: Dispatch<SetStateAction<{ label: string; value: string }[]>>;
}

const TableListCheckbox = React.memo(
  ({ listItem, setSelectedData, isChecked }: ITableListCheckboxProps) => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX="20px"
      bg={isChecked ? 'highlight.500' : 'inherit'}
      _hover={{ background: 'highlight.500' }}
      cursor="pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        !isChecked
          ? setSelectedData((prev) => [...prev, listItem])
          : setSelectedData((prev) => prev.filter((item) => item !== listItem));
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
