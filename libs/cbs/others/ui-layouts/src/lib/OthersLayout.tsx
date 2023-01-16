import React from 'react';

import { AppSidebar, MenuContainer, PageContainer, Scrollable } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IOthersPageLayoutProps {
  children: React.ReactNode;
}

export const OthersPageLayout = ({ children }: IOthersPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_OTHERS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="OTHERS" />
      <PageContainer>
        <Scrollable>{children}</Scrollable>
      </PageContainer>
    </MenuContainer>
  </Can>
);
