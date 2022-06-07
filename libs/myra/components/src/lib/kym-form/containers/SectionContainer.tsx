import React from 'react';
import { Box } from '@coop/myra/ui';

interface ISectionContainerProps {
  children: React.ReactNode;
}

export const SectionContainer = ({ children }: ISectionContainerProps) => {
  return (
    <Box display="flex" flexDirection="column" gap="s48">
      {children}
    </Box>
  );
};
