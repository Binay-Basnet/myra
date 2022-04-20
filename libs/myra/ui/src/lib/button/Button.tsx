/* eslint-disable-next-line */
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
// type buttonsizes = 'xl' | 'sm' | 'md' | 'lg';

export function Button(props: ButtonProps) {
  const { children, ...rest } = props;

  return <ChakraButton {...rest}>{children}</ChakraButton>;
}

export default Button;
