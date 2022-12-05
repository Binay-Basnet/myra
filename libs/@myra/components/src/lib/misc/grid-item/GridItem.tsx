import { GridItem as ChakraGridItem, GridItemProps as ChakraProps } from '@chakra-ui/react';
/* eslint-disable-next-line */
export interface GridItemProps extends ChakraProps {
  children?: React.ReactNode;
}

export const GridItem = (props: GridItemProps) => {
  const { children, ...rest } = props;
  return <ChakraGridItem {...rest}> {children} </ChakraGridItem>;
};

export default GridItem;
