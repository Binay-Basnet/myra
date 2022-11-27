import React from 'react';

import { Box, BoxProps } from '@myra-ui';

interface IGroupContainer extends BoxProps {
  children: React.ReactNode;
}

export const DynamicBoxContainer = ({ children, ...rest }: IGroupContainer) => (
  <Box
    display="flex"
    borderRadius="br2"
    flexDirection="column"
    p="s20"
    bg="background.500"
    {...rest}
  >
    {children}
  </Box>
);
