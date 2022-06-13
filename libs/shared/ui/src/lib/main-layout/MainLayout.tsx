import React from 'react';
import { Box } from '@chakra-ui/react';

import { TabMenu } from '../tab-menu/TabMenu';
import { TopLevelHeader } from '../top-level-header/TopLevelHeader';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <TabMenu />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
}

export default MainLayout;
