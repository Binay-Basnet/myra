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

export interface MemberSelectProps
  extends Omit<Props<Option, boolean, GroupBase<Option>>, 'size' | 'onChange'> {
  options?: Option[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  // size?: 'sm' | 'default';`
  onChange?: ((newValue: Option) => void) | any;
}

export const MemberSelect = ({
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  ...rest
}: MemberSelectProps) => (
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

export default MemberSelect;
