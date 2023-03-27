import React from 'react';

import { AppSidebar, MenuContainer, PageContainer, Scrollable } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IPurchaseLayoutProps {
  children: React.ReactNode;
}

export const AccountingInventoryLayout = ({ children }: IPurchaseLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ACCOUNTING_PURCHASE" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="INVENTORY" />
      <PageContainer>
        <Scrollable>{children}</Scrollable>
      </PageContainer>
    </MenuContainer>
  </Can>
);
