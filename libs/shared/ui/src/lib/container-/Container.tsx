import {
  Container as ChakraContainer,
  ContainerProps as ChakraProps,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface ContainerProps extends ChakraProps {
  children?: React.ReactNode;
}

export function Container(props: ContainerProps) {
  const { children, ...rest } = props;

  return <ChakraContainer {...rest}> {children} </ChakraContainer>;
}

export default Container;
