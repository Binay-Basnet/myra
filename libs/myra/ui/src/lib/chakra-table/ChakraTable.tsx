import { TableContainer } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface ChakraTableProps<T> {
  children: JSX.Element;
}

export function ChakraTable<T extends {}>(props: ChakraTableProps<T>) {
  const { children, ...rest } = props;
  return <TableContainer>{children}</TableContainer>;
}

export default ChakraTable;
