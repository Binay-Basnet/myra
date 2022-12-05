import React from 'react';
import { Box } from '@myra-ui';

import { SettingSideBar } from './SettingsSideBar';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}
export const SavingDetailPageSidebarLayout = ({ children }: ITransactionsSidebarLayoutProps) => (
  <Box minH="calc(100vh - 110px)">
    <SettingSideBar />
    <Box
      bg="background.500"
      width="calc(100% - 260px)"
      position="relative"
      left="260px"
      minH="calc(100vh - 110px)"
    >
      {children}
    </Box>
  </Box>
);
