import { forwardRef } from 'react';
import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface IconButtonProps extends ChakraProps {}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { ...rest } = props;
    return <ChakraIconButton {...rest} ref={ref} />;
  }
);
export default IconButton;
