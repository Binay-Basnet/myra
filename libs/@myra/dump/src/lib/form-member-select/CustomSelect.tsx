import { Flex } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  GroupBase,
  Props,
  Select as ChakraSelect,
  SelectComponentsConfig,
} from 'chakra-react-select';

import { TextFields } from '@myra/dump';

import { components as customComponents } from './SelectComponents';
import { chakraDefaultStyles } from './SelectStyles';

export interface Option {
  label?: string;
  value: string;
  memberInfo?: {
    image?: string;
    code?: string;
    memberName?: string;
    memberId?: string;
    gender?: string;
    age?: number | null | undefined;
    maritialStatus?: string;
    address?: string;
    profilePicUrl?: string | null | undefined;
  };
}

export interface SelectProps
  extends Omit<Props<Option, boolean, GroupBase<Option>>, 'size' | 'onChange'> {
  options?: Option[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  // size?: 'sm' | 'default';
  onChange?: ((newValue: Option) => void) | any;
}

export const Select = ({
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  ...rest
}: SelectProps) => (
  <Flex direction="column" gap="s4">
    <TextFields variant="formLabel" color="gray.700">
      {label}
    </TextFields>
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

export default Select;
