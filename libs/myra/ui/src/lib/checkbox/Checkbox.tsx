import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CheckboxProps extends ChakraCheckboxProps {
  children: React.ReactNode;
}

export function Checkbox(props: CheckboxProps) {
  const { children, ...rest } = props;
  return <ChakraCheckbox {...rest}>{children}</ChakraCheckbox>;
}

export default Checkbox;
