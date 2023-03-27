import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IInventoryPageLayoutProps {
  children: React.ReactNode;
}

export const InventoryTabLayout = ({ children }: IInventoryPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="INVENTORY" module="INVENTORY" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
