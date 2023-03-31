import React from 'react';
import { FiList, FiMap, FiPackage, FiTruck } from 'react-icons/fi';

import { TabMenu } from '@myra-ui/components';

import { MainLayoutContainer } from '../containers/Container';
import { TopLevelHeader } from '../../header';

export interface MainLayoutInventoryProps {
  children: React.ReactNode;
}

export const MainLayoutInventory = (props: MainLayoutInventoryProps) => {
  const { children } = props;
  return (
    <div>
      <MainLayoutContainer>
        <TopLevelHeader />
        <TabMenu
          module="INVENTORY"
          routeIndex={2}
          tabs={[
            {
              title: 'inventory',
              icon: FiPackage,
              link: '/inventory/inventory/register/list',
              match: ['inventory'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'INVENTORY',
            },
            {
              title: 'items',
              icon: FiList,
              link: '/inventory/items/list',
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
              link: '/inventory/suppliers/list',
              match: ['suppliers'],
              aclKey: 'CBS_MEMBERS_MEMBER',
              navMenu: 'SUPPLIERS',
            },
          ]}
        />
        {children}
      </MainLayoutContainer>
    </div>
  );
};

export default MainLayoutInventory;
