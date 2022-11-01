import { Divider as ChakraDivider, DividerProps as ChakraDividerProps } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface DividerProps extends ChakraDividerProps {}

export const Divider = (props: DividerProps) => (
  <ChakraDivider borderBottom="1px" borderBottomColor="border.layout" {...props} />
);

export default Divider;
