/* eslint-disable-next-line */
import { forwardRef } from 'react';
import { Button as ChakraButton, ButtonProps as ChakrabuttonProps } from '@chakra-ui/react';

// type buttonsizes = 'xl' | 'sm' | 'md' | 'lg';
export interface ButtonProps extends ChakrabuttonProps {
  colorScheme?: string;
  children?: React.ReactNode;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  spinner?: React.ReactElement;
  bg?: string;
  variant?: 'solid' | 'outline' | 'link' | 'ghost' | 'unstyled';
  shade?: 'primary' | 'danger' | 'neutral';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, shade, ...rest } = props;

  switch (shade) {
    case 'primary':
      return (
        <ChakraButton colorScheme="primary" ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
    case 'danger':
      return (
        <ChakraButton colorScheme="danger" ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
    case 'neutral':
      return (
        <ChakraButton colorScheme="gray" ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
    default:
      return (
        <ChakraButton ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
  }
});

export default Button;
