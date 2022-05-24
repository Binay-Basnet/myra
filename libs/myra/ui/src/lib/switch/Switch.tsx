import {
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface SwitchProps extends ChakraSwitchProps {
  size?: string;
  isDisabled?: boolean;
}

export function Switch(props: SwitchProps) {
  const { size, isDisabled, ...rest } = props;
  return <ChakraSwitch isDisabled={isDisabled} size={size} {...rest} />;
}

export default Switch;
