import React from 'react';

import { AppSidebar, MenuContainer, PageContainer, Scrollable } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

export const TransactionsSidebarLayout = ({ children }: ITransactionsSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_TRANSACTIONS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="TRANSACTIONS" />
      <PageContainer>
        <Scrollable>{children}</Scrollable>
      </PageContainer>
    </MenuContainer>
  </Can>
);
