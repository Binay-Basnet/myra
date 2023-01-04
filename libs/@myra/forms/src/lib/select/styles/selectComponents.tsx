import { IoCheckmarkSharp, IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { Box, Checkbox, Icon, Radio, Text } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const getComponents: (
  hasRadio?: boolean
) => SelectComponentsConfig<Option, boolean, GroupBase<Option>> = (hasRadio) => ({
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
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      {props.options.length <= 5 ? (
        <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
      ) : (
        <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
      )}
    </chakraComponents.DropdownIndicator>
  ),
  Option: ({ children, ...props }) =>
    hasRadio ? (
      <chakraComponents.Option {...props}>
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
    ),
});
