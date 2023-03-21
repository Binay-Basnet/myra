import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IInvestmentSidebarLayoutProps {
  children: React.ReactNode;
}

export const InvestmentSidebarLayout = ({ children }: IInvestmentSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ACCOUNTING_INVESTMENT" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="INVESTMENT" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
