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
          module="INVENTORY"
          routeIndex={2}
          tabs={[
            {
              title: 'inventory',
              icon: FaTools,
              link: '/inventory/register',
              match: ['register'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'INVENTORY',
            },
            {
              title: 'items',
              icon: FaShapes,
              link: '/inventory/items',
              match: ['items'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'ITEMS',
            },
            {
              title: 'warehouse',
              icon: FaShapes,
              link: '/inventory/warehouse/list',
              match: ['warehouse'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'WAREHOUSE',
            },
            {
              title: 'suppliers',
              icon: FaUserFriends,
              link: '/inventory/suppliers',
              match: ['suppliers'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'SUPPLIERS',
            },
          ]}
        />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default MainLayoutInventory;
