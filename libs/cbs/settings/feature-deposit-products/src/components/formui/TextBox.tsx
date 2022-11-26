import React from 'react';

import { Box, BoxProps } from '@myra-ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const TextBoxContainer = ({ children, ...rest }: IGroupContainer) => (
  <Box display="flex" flexDirection="column" gap="s4" {...rest}>
    {children}
  </Box>
);
