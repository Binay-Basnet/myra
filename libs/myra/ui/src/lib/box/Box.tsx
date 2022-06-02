import { forwardRef } from 'react';
import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface BoxProps extends ChakraBoxProps {}

export const Box = forwardRef<HTMLInputElement, BoxProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraBox {...rest} ref={ref}>
      {children}
    </ChakraBox>
  );
});

export default Box;
