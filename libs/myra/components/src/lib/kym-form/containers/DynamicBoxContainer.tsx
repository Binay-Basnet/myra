import React from 'react';
import { Box } from '@saccos/myra/ui';

interface IGroupContainer {
  children: React.ReactNode;
}

export const DynamicBoxContainer = ({ children }: IGroupContainer) => {
  return (
    <Box
      display="flex"
      borderRadius="br2"
      flexDirection="column"
      p="s20"
      bg="background.500"
    >
      {children}
    </Box>
  );
};
