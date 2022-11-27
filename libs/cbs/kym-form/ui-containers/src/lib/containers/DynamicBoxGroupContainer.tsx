import React from 'react';

import { Box, BoxProps } from '@myra-ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const DynamicBoxGroupContainer = ({ children, ...rest }: IGroupContainer) => (
  <Box display="flex" flexDirection="column" gap="s16" borderRadius="br2" {...rest}>
    {children}
  </Box>
);
