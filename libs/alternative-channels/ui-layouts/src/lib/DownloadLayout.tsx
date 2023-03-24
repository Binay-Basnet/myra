import React from 'react';

import { AppSidebar, MenuContainer, PageContainer } from '@myra-ui';

import { Can } from '@coop/cbs/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

export const DownloadLayout = ({ children }: IAccountPageLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="ALTERNATIVE_CHANNELS_DOWNLOADS" showError isErrorCentered>
    <MenuContainer>
      <AppSidebar module="ALTERNATIVE_CHANNELS" menu="DOWNLOADS" />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
