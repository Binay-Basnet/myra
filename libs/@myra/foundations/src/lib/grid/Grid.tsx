import { forwardRef } from 'react';
import { Grid as ChakraGrid, GridProps as ChakraProps } from '@chakra-ui/react';

export interface GridProps extends ChakraProps {
  children: React.ReactNode;
}

export const Grid = forwardRef<HTMLInputElement, GridProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraGrid {...rest} ref={ref}>
      {children}
    </ChakraGrid>
  );
});

export default Grid;
