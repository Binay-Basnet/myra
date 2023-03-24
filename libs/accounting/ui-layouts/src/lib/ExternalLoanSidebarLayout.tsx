import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IExternalLoanSidebarLayoutProps {
  children: React.ReactNode;
}

export const ExternalLoanSidebarLayout = ({ children }: IExternalLoanSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ACCOUNTING_LOAN" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="LOAN" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
