import React from 'react';
import { Box } from '@coop/shared/ui';

interface IGroupContainer {
  children: React.ReactNode;
}

export const DynamicBoxGroupContainer = ({ children }: IGroupContainer) => {
  return (
    <Box p="s10" display="flex" flexDirection="column" gap="s16" boxShadow="E0">
      {children}
    </Box>
  );
};
