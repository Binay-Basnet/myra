import React, { ForwardedRef, Ref, useMemo, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import {
  ActionMeta,
  GroupBase,
  MultiValue,
  Props,
  Select as ChakraSelect,
  SelectInstance,
  SingleValue,
} from 'chakra-react-select';

import { Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { getComponents } from './styles/selectComponents';
// import { getComponents } from './styles/selectComponents';
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
  addItemHandler?: () => void;
  addItemLabel?: string;
  __placeholder?: string;
}

const selectAllOption = {
  value: '<SELECT_ALL>',
  label: 'All',
};

export const Select = React.forwardRef(
  (
    {
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
      addItemHandler,
      addItemLabel,
      ...rest
    }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
  ) => {
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

    const components = useMemo(
      () => getComponents(hasRadioOption, addItemHandler, addItemLabel, name),
      [hasRadioOption, addItemHandler, addItemLabel, name]
    );

    return (
      <Flex direction="column" gap="s4">
        <Text variant="formLabel" color="gray.700">
          {isRequired ? `${label} *` : label}
        </Text>
        <div data-testid={`${name}`}>
          <ChakraSelect<SelectOption, boolean, GroupBase<SelectOption>>
            key={!isMulti ? `my_unique_select_key__${JSON.stringify(value)}` : 'isMulti'}
            data-testid="select"
            id="select"
            name={name}
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
            chakraStyles={getChakraDefaultStyles(!!errorText, !!addItemHandler)}
            components={components}
            ref={
              ref as unknown as
                | Ref<SelectInstance<SelectOption, boolean, GroupBase<SelectOption>>>
                | undefined
            }
            {...rest}
          />
        </div>
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
  }
);

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

  const isSelectAllSelected = () =>
    options.length !== 0 && valueRefCurrent?.length === options?.length;

  const isOptionSelected = (option: SelectOption) =>
    valueRef?.current?.some(({ value: newValue }) => newValue === option.value) ||
    isSelectAllSelected();

  const getOptions = () => (options.length !== 0 ? [selectAllOption, ...options] : []);
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
