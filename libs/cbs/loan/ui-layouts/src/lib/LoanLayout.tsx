import React from 'react';

import { AppSidebar, MenuContainer, PageContainer, Scrollable } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

export const LoanListLayout = ({ children }: IAccountPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_LOAN" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="LOAN" />
      <PageContainer>
        <Scrollable>{children}</Scrollable>
      </PageContainer>
    </MenuContainer>
  </Can>
);
