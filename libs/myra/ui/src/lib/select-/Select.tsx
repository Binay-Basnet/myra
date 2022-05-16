import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface SelectProps extends ChakraSelectProps {}

export function Select(props: SelectProps) {
  return <ChakraSelect {...props} />;
}

export default Select;
