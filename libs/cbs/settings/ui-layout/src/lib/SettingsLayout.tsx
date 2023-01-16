import React from 'react';
import { IoGridOutline, IoPerson } from 'react-icons/io5';

import { MainLayoutContainer, Scrollable, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

interface ISettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout = ({ children }: ISettingsLayoutProps) => (
  <MainLayoutContainer>
    <TopLevelHeader />
    <TabMenu
      module="SETTINGS"
      tabs={[
        {
          title: 'settingsTabMenuGeneral',
          icon: IoGridOutline,
          link: ROUTES.CBS_MEMBER_LIST,
          match: ['general'],
          aclKey: 'SETTINGS_GENERAL',
          navMenu: 'GENERAL',
        },
        {
          title: 'settingsTabMenuUsers',
          icon: IoPerson,
          link: ROUTES.CBS_SHARE_BALANCE,
          match: ['users'],
          aclKey: 'SETTINGS_USERS',
          navMenu: 'USERS',
        },
      ]}
    />
    <Scrollable>{children}</Scrollable>
  </MainLayoutContainer>
);
