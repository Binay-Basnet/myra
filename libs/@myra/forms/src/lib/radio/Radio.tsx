import React from 'react';
import { Radio as ChakraRadio, RadioProps as ChakraRadioProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

export interface RadioProps extends ChakraRadioProps {
  colorScheme?: string;
  spacing?: string;
  children?: React.ReactNode;
  label?: string;
}

export const Radio = (props: RadioProps) => {
  const { children, spacing, label, ...rest } = props;
  return (
    <ChakraRadio spacing={spacing} {...rest}>
      {label ? (
        <Text variant="formLabel" color="gray.800">
          {label}
        </Text>
      ) : (
        children
      )}
    </ChakraRadio>
  );
};

export default Radio;
