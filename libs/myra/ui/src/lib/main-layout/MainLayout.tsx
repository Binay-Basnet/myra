// import { Navbar } from '../navbar/Navbar';
import React from 'react';
import { Box } from '@chakra-ui/react';

import { TabMenu } from '../tab-menu/TabMenu';
import { TopLevelHeader } from '../top-level-header/TopLevelHeader';

export interface MainLayoutProps {
  children: React.ReactNode;
}

// ! TODO use THEMES
export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    // <Box
    //   position="fixed"
    //   width="100%"
    //   top={0}
    //   zIndex={2}
    //   backdropFilter="saturate(180%) blur(5px)"
    // >
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        {/* <Navbar /> */}

        <TopLevelHeader />
        <TabMenu />
      </Box>
      {children}
    </div>
  );
}

export default MainLayout;
