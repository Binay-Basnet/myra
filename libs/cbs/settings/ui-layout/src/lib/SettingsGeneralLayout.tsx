import React from 'react';

import { MenuContainer, PageContainer, Scrollable } from '@myra-ui/templates';

import { Can } from '@coop/cbs/utils';

import { SettingSideBar } from './SettingsSideBar';

interface ISettingsGeneralLayoutProps {
  children: React.ReactNode;
}

export const SettingsGeneralLayout = ({ children }: ISettingsGeneralLayoutProps) => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_GENERAL" showError isErrorCentered>
    <MenuContainer>
      <SettingSideBar />
      <PageContainer>
        <Scrollable>{children}</Scrollable>
      </PageContainer>
    </MenuContainer>
  </Can>
);
