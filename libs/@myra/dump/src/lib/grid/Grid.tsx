import { forwardRef } from 'react';
import { Grid as ChakraGrid, GridProps as ChakraProps } from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface GridProps extends ChakraProps {
  children: React.ReactNode;
}

// export function Grid(props: GridProps) {
//   const { children, ...rest } = props;
//   return <ChakraGrid {...rest}> {children}</ChakraGrid>;
// }

export const Grid = forwardRef<HTMLInputElement, GridProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <ChakraGrid {...rest} ref={ref}>
      {children}
    </ChakraGrid>
  );
});

export default Grid;
