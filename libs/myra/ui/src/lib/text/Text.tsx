import { Text as ChakraText, TextProps as ChakraProps } from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface TextProps extends ChakraProps {}

export function Text(props: TextProps) {
  const { children, ...rest } = props;
  return <ChakraText {...rest}> {children} </ChakraText>;
}

export default Text;
