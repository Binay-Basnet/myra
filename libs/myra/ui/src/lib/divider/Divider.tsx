import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface DividerProps extends ChakraDividerProps {}

export function Divider(props: DividerProps) {
  return <ChakraDivider py={'s16'} />;
}

export default Divider;
