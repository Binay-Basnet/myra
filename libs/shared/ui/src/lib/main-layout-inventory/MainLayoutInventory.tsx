import React from 'react';
import { Box } from '@chakra-ui/react';

import { TabMenuForInventoryApp } from '../tab-menu-for-inventory-app/TabMenuForInventoryApp';
import { TopLevelHeader } from '../top-level-header/TopLevelHeader';

export interface MainLayoutInventoryProps {
  children: React.ReactNode;
}

export function MainLayoutInventory(props: MainLayoutInventoryProps) {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <TabMenuForInventoryApp />
      </Box>
      <Box mt="120px">{children}</Box>
    </div>
  );
}

export default MainLayoutInventory;
