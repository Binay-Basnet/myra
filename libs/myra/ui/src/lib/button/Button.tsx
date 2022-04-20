/* eslint-disable-next-line */
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
type buttonsizes = 'xl' | 'sm' | 'md' | 'lg';
export interface IProps extends ButtonProps {
  colorScheme: string;
  size: buttonsizes;
  variant?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button(props: IProps) {
  const { colorScheme, size, variant, isLoading, children, ...rest } = props;

  return (
    <ChakraButton
      colorScheme={colorScheme}
      isLoading={isLoading}
      variant={variant}
      size={size}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}

export default Button;
