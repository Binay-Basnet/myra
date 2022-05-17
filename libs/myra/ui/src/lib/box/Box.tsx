import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface BoxProps extends ChakraBoxProps {}

export function Box(props: BoxProps) {
  const { children, ...rest } = props;
  return <ChakraBox {...rest}>{children}</ChakraBox>;
}

export default Box;
