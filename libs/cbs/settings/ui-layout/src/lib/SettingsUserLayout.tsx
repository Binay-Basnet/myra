import React from 'react';
import { Box } from '@chakra-ui/react';

import { SettingsUserSideBar } from './SettingsUserSidebar';

interface ISettingsUserLayoutProps {
  children: React.ReactNode;
}

export const SettingsUserLayout = ({ children }: ISettingsUserLayoutProps) => {
  return (
    <Box display={'flex'} flexDirection={'row'}>
      <SettingsUserSideBar />
      <Box width="100%" ml="275px" bg="white" minHeight="calc(100vh - 110px)">
        {children}
      </Box>
    </Box>
  );
};
