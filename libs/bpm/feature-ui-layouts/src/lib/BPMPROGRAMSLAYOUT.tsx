import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface BPMTASKSSIDEBARROPS {
  children: React.ReactNode;
}

export const BPMProgramsSidebarLayout = ({ children }: BPMTASKSSIDEBARROPS) => (
  <Can I="SHOW_IN_MENU" a="CBS_MEMBERS_MEMBER" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="BPM" menu="PROGRAMS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
