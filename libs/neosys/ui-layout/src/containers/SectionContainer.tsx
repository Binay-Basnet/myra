import React from 'react';

import { Box, BoxProps } from '@coop/shared/ui';

interface ISectionContainerProps extends BoxProps {
  children: React.ReactNode;
}

export const SectionContainer = ({ children, ...rest }: ISectionContainerProps) => (
  <Box display="flex" flexDirection="column" gap="s48" {...rest}>
    {children}
  </Box>
);
