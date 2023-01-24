import React from 'react';

import { Box } from '@myra-ui/foundations';

interface IContainer {
  children: React.ReactNode;
}

export const MainLayoutContainer = ({ children }: IContainer) => <Box h="100vh">{children}</Box>;

export const MenuContainer = ({ children }: IContainer) => <Box display="flex">{children}</Box>;

export const PageContainer = ({ children }: IContainer) => (
  <Box width="calc(100% - 260px)" boxShadow="E1">
    <Box minHeight="calc(100vh - 110px)" width="100%" bg="white">
      {children}
    </Box>
  </Box>
);

export const Scrollable = ({ children }: IContainer) => (
  <Box
    sx={{
      '&::-webkit-scrollbar': {
        width: '12px',
        height: '8px',
        backgroundColor: 'transparent',
      },
      '&:hover::-webkit-scrollbar': {
        width: '12px',
        height: '8px',
        backgroundColor: '#f5f5f5',

        display: 'block',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'transparent',
        borderRadius: '8px',
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'gray.300',
        borderRadius: '8px',
      },
    }}
    overflowY="auto"
    h="calc(100vh - 110px)"
  >
    {children}
  </Box>
);
