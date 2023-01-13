import { useRef, useState } from 'react';
import { IoCheckmarkSharp, IoSearch } from 'react-icons/io5';
import { Checkbox, Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@chakra-ui/react';
import {
  chakraComponents,
  ChakraStylesConfig,
  GroupBase,
  Props,
  Select,
} from 'chakra-react-select';

import { Avatar, Box, Button, Icon, Text } from '@myra-ui/foundations';

type Option = {
  label: string;
  value: string;
};

type MemberOption = {
  id: string;
  url: string;
  name: string;
};

type ValueType = Readonly<Option | Option[] | MemberOption[] | MemberOption | null>;

export interface SelectPopoutProps {
  optionType: 'member' | 'default';
}

type SelectProps = Props<Option | MemberOption, boolean, GroupBase<Option | MemberOption>>;

export type TSelectPopoutProps =
  | (SelectProps & {
      popoverBtn: (selectedValue: ValueType) => React.ReactNode;
      optionType?: 'default' | undefined;
      options: Option[];
    })
  | (SelectProps & {
      popoverBtn: (selectedValue: ValueType) => React.ReactNode;
      optionType: 'member';
      options: MemberOption[];
    });

export const SelectPopout = ({ optionType, options, popoverBtn, ...rest }: TSelectPopoutProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [value, setValue] = useState<ValueType>((rest.value as ValueType) ?? null);
  const [selectValue, setSelectValue] = useState<ValueType>(null);

  const firstFieldRef = useRef(null);

  return (
    <Popover
      initialFocusRef={firstFieldRef}
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setSelectValue(value);
      }}
      placement="bottom-start"
    >
      <PopoverTrigger>
        {popoverBtn && <Box onClick={onToggle}>{popoverBtn(value)}</Box>}
        {/* <Button w="200px" >
          Selected Value :{' '}
          {(() => {
            if (Array.isArray(value)) {
              return `${value?.length} selected`;
            }
            if (value?.label) {
              return `${value?.label}`;
            }
            return 'NONE';
          })()}
        </Button> */}
      </PopoverTrigger>
      <PopoverContent w="360px">
        <Box p="s16" boxShadow="E2" borderRadius="br2" display="flex" flexDir="column" gap="s16">
          <Select<Option | MemberOption, boolean, GroupBase<Option | MemberOption>>
            autoFocus
            ref={firstFieldRef}
            isMulti
            backspaceRemovesValue={false}
            components={{
              IndicatorSeparator: null,
              DropdownIndicator: (props) => (
                <chakraComponents.DropdownIndicator {...props}>
                  <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
                </chakraComponents.DropdownIndicator>
              ),
              Option: ({ children, ...props }) => (
                <chakraComponents.Option {...props}>
                  {optionType === 'member' && 'id' in props.data ? (
                    <Box w="auto" display="flex" alignItems="center" py="s8" px="s16" gap="s16">
                      <Box borderRadius="full">
                        <Avatar src={props.data.url} size="md" name={props.data.name} />
                      </Box>
                      <Box display="flex" flexDirection="column">
                        <Text fontWeight="500" fontSize="r1" color="gray.800">
                          {props.data.name}
                        </Text>
                        <Text fontSize="s3" color="gray.800">
                          {props.data.id}
                        </Text>
                      </Box>
                    </Box>
                  ) : (
                    children
                  )}

                  {(() => {
                    if (props.isMulti) {
                      return (
                        <Box
                          display="flex"
                          onClick={(e) => {
                            props.selectOption({ ...props.data });
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          <Checkbox
                            ref={props.innerRef}
                            isDisabled={props.isDisabled}
                            isChecked={props.isSelected}
                          />
                        </Box>
                      );
                    }
                    if (props?.isSelected) {
                      <Icon
                        as={IoCheckmarkSharp}
                        w="20px"
                        h="20px"
                        cursor="pointer"
                        color="primary.500"
                        className="multi-select-option"
                      />;
                    }

                    return null;
                  })()}
                </chakraComponents.Option>
              ),
            }}
            controlShouldRenderValue={false}
            hideSelectedOptions={false}
            isClearable={false}
            onChange={(newValue) => {
              setSelectValue(newValue as ValueType);
            }}
            menuIsOpen
            options={options}
            placeholder="Search..."
            chakraStyles={chakraSmallStyles(optionType)}
            tabSelectsValue={false}
            defaultValue={value}
            value={selectValue}
            getOptionLabel={(option) => ('id' in option ? option.name : option.label)}
            getOptionValue={(option) => ('id' in option ? option.id : option.value)}
            {...rest}
          />
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Button
              shade="neutral"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectValue(null);
              }}
            >
              Reset To Default
            </Button>
            <Button
              w="120px"
              size="sm"
              onClick={() => {
                onClose();
                if (selectValue) {
                  rest?.onChange?.(selectValue, {
                    action: 'select-option',
                    option: undefined,
                  });
                }
                setValue(selectValue);
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default SelectPopout;

export const chakraSmallStyles: (
  optionType: 'member' | 'default' | undefined
) =>
  | ChakraStylesConfig<Option | MemberOption, boolean, GroupBase<Option | MemberOption>>
  | undefined = (optionType) => ({
  menu: () => ({
    mt: 's16',
    maxHeight: '328px',
    zIndex: '5',
  }),
  menuList: (provided) => ({
    ...provided,
    width: '100%',
    maxHeight: '328px',
    paddingY: '0',
    minWidth: 'none',
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-track': {
      width: '7px',
      background: 'gray.100',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'primary.500',
      borderRadius: '10px',
    },
  }),
  option: (provided, state) => ({
    ...provided,

    color: (() => {
      if (state.isSelected && !state.isMulti && state.options.length > 5) {
        return 'primary.500';
      }
      if (state.isDisabled) {
        return 'neutralColorLight.Gray-40';
      }
      return 'neutralColorLight.Gray-80';
    })(),

    fontWeight: state.isSelected && !state.isMulti ? 600 : 400,
    bg: state.isFocused ? 'highlight.500' : 'none',
    p: 's12',
    height: 's64',

    borderBottom: optionType === 'member' ? '1px' : 'none',
    borderBottomColor: 'border.layout',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 'r1',
    _hover: {
      bg: 'highlight.500',
    },
    _disabled: {
      opacity: 1,
    },
  }),
  control: (provided) => ({
    ...provided,
    bg: 'white',
    cursor: 'text',
    borderRadius: 'br2',
    px: 's12',
    minHeight: 0,
    height: '36px',
    justifyContent: 'space-between',
  }),
  valueContainer: (provided, state) => ({
    p: 's12',
    display: 'flex',
    alignItems: 'center',
    height: '36px',
    color: state.hasValue ? 'neutralColorLight.Gray-80' : 'neutralColorLight.Gray-50',
    fontSize: 'r1',
  }),
  placeholder: (provided) => ({
    ...provided,
    lineHeight: '100%',
    color: 'neutralColorLight.Gray-50',
    fontSize: 'r1',
    noOfLines: 1,
  }),

  input: (provided) => ({
    ...provided,
    mt: '-0.5',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  singleValue: (provided) => ({
    ...provided,
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    height: '36px',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (provided, state) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 's12',
    color: state.isFocused ? 'primary.500' : 'neutralColorLight.Gray-50',
  }),
  loadingIndicator: () => ({
    display: 'none',
  }),
  loadingMessage: (provided) => ({
    ...provided,
    fontSize: 'r1',
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: 'r1',
  }),
});
