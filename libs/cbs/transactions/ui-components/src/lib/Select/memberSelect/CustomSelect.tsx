import { Flex } from '@chakra-ui/react';
import {
  ChakraStylesConfig,
  GroupBase,
  Props,
  Select as ChakraSelect,
  SelectComponentsConfig,
} from 'chakra-react-select';

import { TextFields } from '@coop/shared/ui';

import { components as customComponents } from './SelectComponents';
import { chakraDefaultStyles } from './SelectStyles';

type recordType = Record<'en' | 'local' | 'np', string> | null | undefined;
interface SelectOption {
  label?: string;
  value: string;
  memberInfo?: {
    image?: string;
    memberName?: string;
    memberId?: string;
    gender?: string;
    age?: number;
    maritialStatus?: string;
    address?: {
      district?: recordType;
      localGovernment?: recordType;
      locality?: recordType;
      state?: recordType;
      wardNo?: string | null | undefined;
    } | null;
  };
}

export interface SelectProps
  extends Omit<
    Props<SelectOption, boolean, GroupBase<SelectOption>>,
    'size' | 'onChange'
  > {
  options?: SelectOption[] | undefined;
  helperText?: string;
  errorText?: string;
  label?: string;
  // size?: 'sm' | 'default';
  onChange?: ((newValue: SelectOption) => void) | any;
}

export function Select({
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  ...rest
}: SelectProps) {
  return (
    <Flex direction="column" gap="s4">
      <TextFields variant="formLabel" color="gray.700">
        {label}
      </TextFields>
      <ChakraSelect<SelectOption, boolean, GroupBase<SelectOption>>
        key={
          !isMulti
            ? `my_unique_select_key__${JSON.stringify(value)}`
            : 'isMulti'
        }
        options={options}
        value={value}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isClearable={false}
        chakraStyles={
          chakraDefaultStyles as ChakraStylesConfig<
            SelectOption,
            boolean,
            GroupBase<SelectOption>
          >
        }
        components={
          customComponents as Partial<
            SelectComponentsConfig<
              SelectOption,
              boolean,
              GroupBase<SelectOption>
            >
          >
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
}

export default Select;
