import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface InputProps extends ChakraInputProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
}

export function Input(props: InputProps) {
  const { ...rest } = props;
  return <ChakraInput p={'12px'} {...rest} />;
}

export default Input;
