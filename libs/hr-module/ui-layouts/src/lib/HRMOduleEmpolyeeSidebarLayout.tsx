import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface HRMODULEEmployeeSidebarLayoutProps {
  children: React.ReactNode;
}

export const HREmployeeSidebarLayout = ({ children }: HRMODULEEmployeeSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="HCM_EMPLOYEE" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="HRMODULE" menu="EMPLOYEE" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
