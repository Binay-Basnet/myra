import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { GroupBase, Props, Select as ChakraSelect } from 'chakra-react-select';

import { Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

import { getComponents, Option } from './styles/selectComponents';
import { getChakraDefaultStyles } from './styles/selectStyles';

interface SelectOption {
  label: string | number;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<Props<SelectOption, boolean, GroupBase<SelectOption>>, 'size' | 'onChange'> {
  options?: SelectOption[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  // size?: 'sm' | 'default';
  onChange?: ((newValue: SelectOption) => void) | any;
  hasRadioOption?: boolean;
  __placeholder?: string;
}

export const Select = ({
  // size,
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  hasRadioOption,
  placeholder,
  name,
  ...rest
}: SelectProps) => {
  const { t } = useTranslation();
  const [sortedOptions, setSortedOptions] = useState(options ?? []);

  useEffect(() => {
    if (isMulti) {
      setSortedOptions(options ?? []);
    }
  }, [JSON.stringify(options)]);

  return (
    <Flex direction="column" gap="s4">
      <Text variant="formLabel" color="gray.700">
        {label}
      </Text>
      <ChakraSelect<SelectOption, boolean, GroupBase<SelectOption>>
        key={!isMulti ? `my_unique_select_key__${JSON.stringify(value)}` : 'isMulti'}
        id="select"
        data-testid={name}
        instanceId="select"
        onMenuClose={() => {
          if (isMulti) {
            setSortedOptions((prev) =>
              (prev as Array<Option>)?.sort((optionA) => {
                if ((value as Array<Option>)?.find((v) => optionA.value === v.value)) {
                  return -1;
                }
                return 1;
              })
            );
          }
        }}
        placeholder={placeholder ?? t['select']}
        options={isMulti ? sortedOptions : options}
        value={value}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isOptionDisabled={(option) => !!option.disabled}
        isClearable={false}
        chakraStyles={getChakraDefaultStyles(!!errorText)}
        components={getComponents(hasRadioOption)}
        {...rest}
      />

      {errorText ? (
        <Text variant="formHelper" color="danger.500">
          {errorText}
        </Text>
      ) : helperText ? (
        <Text variant="formHelper" color="gray.700">
          {helperText}
        </Text>
      ) : null}
    </Flex>
  );
};

export default Select;
