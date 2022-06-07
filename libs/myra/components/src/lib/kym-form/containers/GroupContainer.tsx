import React from 'react';
import { Box } from '@coop/myra/ui';

interface IGroupContainer {
  children: React.ReactNode;
}

export const GroupContainer = ({ children }: IGroupContainer) => {
  return (
    <Box display="flex" flexDirection="column" gap="s32">
      {children}
    </Box>
  );
};
