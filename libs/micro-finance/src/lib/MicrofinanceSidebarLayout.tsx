import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface MicrofinanceSidebarLayoutProps {
  children: React.ReactNode;
}

export const MicrofinanceSidebarLayout = ({ children }: MicrofinanceSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="MICROFINANCE" menu="GROUPS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
