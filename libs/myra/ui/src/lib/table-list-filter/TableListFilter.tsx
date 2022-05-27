import {
  Box,
  Checkbox,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, {
  Dispatch,
  ForwardedRef,
  Fragment,
  SetStateAction,
  useId,
  useMemo,
  useState,
} from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import { PopoverContent, PopoverTrigger } from '../popover/Popover';
import { BsFilter } from 'react-icons/bs';

export interface TableListFilterProps {
  name?: string;
  data?: string[];
  ref: React.MutableRefObject<HTMLInputElement | null>;
  onClose?: () => void;
  filterValue?: string[];
  setFilter?: (updater: string[]) => void;
}

const dummyData = [
  'Nepal Investment Bank',
  'Prabhu Bank',
  'NIC Asia',
  'NIBL Bank',
  'Ganapati Bank',
  'Nabil Bank',
  'ABCD Bank',
  'Test Bank',
];

const BLANK_OPTION = '( Blank )';

export function TableListFilter() {
  const initialFocusRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <Popover
      isLazy
      placement="auto-end"
      initialFocusRef={initialFocusRef}
      colorScheme="primary"
    >
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton aria-label={'open'}>
              <Icon as={BsFilter} size="md" />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent _focus={{ boxShadow: 'E2' }}>
            {initialFocusRef && (
              <TableListFilterContent onClose={onClose} ref={initialFocusRef} />
            )}
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

export const TableListFilterContent = React.forwardRef(
  (
    { data = dummyData, onClose, setFilter, filterValue }: TableListFilterProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const id = useId();
    const [selectedData, setSelectedData] = useState<string[]>(
      filterValue ?? [BLANK_OPTION]
    );
    const [searchTerm, setSearchTerm] = useState('');

    const listData = useMemo(() => [BLANK_OPTION, ...data], []);

    const isSelectionFull = useMemo(
      () => selectedData?.length === listData?.length,
      [selectedData?.length]
    );
    const isSelectionEmpty = useMemo(
      () => selectedData?.length === 0,
      [selectedData?.length]
    );

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
          <Box
            gap="s20"
            display="flex"
            justifyContent="flex-end"
            color="gray.800"
            fontSize="r1"
          >
            <Text
              color={isSelectionFull ? 'gray.300' : 'gray.800'}
              fontWeight="medium"
              cursor={isSelectionFull ? 'not-allowed' : 'pointer'}
              onClick={() =>
                !isSelectionFull && setSelectedData([...data, BLANK_OPTION])
              }
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
            onClick={() => setSelectedData([BLANK_OPTION])}
          >
            Reset To Default
          </Text>
          <Spacer />
          <Button
            paddingX="12"
            onClick={() => {
              if (setFilter) {
                if (
                  selectedData?.length === 1 &&
                  selectedData.includes(BLANK_OPTION)
                ) {
                  setFilter([]);
                } else {
                  setFilter(
                    selectedData.filter((data) => data !== BLANK_OPTION)
                  );
                }
              }
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
  listItem: string;
  setSelectedData: Dispatch<SetStateAction<string[]>>;
}

const TableListCheckbox = React.memo(
  ({ listItem, setSelectedData, isChecked }: ITableListCheckboxProps) => {
    return (
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
            : setSelectedData((prev) => prev.filter((e) => e !== listItem));
        }}
      >
        <Text
          cursor="pointer"
          paddingY="12px"
          fontWeight="normal"
          noOfLines={1}
          maxWidth={48}
        >
          {listItem}
        </Text>
        <Checkbox colorScheme="green" isChecked={isChecked} />
      </Box>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.isChecked === nextProps.isChecked;
  }
);

export default TableListFilter;
