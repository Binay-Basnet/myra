import React from 'react';

import { Box } from '@coop/shared/ui';

import { TabMenu, TopLevelHeader } from './components';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return (
    <Box>
      <Box
        bgColor="primary.800"
        position="fixed"
        top={0}
        width="100%"
        zIndex={11}
      >
        <TopLevelHeader />

        <TabMenu />
      </Box>
      <Box mt="110px">{children}</Box>
    </Box>
  );
}

export default MainLayout;
