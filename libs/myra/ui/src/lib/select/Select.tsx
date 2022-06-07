import { Flex, Text } from '@chakra-ui/react';
import { ActionMeta, Props, Select as ChakraSelect } from 'chakra-react-select';

import { components } from './SelectComponents';
import { chakraStyles } from './SelectStyles';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends Omit<Props, 'size' | 'onChange'> {
  label?: string;
  options: SelectOption[];
  // // TODO Change this any.
  onChange?:
    | ((value: SelectOption | null, meta: ActionMeta<SelectOption>) => void)
    | any;
}

export function Select({ label, isMulti, options, ...rest }: SelectProps) {
  return (
    <Flex direction="column">
      {label && (
        <Text
          fontSize="s3"
          color="neutralColorLight.Gray-70"
          fontWeight="500"
          mb="s4"
          textTransform="capitalize"
        >
          {label}
        </Text>
      )}

      <ChakraSelect
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        isClearable={false}
        hideSelectedOptions={false}
        options={options.sort((a, b) =>
          a.label.localeCompare(b.label, undefined, { numeric: true })
        )}
        chakraStyles={chakraStyles}
        components={components}
        {...rest}
      />
    </Flex>
  );
}

export default Select;
