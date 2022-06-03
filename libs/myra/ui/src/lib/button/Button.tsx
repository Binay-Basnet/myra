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
  bg?: string;
  variant?: 'solid' | 'outline' | 'link' | 'ghost';
  shade?: 'primary' | 'danger' | 'neutral';
}

export function Button(props: ButtonProps) {
  const { children, bg, shade, ...rest } = props;

  switch (shade) {
    case 'primary':
      return (
        <ChakraButton colorScheme="primary" {...rest}>
          {children}
        </ChakraButton>
      );
    case 'danger':
      return (
        <ChakraButton colorScheme="danger" {...rest}>
          {children}
        </ChakraButton>
      );
    case 'neutral':
      return (
        <ChakraButton colorScheme={'gray'} {...rest}>
          {children}
        </ChakraButton>
      );
    default:
      return <ChakraButton {...rest}>{children}</ChakraButton>;
  }
}

export default Button;
