import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface HRMODULEEmployeeSidebarLayoutProps {
  children: React.ReactNode;
}

export const HRRecruitmentSidebarayout = ({ children }: HRMODULEEmployeeSidebarLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="HCM_RECRUITMENT" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="HRMODULE" menu="RECRUITMENT" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
