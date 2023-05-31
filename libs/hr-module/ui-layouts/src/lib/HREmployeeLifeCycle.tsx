import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface HRMODULEEmployeeSidebarLayoutProps {
  children: React.ReactNode;
}

export const HREmployeeLifecycleSidebarLayout = ({
  children,
}: HRMODULEEmployeeSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="HRMODULE" menu="EMPLOYEE_LIFECYCLE" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
