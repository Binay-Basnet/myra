import { OptionBase, Props, Select as ChakraSelect } from 'chakra-react-select';
import { Flex, Text } from '@chakra-ui/react';
import { chakraStyles } from './SelectStyles';
import { components } from './SelectComponents';

export interface SelectOption extends OptionBase {
  label: string;
  value: string;
}

export interface SelectProps extends Omit<Props, 'size'> {
  label?: string;
  options: SelectOption[];
}

export function Select({ label, isMulti, ...rest }: SelectProps) {
  return (
    <Flex direction="column">
      <Text
        fontSize="r1"
        color="neutralColorLight.Gray-70"
        fontWeight="500"
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
