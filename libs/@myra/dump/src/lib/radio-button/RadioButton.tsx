import React from 'react';
import { Radio as ChakraRadio, RadioProps as ChakraRadioProps } from '@chakra-ui/react';

export interface RadioButtonProps extends ChakraRadioProps {
  colorScheme?: string;
  spacing?: string;
  children?: React.ReactNode;
}

export const RadioButton = (props: RadioButtonProps) => {
  const { children, spacing, ...rest } = props;
  return (
    <ChakraRadio isInvalid spacing={spacing} {...rest}>
      {children}
    </ChakraRadio>
  );
};

export default RadioButton;
