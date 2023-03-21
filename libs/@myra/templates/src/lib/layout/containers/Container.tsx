import React from 'react';

import { Box } from '@myra-ui/foundations';

interface IContainer {
  children: React.ReactNode;
}

export const MainLayoutContainer = ({ children }: IContainer) => <Box h="100vh">{children}</Box>;

export const MenuContainer = ({ children }: IContainer) => (
  <Box display="flex" height="calc(100vh - 6.875rem)">
    {children}
  </Box>
);

export const PageContainer = ({ children }: IContainer) => (
  <Box
    width="calc(100% - 260px)"
    height="100%"
    display="flex"
    flexDir="column"
    boxShadow="E1"
    bg="white"
  >
    {children}
  </Box>
);

interface IScrollableProps {
  children: React.ReactNode;
  detailPage?: boolean;
}

export const Scrollable = ({ children, detailPage }: IScrollableProps) => (
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
    w="100%"
    overflowY="auto"
    h={detailPage ? 'calc(100vh - 160px)' : 'calc(100vh - 110px)'}
  >
    {children}
  </Box>
);
