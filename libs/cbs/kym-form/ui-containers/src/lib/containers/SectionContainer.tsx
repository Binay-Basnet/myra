import React from 'react';

import { Box, BoxProps } from '@myra-ui';

interface ISectionContainerProps extends BoxProps {
  children: React.ReactNode;
}

export const SectionContainer = ({ children, ...rest }: ISectionContainerProps) => (
  <Box display="flex" flexDirection="column" {...rest}>
    {children}
  </Box>
);
