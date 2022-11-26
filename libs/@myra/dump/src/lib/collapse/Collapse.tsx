import { ReactNode } from 'react';
import { Collapse as ChakraCollapse, CollapseProps as ChakraCollapseProps } from '@chakra-ui/react';

/* eslint-disable-next-line */
export interface CollapseProps extends ChakraCollapseProps {
  children: ReactNode;
}

export const Collapse = ({ children, ...rest }: CollapseProps) => (
  <ChakraCollapse {...rest}>{children}</ChakraCollapse>
);

export default Collapse;
