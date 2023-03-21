import React from 'react';

import { MenuContainer, PageContainer } from '@myra-ui/templates';

import { Can } from '@coop/cbs/utils';

import { SettingsMonitorSidebar } from './SettingsMonitorSidebar';

interface ISettingsMonitorLayoutProps {
  children: React.ReactNode;
}

export const SettingsMonitorLayout = ({ children }: ISettingsMonitorLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_USERS" showError isErrorCentered>
    <MenuContainer>
      <SettingsMonitorSidebar />
      <PageContainer>{children}</PageContainer>
    </MenuContainer>
  </Can>
);
