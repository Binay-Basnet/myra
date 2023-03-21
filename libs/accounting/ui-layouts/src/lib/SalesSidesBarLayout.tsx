import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface ISalesLayoutProps {
  children: React.ReactNode;
}

export const SalesLayout = ({ children }: ISalesLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ACCOUNTING_SALES" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="SALES" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
