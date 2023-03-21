import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

export const TransferLayout = ({ children }: ITransactionsSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_TRANSFERS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="TRANSFERS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
