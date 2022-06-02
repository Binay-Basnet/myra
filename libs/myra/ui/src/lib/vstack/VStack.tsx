import { StackProps, VStack as ChakraVStack } from '@chakra-ui/react';

/* eslint-disable-next-line */

export type VStackProps = StackProps;

export function VStack(props: VStackProps) {
  return <ChakraVStack {...props} />;
}

export default VStack;
