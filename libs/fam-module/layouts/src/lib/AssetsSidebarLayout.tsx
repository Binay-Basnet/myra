import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const AssetsSidebarLayout = ({ children }: SidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="FAM" menu="ASSETS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
