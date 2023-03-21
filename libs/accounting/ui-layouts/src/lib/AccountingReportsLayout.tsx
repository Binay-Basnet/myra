import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IAccountingSidebarLayoutProps {
  children: React.ReactNode;
}

export const AccountingReportsLayout = ({ children }: IAccountingSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="APP_ACCOUNTING" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="REPORTS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
