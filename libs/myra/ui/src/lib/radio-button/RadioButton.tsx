import {
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface RadioButtonProps extends ChakraRadioProps {
  colorScheme?: string;
  spacing?: string;
  children?: React.ReactNode;
}

export function RadioButton(props: RadioButtonProps) {
  const { children, spacing, ...rest } = props;
  return (
    <ChakraRadio spacing={spacing} {...rest}>
      {children}
    </ChakraRadio>
  );
}

export default RadioButton;
