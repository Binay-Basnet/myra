import React, { forwardRef } from 'react';
import Link from 'next/link';
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
  hasLink?: boolean;
  link?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, shade, hasLink, link, ...rest } = props;

  let buttonComp;

  switch (shade) {
    case 'primary':
      buttonComp = (
        <ChakraButton colorScheme="primary" ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
      break;
    case 'danger':
      buttonComp = (
        <ChakraButton colorScheme="danger" ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
      break;
    case 'neutral':
      buttonComp = (
        <ChakraButton colorScheme="gray" ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
      break;
    default:
      buttonComp = (
        <ChakraButton ref={ref} {...rest}>
          {children}
        </ChakraButton>
      );
      break;
  }

  return hasLink && link ? (
    <Link href={link} target="_blank">
      {buttonComp}
    </Link>
  ) : (
    buttonComp
  );
});

export default Button;

Button.displayName = 'Button';
