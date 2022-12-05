import React from 'react';
import { FaShapes, FaTools, FaUserFriends } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';

import { TabMenu } from '@myra-ui/components';

import { TopLevelHeader } from '../../header';

export interface MainLayoutInventoryProps {
  children: React.ReactNode;
}

export const MainLayoutInventory = (props: MainLayoutInventoryProps) => {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <TabMenu
          routeIndex={2}
          tabs={[
            {
              title: 'inventory',
              icon: FaTools,
              link: '/inventory/register',
              match: ['register'],
            },
            {
              title: 'items',
              icon: FaShapes,
              link: '/inventory/items',
              match: ['items'],
            },
            {
              title: 'warehouse',
              icon: FaShapes,
              link: '/inventory/warehouse/list',
              match: ['warehouse'],
            },
            {
              title: 'suppliers',
              icon: FaUserFriends,
              link: '/inventory/suppliers',
              match: ['suppliers'],
            },
          ]}
        />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default MainLayoutInventory;
