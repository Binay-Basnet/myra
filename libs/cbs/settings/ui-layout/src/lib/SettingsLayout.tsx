import React from 'react';

import { Box, TopLevelHeader } from '@myra-ui';

import { SettingsTabMenu } from './SettingsTabMenu';

interface ISettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout = ({ children }: ISettingsLayoutProps) => (
  <div>
    <Box position="fixed" top={0} width="100%" zIndex={11}>
      <TopLevelHeader />
      <SettingsTabMenu />
    </Box>
    <Box mt="110px">{children}</Box>
  </div>
);
