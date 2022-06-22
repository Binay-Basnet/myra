import { Flex } from '@chakra-ui/react';
import { ActionMeta, Props, Select as ChakraSelect } from 'chakra-react-select';

import { components } from './SelectComponents';
import { chakraStyles } from './SelectStyles';
import TextFields from '../text-fields/TextFields';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends Omit<Props, 'size' | 'onChange'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  errorText?: string;
  // // TODO Change this any.
  onChange?:
    | ((value: SelectOption | null, meta: ActionMeta<SelectOption>) => void)
    | any;
}

export function Select({
  label,
  isMulti,
  options,
  errorText,
  helperText,
  ...rest
}: SelectProps) {
  return (
    <Flex direction="column" gap="s4">
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}

      <ChakraSelect
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        isClearable={false}
        hideSelectedOptions={false}
        // options={options?.sort((a, b) =>
        //   a.label.localeCompare(b.label, undefined, { numeric: true })
        // )}
        options={options}
        chakraStyles={chakraStyles}
        components={components}
        {...rest}
      />

      {errorText ? (
        <TextFields variant="formHelper" color="danger.500">
          {errorText}
        </TextFields>
      ) : helperText ? (
        <TextFields variant="formHelper" color="gray.700">
          {helperText}
        </TextFields>
      ) : null}
    </Flex>
  );
}

export default Select;
