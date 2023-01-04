import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsShareGeneral',
    to: ROUTES.SETTINGS_GENERAL_SHARE,
  },
  // {
  //   title: 'settingsShareBonus',
  //   to: '/settings/general/share/bonus',
  // },

  // {
  //   title: 'settingsShareDivident',
  //   to: '/settings/general/share/dividend',
  // },
  {
    title: 'settingsShareIssues',
    to: ROUTES.SETTINGS_GENERAL_SHARE_ISSUES,
  },
  {
    title: 'settingsShareReturn',
    to: ROUTES.SETTINGS_GENERAL_SHARE_RETURNS,
  },
  {
    title: 'settingsShareTransfer',
    to: ROUTES.SETTINGS_GENERAL_SHARE_TRANSFER,
  },
];

interface SettingsShareLayoutProps {
  children: React.ReactNode;
}

export const SettingsShareLayout = ({ children }: SettingsShareLayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={`${t['shareSettings']} - ${featureCode?.settingsShare}`} />
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
