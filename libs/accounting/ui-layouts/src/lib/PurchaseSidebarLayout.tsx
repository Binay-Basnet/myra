import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IPurchaseLayoutProps {
  children: React.ReactNode;
}

export const PurchaseLayout = ({ children }: IPurchaseLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ACCOUNTING_PURCHASE" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="PURCHASE" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
