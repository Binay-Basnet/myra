import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IMicrofinancePageLayout {
  children: React.ReactNode;
}

export const MicrofinanceLayout = ({ children }: IMicrofinancePageLayout) => (
  <Can I="SHOW_IN_MENU" a="CBS_SHARE" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="MICROFINANCE" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
