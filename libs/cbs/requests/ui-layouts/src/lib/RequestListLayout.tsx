import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

export const RequestListLayout = ({ children }: IAccountPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_REQUESTS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="REQUESTS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
