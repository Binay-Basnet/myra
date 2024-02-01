import { useMemo } from 'react';
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

export interface IMemberInfo {
  image?: string;
  code?: string;
  memberName?: string;
  memberId?: string;
  gender?: string;
  age?: number | null | undefined;
  maritialStatus?: string;
  address?: string;
  profilePicUrl?: string | null | undefined;
  branch?: string | null | undefined;
  contact?: string | null | undefined;
}

export interface Option {
  label?: string;
  value: string;
  memberInfo?: IMemberInfo;
}

export interface MemberSelectProps
  extends Omit<Props<Option, boolean, GroupBase<Option>>, 'size' | 'onChange'> {
  options?: Option[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  name?: string;
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

  name,
  isRequired,
  ...rest
}: MemberSelectProps) => {
  const components = useMemo(() => customComponents(name), [name]);

  return (
    <Flex direction="column" gap="s4">
      <Text variant="formLabel" color="gray.700">
        {isRequired ? `${label} *` : label}
      </Text>
      {/* <div data-testid={`${name}`}> */}
      <ChakraSelect<Option, boolean, GroupBase<Option>>
        options={options}
        value={value}
        name={name}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isClearable
        chakraStyles={chakraDefaultStyles as ChakraStylesConfig<Option, boolean, GroupBase<Option>>}
        components={
          components as Partial<SelectComponentsConfig<Option, boolean, GroupBase<Option>>>
        }
        {...rest}
      />
      {/* </div> */}
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

export default MemberSelect;
