import {
  Radio as ChakraRadio,
  RadioProps as ChakraRadioProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface RadioButtonProps extends ChakraRadioProps {
  colorScheme?: string;
  children?: React.ReactNode;
}

export function RadioButton(props: RadioButtonProps) {
  const { children, ...rest } = props;
  return <ChakraRadio {...rest}>{children}</ChakraRadio>;
}

export default RadioButton;
