import { IoCheckmarkSharp, IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Icon, Radio, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const getComponents: (
  hasRadio?: boolean,
  addItemHandler?: () => void,
  addItemLabel?: string,
  name?: string
) => SelectComponentsConfig<Option, boolean, GroupBase<Option>> = (
  hasRadio,
  addItemHandler,
  addItemLabel,
  name
) => ({
  Menu: ({ children, ...props }) => (
    <chakraComponents.Menu {...props}>
      <Box>
        {children}
        {addItemHandler && (
          <Box
            w="100%"
            h="3.125rem"
            bg="white"
            display="flex"
            alignItems="center"
            gap="s4"
            px="12px"
            py="14px"
            color="primary.500"
            cursor="pointer"
            onClick={addItemHandler}
          >
            <Icon h="14px" w="14px" as={AddIcon} />
            <Text fontSize="r1" fontWeight={500}>
              {addItemLabel ?? 'Add Item'}
            </Text>
          </Box>
        )}
      </Box>
    </chakraComponents.Menu>
  ),
  Placeholder: ({ children, ...props }) => {
    const { value } = props.selectProps;

    return (
      <chakraComponents.Placeholder {...props}>
        {props.isMulti ? (
          Array.isArray(value) ? (
            (value as Option[]).length === 0 || !value ? (
              props.selectProps.placeholder
            ) : value[0].value === '<SELECT_ALL>' ? (
              <Text color="gray.900">All items selected</Text>
            ) : (
              <Text color="gray.900">{`${(value as Option[]).length} items selected`}</Text>
            )
          ) : (
            children
          )
        ) : (
          children
        )}
      </chakraComponents.Placeholder>
    );
  },
  Control: ({ innerProps, ...props }) => (
    <chakraComponents.Control
      {...props}
      innerProps={
        {
          ...innerProps,
          'data-testid': `${name}`,
        } as unknown as Record<string, string>
      }
    />
  ),

  DropdownIndicator: (props) => {
    const { options } = props;
    return (
      <chakraComponents.DropdownIndicator {...props}>
        {options.length <= 5 ? (
          <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
        ) : (
          <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
        )}
      </chakraComponents.DropdownIndicator>
    );
  },
  Option: ({ children, ...props }) =>
    hasRadio ? (
      <chakraComponents.Option {...props} data-testid="testID">
        <Box display="flex" alignItems="center" gap="s8">
          <Box
            display="flex"
            onClick={(e) => {
              props.selectOption({ ...props.data });
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <Radio
              ref={props.innerRef}
              isDisabled={props.isDisabled}
              isChecked={props.isSelected}
            />
          </Box>

          {children}
        </Box>
      </chakraComponents.Option>
    ) : (
      <chakraComponents.Option
        {...props}
        data-testid="testID"
        innerProps={
          {
            ...props.innerProps,
            'data-testid': `${name}-${props?.data?.label?.toString().toLowerCase()}`,
          } as unknown as Record<string, string>
        }
      >
        {children}
        {props.isMulti ? (
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
        ) : props.isSelected ? (
          <Icon
            as={IoCheckmarkSharp}
            w="20px"
            h="20px"
            cursor="pointer"
            color="primary.500"
            className="multi-select-option"
          />
        ) : null}
      </chakraComponents.Option>
    ),
  SingleValue: (props) => {
    const { data, selectProps } = props;
    return (
      <chakraComponents.SingleValue {...props}>
        <Text
          fontSize="r1"
          fontWeight={400}
          color={selectProps?.menuIsOpen ? 'gray.500' : 'gray.800'}
        >
          {data?.label}
        </Text>
      </chakraComponents.SingleValue>
    );
  },
});
