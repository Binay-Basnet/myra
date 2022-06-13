import { ReactNode } from 'react';
import {
  Collapse as ChakraCollapse,
  CollapseProps as ChakraCollapseProps,
} from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CollapseProps extends ChakraCollapseProps {
  children: ReactNode;
  in: boolean;
}

export function Collapse({ children, ...rest }: CollapseProps) {
  return (
    <ChakraCollapse in={true} {...rest}>
      {children}
    </ChakraCollapse>
  );
}

export default Collapse;
