import React from 'react';
import { BoxProps } from '@chakra-ui/react';

import { Box } from '@myra-ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const GroupContainer = ({ children, ...otherProps }: IGroupContainer) => (
  <Box display="flex" p="s20" flexDirection="column" gap="s16" {...otherProps}>
    {children}
  </Box>
);
