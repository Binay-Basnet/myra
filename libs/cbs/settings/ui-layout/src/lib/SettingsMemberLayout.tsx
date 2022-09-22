import React from 'react';

import { Box } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsSideGeneral',
    to: '/settings/general/members',
  },
  {
    title: 'settingsSideIndividual',
    to: '/settings/general/members/kym-individual',
  },
  {
    title: 'settingsSideInstitutional',
    to: '/settings/general/members/kym-institutional',
  },
  {
    title: 'settingsSideCoop',
    to: '/settings/general/members/kym-cooperative',
  },
  {
    title: 'settingsSideCoopUnion',
    to: '/settings/general/members/kym-cooperative-union',
  },
];

interface SettingsMemberLayoutProps {
  children: React.ReactNode;
}

export const SettingsMemberLayout = ({ children }: SettingsMemberLayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={`${t['settingsMember']} - ${featureCode?.settingsMembers}`} />
      <Box
        w="250px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight="1px"
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <SettingsInnerVerticalMenu tablinks={tabList} />
      </Box>
      <Box ml="250px">{children}</Box>
    </>
  );
};
