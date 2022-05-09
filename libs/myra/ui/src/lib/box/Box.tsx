/* eslint-disable-next-line */
import { Box as ChakraBox, BoxProps } from '@chakra-ui/react';

export function Box(props: BoxProps) {
  const { children, ...rest } = props;
  return <ChakraBox {...rest}>{children}</ChakraBox>;
}

export default Box;
