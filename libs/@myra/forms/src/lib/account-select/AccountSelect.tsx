import { Flex } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  GroupBase,
  Props,
  Select as ChakraSelect,
  SelectComponentsConfig,
} from 'chakra-react-select';

import { Text } from '@myra-ui/foundations';

import { components as customComponents } from './styles/selectComponents';
import { chakraDefaultStyles } from './styles/selectStyles';

interface Option {
  label?: string;
  value: string;
  accountInfo?: {
    accountName?: string;
    accountId?: string;
    accountType?: string;
    balance?: string;
    fine?: string;
    productName: string;
  };
}

export interface AccountSelectProps
  extends Omit<Props<Option, boolean, GroupBase<Option>>, 'size' | 'onChange'> {
  options?: Option[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  // size?: 'sm' | 'default';
  onChange?: ((newValue: Option) => void) | any;
}

export const AccountSelect = ({
  // size,
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  ...rest
}: AccountSelectProps) => {
  // a filter function that runs against each 'option' in `options`
  const filterOption = (option: any, inputValue: string): boolean =>
    (option.label.toString().match(inputValue) || []).length > 0;

  return (
    <Flex direction="column" gap="s4">
      <Text variant="formLabel" color="gray.700">
        {label}
      </Text>
      <ChakraSelect<Option, boolean, GroupBase<Option>>
        options={options}
        value={value}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isClearable={false}
        chakraStyles={chakraDefaultStyles as ChakraStylesConfig<Option, boolean, GroupBase<Option>>}
        components={
          customComponents as Partial<SelectComponentsConfig<Option, boolean, GroupBase<Option>>>
        }
        filterOption={filterOption}
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

export default AccountSelect;
