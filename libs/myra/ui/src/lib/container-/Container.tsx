import {
  Container as ChakraContainer,
  ContainerProps as ChakraProps,
} from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface ContainerProps extends ChakraProps {}

export function Container(props: ContainerProps) {
  return <Container {...props} />;
}

export default Container;
