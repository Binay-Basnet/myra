import {
  chakraComponents,
  GroupBase,
  SelectComponentsConfig,
} from 'chakra-react-select';
import { Checkbox, Icon } from '@chakra-ui/react';
import { IoCheckmarkSharp, IoChevronDownSharp } from 'react-icons/io5';

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
          <Checkbox isChecked={props.isSelected} />
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
