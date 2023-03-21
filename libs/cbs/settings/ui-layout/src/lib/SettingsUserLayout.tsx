import React from 'react';

import { MenuContainer, PageContainer } from '@myra-ui/templates';

import { Can } from '@coop/cbs/utils';

import { SettingsUserSideBar } from './SettingsUserSidebar';

interface ISettingsUserLayoutProps {
  children: React.ReactNode;
}

export const SettingsUserLayout = ({ children }: ISettingsUserLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_USERS" showError isErrorCentered>
    <MenuContainer>
      <SettingsUserSideBar />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
