import { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GroupBase, Props, Select as ChakraSelect } from 'chakra-react-select';

import { components as customComponents, Option } from './SelectComponents';
import { chakraDefaultStyles } from './SelectStyles';
import TextFields from '../text-fields/TextFields';

interface SelectOption {
  label: string | number;
  value: string | number;
}

export interface SelectProps
  extends Omit<
    Props<SelectOption, boolean, GroupBase<SelectOption>>,
    'size' | 'onChange'
  > {
  helperText?: string;
  errorText?: string;
  options: SelectOption[];
  label?: string;
  size?: 'sm' | 'default';
  onChange?: ((newValue: SelectOption) => void) | any;
}

export function Select({
  size,
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  ...rest
}: SelectProps) {
  const [sortedOptions, setSortedOptions] = useState(options);

  return (
    <Flex direction="column" gap="s4">
      {label && (
        <TextFields variant="formLabel" color="gray.700">
          {label}
        </TextFields>
      )}
      <ChakraSelect<SelectOption, boolean, GroupBase<SelectOption>>
        onMenuClose={() => {
          setSortedOptions((prev) =>
            (prev as Array<Option>)?.sort((optionA) => {
              if (
                (value as Array<Option>)?.find((v) => optionA.value === v.value)
              ) {
                return -1;
              } else {
                return 1;
              }
            })
          );
        }}
        options={sortedOptions}
        value={value}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isClearable={false}
        chakraStyles={chakraDefaultStyles}
        components={customComponents}
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
