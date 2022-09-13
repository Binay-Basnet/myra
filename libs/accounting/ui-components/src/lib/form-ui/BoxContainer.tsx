import React from 'react';

import { Box, BoxProps } from '@coop/shared/ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const BoxContainer = ({ children, ...rest }: IGroupContainer) => (
    <Box display="flex" flexDirection="column" gap="s16" {...rest}>
      {children}
    </Box>
  );
