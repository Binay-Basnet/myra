import React, { ForwardedRef, Ref, useMemo, useRef } from 'react';
import { IoCheckmarkSharp, IoChevronDownSharp, IoSearch } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Checkbox, Flex, Icon, Radio } from '@chakra-ui/react';
import {
  ActionMeta,
  chakraComponents,
  GroupBase,
  MultiValue,
  Props,
  Select as ChakraSelect,
  SelectComponentsConfig,
  SelectInstance,
  SingleValue,
} from 'chakra-react-select';

import { Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

// import { getComponents } from './styles/selectComponents';
import { getChakraDefaultStyles } from './styles/selectStyles';

interface SelectOption {
  label: string | number;
  value: string | number;
  disabled?: boolean;
}

interface Option {
  label: string | number;
  value: string | number;
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

    const components: SelectComponentsConfig<Option, boolean, GroupBase<Option>> = useMemo(
      () => ({
        Menu: ({ children, ...props }) => (
          <chakraComponents.Menu {...props}>
            <Box>
              {children}
              {addItemHandler && (
                <Box
                  w="100%"
                  h="50px"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  gap="s4"
                  px="12px"
                  py="14px"
                  color="primary.500"
                  cursor="pointer"
                  onClick={addItemHandler}
                >
                  <Icon h="14px" w="14px" as={AddIcon} />
                  <Text fontSize="r1" fontWeight={500}>
                    {addItemLabel ?? 'Add Item'}
                  </Text>
                </Box>
              )}
            </Box>
          </chakraComponents.Menu>
        ),
        Placeholder: ({ children, ...props }) => {
          const { value: selectValue } = props.selectProps;

          return (
            <chakraComponents.Placeholder {...props}>
              {props.isMulti ? (
                Array.isArray(selectValue) ? (
                  (selectValue as Option[]).length === 0 || !selectValue ? (
                    props.selectProps.placeholder
                  ) : selectValue[0].selectValue === '<SELECT_ALL>' ? (
                    <Text color="gray.900">All items selected</Text>
                  ) : (
                    <Text color="gray.900">{`${
                      (selectValue as Option[]).length
                    } items selected`}</Text>
                  )
                ) : (
                  children
                )
              ) : (
                children
              )}
            </chakraComponents.Placeholder>
          );
        },
        DropdownIndicator: (props) => {
          const { options: selectOptions } = props;
          return (
            <chakraComponents.DropdownIndicator {...props}>
              {selectOptions.length <= 5 ? (
                <Icon as={IoChevronDownSharp} w="20px" h="20px" cursor="pointer" />
              ) : (
                <Icon as={IoSearch} w="20px" h="20px" cursor="pointer" />
              )}
            </chakraComponents.DropdownIndicator>
          );
        },
        Option: ({ children, ...props }) =>
          hasRadioOption ? (
            <chakraComponents.Option {...props}>
              <Box display="flex" alignItems="center" gap="s8">
                <Box
                  display="flex"
                  onClick={(e) => {
                    props.selectOption({ ...props.data });
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Radio
                    ref={props.innerRef}
                    isDisabled={props.isDisabled}
                    isChecked={props.isSelected}
                  />
                </Box>

                {children}
              </Box>
            </chakraComponents.Option>
          ) : (
            <chakraComponents.Option {...props}>
              {children}
              {props.isMulti ? (
                <Box
                  display="flex"
                  onClick={(e) => {
                    props.selectOption({ ...props.data });
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Checkbox
                    ref={props.innerRef}
                    isDisabled={props.isDisabled}
                    isChecked={props.isSelected}
                  />
                </Box>
              ) : props.isSelected ? (
                <Icon
                  as={IoCheckmarkSharp}
                  w="20px"
                  h="20px"
                  cursor="pointer"
                  color="primary.500"
                  className="multi-select-option"
                />
              ) : null}
            </chakraComponents.Option>
          ),
        SingleValue: (props) => {
          const { data, selectProps } = props;
          return (
            <chakraComponents.SingleValue {...props}>
              <Text
                fontSize="r1"
                fontWeight={400}
                color={selectProps?.menuIsOpen ? 'gray.500' : 'gray.800'}
              >
                {data?.label}
              </Text>
            </chakraComponents.SingleValue>
          );
        },
      }),
      []
    );

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
          chakraStyles={getChakraDefaultStyles(!!errorText, !!addItemHandler)}
          components={components}
          ref={
            ref as unknown as Ref<SelectInstance<SelectOption, boolean, GroupBase<SelectOption>>> | undefined
          }
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
