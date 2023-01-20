import { forwardRef, ReactNode } from 'react';
import { Tooltip as ChakraTooltip, TooltipProps as ChakraTooltipProps } from '@chakra-ui/react';

import { Text } from '@myra-ui/foundations';

/* eslint-disable-next-line */
export interface TooltipProps extends Omit<ChakraTooltipProps, 'children'> {
  title: string;
  children?: ReactNode;
}

export const Tooltip = forwardRef<HTMLInputElement, TooltipProps>((props, ref) => {
  const { children, title, ...rest } = props;
  return (
    <ChakraTooltip label={title} placement="top" {...rest} ref={ref}>
      {children || (
        <Text overflow="hidden" textOverflow="ellipsis">
          {title}
        </Text>
      )}
    </ChakraTooltip>
  );
});
export default Tooltip;
