import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface InputProps extends ChakraInputProps {}

export function Input(props: InputProps) {
  return <ChakraInput {...props} />;
}

export default Input;
