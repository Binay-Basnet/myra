import React from 'react';
import { FiList, FiMap, FiPackage, FiTruck } from 'react-icons/fi';
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
              icon: FiPackage,
              link: '/inventory/register',
              match: ['register'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'INVENTORY',
            },
            {
              title: 'items',
              icon: FiList,
              link: '/inventory/items',
              match: ['items'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'ITEMS',
            },
            {
              title: 'warehouse',
              icon: FiMap,
              link: '/inventory/warehouse/list',
              match: ['warehouse'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'WAREHOUSE',
            },
            {
              title: 'suppliers',
              icon: FiTruck,
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
