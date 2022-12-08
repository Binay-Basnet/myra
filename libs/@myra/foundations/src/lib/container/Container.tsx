import { Container as ChakraContainer, ContainerProps as ChakraProps } from '@chakra-ui/react';

export interface ContainerProps extends ChakraProps {
  children?: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children, ...rest } = props;

  return <ChakraContainer {...rest}> {children} </ChakraContainer>;
};

export default Container;
