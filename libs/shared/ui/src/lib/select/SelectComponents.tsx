import { IoCheckmarkSharp, IoChevronDownSharp } from 'react-icons/io5';
import { Icon } from '@chakra-ui/react';
import {
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';

export const components: SelectComponentsConfig<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
    </chakraComponents.DropdownIndicator>
  ),
  Option: ({ children, ...props }) => {
    return (
      <chakraComponents.Option {...props}>
        {children}
        {props.isMulti ? (
          <input type="checkbox" checked={props.isSelected} />
        ) : props.isSelected ? (
          <Icon
            as={IoCheckmarkSharp}
            w="20px"
            h="20px"
            cursor="pointer"
            color="primary.500"
          />
        ) : null}
      </chakraComponents.Option>
    );
  },
};
