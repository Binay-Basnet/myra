import React from 'react';
import { BoxProps } from '@chakra-ui/react';

import { Box } from '@coop/shared/ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const GroupContainer = ({ children, ...otherProps }: IGroupContainer) => (
  <Box display="flex" flexDirection="column" gap="s32" {...otherProps}>
    {children}
  </Box>
);
