import React from 'react';

import { AppSidebar, MenuContainer, PageContainer, Scrollable } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IExternalLoanSidebarLayoutProps {
  children: React.ReactNode;
}

export const ExternalLoanSidebarLayout = ({ children }: IExternalLoanSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ACCOUNTING_LOAN" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ACCOUNTING" menu="LOAN" />
      <PageContainer>
        <Scrollable>{children}</Scrollable>
      </PageContainer>
    </MenuContainer>
  </Can>
);
