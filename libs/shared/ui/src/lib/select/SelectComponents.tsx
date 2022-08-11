import {
  IoCheckmarkSharp,
  IoChevronDownSharp,
  IoSearch,
} from 'react-icons/io5';
import { Box, Checkbox, Icon, Text } from '@chakra-ui/react';
import {
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const components: SelectComponentsConfig<
  Option,
  boolean,
  GroupBase<Option>
> = {
  Placeholder: ({ children, ...props }) => {
    const value = props.selectProps.value;

    return (
      <chakraComponents.Placeholder {...props}>
        {props.isMulti ? (
          Array.isArray(value) ? (
            (value as Option[]).length === 0 || !value ? (
              props.selectProps.placeholder
            ) : (
              <Text color="gray.900">
                {`${(value as Option[]).length} items selected`}
              </Text>
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
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      {props.options.length <= 5 ? (
        <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
      ) : (
        <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
      )}
    </chakraComponents.DropdownIndicator>
  ),
  Option: ({ children, ...props }) => {
    return (
      <chakraComponents.Option {...props}>
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
    );
  },
};
