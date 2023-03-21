import React from 'react';
import { FiActivity } from 'react-icons/fi';
import { IoGridOutline, IoPerson } from 'react-icons/io5';

import { MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

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
        {
          title: 'settingsTabMenuMonitor',
          icon: FiActivity,
          link: ROUTES.SETTINGS_GENERAL_AUDIT_LOG,
          match: ['monitor'],
          aclKey: 'SETTINGS_AUDIT_LOG',
          navMenu: 'MONITOR',
        },
      ]}
    />
    {children}
  </MainLayoutContainer>
);
