import { IoSearch } from 'react-icons/io5';
import { Icon } from '@chakra-ui/react';
import { chakraComponents, GroupBase, SelectComponentsConfig } from 'chakra-react-select';

export interface Option {
  label: string | number;
  value: string | number;
}

export const components: SelectComponentsConfig<Option, boolean, GroupBase<Option>> = {
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={IoSearch} fontSize="lg" cursor="pointer" />
    </chakraComponents.DropdownIndicator>
  ),
};
