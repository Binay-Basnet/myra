import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface DividerProps extends ChakraDividerProps {}

export function Divider(props: DividerProps) {
  return <ChakraDivider borderColor="border.layout" {...props} />;
}

export default Divider;
