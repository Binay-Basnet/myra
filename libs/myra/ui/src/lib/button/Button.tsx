/* eslint-disable-next-line */
import {
  Button as ChakraButton,
  ButtonProps as ChakrabuttonProps,
} from '@chakra-ui/react';
// type buttonsizes = 'xl' | 'sm' | 'md' | 'lg';
export interface ButtonProps extends ChakrabuttonProps {
  colorScheme?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  spinner?: React.ReactElement;
  type?: 'button' | 'reset' | 'submit';
  bg?: string;
}

export function Button(props: ButtonProps) {
  const { children, bg, ...rest } = props;
  return (
    <ChakraButton bg={bg} {...rest}>
      {children}
    </ChakraButton>
  );
}

export default Button;
