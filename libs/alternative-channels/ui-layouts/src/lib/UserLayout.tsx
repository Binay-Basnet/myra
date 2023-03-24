import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

export const UserLayout = ({ children }: IAccountPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ALTERNATIVE_CHANNELS_USERS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ALTERNATIVE_CHANNELS" menu="USERS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
