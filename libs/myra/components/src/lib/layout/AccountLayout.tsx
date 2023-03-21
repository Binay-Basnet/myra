import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_SAVINGS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="SAVINGS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
