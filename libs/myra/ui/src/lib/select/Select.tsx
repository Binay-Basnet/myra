import { Flex, Text } from '@chakra-ui/react';
import { OptionBase, Props, Select as ChakraSelect } from 'chakra-react-select';

import { components } from './SelectComponents';
import { chakraStyles } from './SelectStyles';

export interface SelectOption extends OptionBase {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<Props, 'size' | 'onChange'> {
  label?: string;
  options: SelectOption[];
  // TODO Change this any.
  onChange?: any;
}

export function Select({ label, isMulti, ...rest }: SelectProps) {
  return (
    <Flex direction="column">
      <Text
        fontSize="s3"
        color="neutralColorLight.Gray-70"
        fontWeight="500"
        mb="s4"
        textTransform="capitalize"
      >
        {label}
      </Text>
      <ChakraSelect
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        isClearable={false}
        hideSelectedOptions={false}
        chakraStyles={chakraStyles}
        components={components}
        {...rest}
      />
    </Flex>
  );
}

export default Select;
