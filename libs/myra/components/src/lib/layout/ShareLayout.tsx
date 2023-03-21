import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

export const SharePageLayout = ({ children }: IMemberPageLayout) => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="SHARE" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
