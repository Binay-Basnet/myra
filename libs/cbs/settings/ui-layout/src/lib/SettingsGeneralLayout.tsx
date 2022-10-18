import React from 'react';
import { Box } from '@chakra-ui/react';

import { SettingSideBar } from './SettingsSideBar';

interface ISettingsGeneralLayoutProps {
  children: React.ReactNode;
}

export const SettingsGeneralLayout = ({ children }: ISettingsGeneralLayoutProps) => (
  <Box display="flex" flexDirection="row">
    <SettingSideBar />
    <Box width="100%" ml="260px" bg="white" minHeight="calc(100vh - 110px)">
      {children}
    </Box>
  </Box>
);
