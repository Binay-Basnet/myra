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

export interface Option {
  label?: string;
  value: string;
  accountInfo?: {
    accountName?: string;
    accountId?: string;
    accountType?: string;
    balance?: string;
    fine?: string;
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

export function Select({
  // size,
  errorText,
  helperText,
  isMulti,
  label,
  options,
  value,
  ...rest
}: SelectProps) {
  // const [sortedOptions, setSortedOptions] = useState(options ?? []);

  // useEffect(() => {
  //   if (isMulti) {
  //     setSortedOptions(options ?? []);
  //   }
  // }, [JSON.stringify(options)]);

  return (
    <Flex direction="column" gap="s4">
      <TextFields variant="formLabel" color="gray.700">
        {label}
      </TextFields>
      <ChakraSelect<Option, boolean, GroupBase<Option>>
        key={
          !isMulti
            ? `my_unique_select_key__${JSON.stringify(value)}`
            : 'isMulti'
        }
        // onMenuClose={() => {
        //   if (isMulti) {
        //     setSortedOptions((prev) =>
        //       (prev as Array<Option>)?.sort((optionA) => {
        //         if (
        //           (value as Array<Option>)?.find(
        //             (v) => optionA.value === v.value
        //           )
        //         ) {
        //           return -1;
        //         } else {
        //           return 1;
        //         }
        //       })
        //     );
        //   }
        // }}
        // options={isMulti ? sortedOptions : options}
        options={options}
        value={value}
        controlShouldRenderValue={!isMulti}
        closeMenuOnSelect={!isMulti}
        isMulti={isMulti}
        hideSelectedOptions={false}
        isClearable={false}
        chakraStyles={
          chakraDefaultStyles as ChakraStylesConfig<
            Option,
            boolean,
            GroupBase<Option>
          >
        }
        components={
          customComponents as Partial<
            SelectComponentsConfig<Option, boolean, GroupBase<Option>>
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
