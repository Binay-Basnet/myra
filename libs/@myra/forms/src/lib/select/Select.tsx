import { useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import {
  ActionMeta,
  GroupBase,
  MultiValue,
  Props,
  Select as ChakraSelect,
  SingleValue,
} from 'chakra-react-select';

import { Text } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

import { getComponents } from './styles/selectComponents';
import { getChakraDefaultStyles } from './styles/selectStyles';

interface SelectOption {
  label: string | number;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<Props<SelectOption, boolean, GroupBase<SelectOption>>, 'size'> {
  options?: SelectOption[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  // size?: 'sm' | 'default';
  onChange?: (
    newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
    actionMeta: ActionMeta<SingleValue<SelectOption> | MultiValue<SelectOption>>
  ) => void;
  hasRadioOption?: boolean;
  __placeholder?: string;
}

const selectAllOption = {
  value: '<SELECT_ALL>',
  label: 'All',
};

export const Select = ({
  // size,
  errorText,
  helperText,
  isMulti = false,
  label,
  options = [],
  value,
  hasRadioOption,
  placeholder,
  name,
  isRequired,
  onChange,
  ...rest
}: SelectProps) => {
  const { t } = useTranslation();

  const {
    isOptionSelected,
    getOptions,
    getValue,
    onChange: multiOnChange,
  } = useMulti({
    value: value as [],
    isMulti,
    onChange,
    options,
  });

  return (
    <Flex direction="column" gap="s4">
      <Text variant="formLabel" color="gray.700">
        {isRequired ? `${label} *` : label}
      </Text>

      <ChakraSelect<SelectOption, boolean, GroupBase<SelectOption>>
        key={!isMulti ? `my_unique_select_key__${JSON.stringify(value)}` : 'isMulti'}
        id="select"
        data-testid={name}
        instanceId="select"
        isOptionSelected={isOptionSelected}
        placeholder={placeholder ?? t['select']}
        options={getOptions()}
        value={getValue()}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isOptionDisabled={(option) => !!option.disabled}
        isClearable={false}
        onChange={multiOnChange}
        chakraStyles={getChakraDefaultStyles(!!errorText)}
        components={getComponents(hasRadioOption)}
        menuPosition="fixed"
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

interface IUseMultiProps {
  isMulti: boolean;
  value: MultiValue<SelectOption> | undefined;
  options: SelectOption[];
  onChange?: (
    newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
    actionMeta: ActionMeta<SingleValue<SelectOption> | MultiValue<SelectOption>>
  ) => void;
}

const useMulti = ({ isMulti, value, options, onChange: propOnChange }: IUseMultiProps) => {
  const valueRef = useRef(value);
  valueRef.current = value;

  if (!isMulti || !propOnChange) {
    return {
      isOptionSelected: undefined,
      getOptions: () => options,
      getValue: () => value,
      onChange: propOnChange,
    };
  }

  const valueRefCurrent = valueRef?.current;

  const isSelectAllSelected = () => valueRefCurrent?.length === options?.length;

  const isOptionSelected = (option: SelectOption) =>
    valueRef?.current?.some(({ value: newValue }) => newValue === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...options];
  const getValue = () => (isSelectAllSelected() ? [selectAllOption] : value);

  const onChange = (
    newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    const { action, option, removedValue } = actionMeta;
    if (action === 'select-option' && option?.value === selectAllOption.value) {
      propOnChange(options, actionMeta);
    } else if (
      (action === 'deselect-option' && option?.value === selectAllOption.value) ||
      (action === 'remove-value' && removedValue.value === selectAllOption.value)
    ) {
      propOnChange([], actionMeta);
    } else if (actionMeta.action === 'deselect-option' && isSelectAllSelected()) {
      propOnChange(
        options.filter(({ value: optionValue }) => optionValue !== option?.value),
        actionMeta
      );
    } else {
      propOnChange(newValue || [], actionMeta);
    }
  };

  return {
    isOptionSelected,
    getOptions,
    getValue,
    onChange,
  };
};
