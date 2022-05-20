import {
  IconButton as ChakraIcon,
  IconButtonProps as ChakraProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface IconButtonProps extends ChakraProps {}

export function IconButton(props: IconButtonProps) {
  const { icon, ...rest } = props;
  return <ChakraIcon {...rest} icon={icon} />;
}

export default IconButton;
