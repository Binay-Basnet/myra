import React from 'react';
import { Box } from '@saccos/myra/ui';

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
