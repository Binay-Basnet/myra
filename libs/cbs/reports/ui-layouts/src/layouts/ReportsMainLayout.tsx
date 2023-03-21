import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IMemberPageLayout {
  children: React.ReactNode;
}

export const ReportMainLayout = ({ children }: IMemberPageLayout) => (
  <Can I="SHOW_IN_MENU" a="CBS_REPORTS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar menu="REPORTS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
