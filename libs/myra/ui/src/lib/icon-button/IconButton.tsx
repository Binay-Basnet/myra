import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface IconButtonProps extends ChakraProps {}

export function IconButton(props: IconButtonProps) {
  const { ...rest } = props;
  return <ChakraIconButton {...rest} />;
}

export default IconButton;
