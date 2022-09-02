import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsShareGeneral',
    to: '/settings/general/share',
  },
  {
    title: 'settingsShareBonus',
    to: '/settings/general/share/bonus',
  },
  {
    title: 'settingsShareMigration',
    to: '/settings/general/share/migration',
  },
  {
    title: 'settingsShareDivident',
    to: '/settings/general/share/dividend',
  },
  {
    title: 'settingsShareIssues',
    to: '/settings/general/share/issues',
  },
  {
    title: 'settingsShareReturn',
    to: '/settings/general/share/return',
  },
  {
    title: 'settingsShareTransfer',
    to: '/settings/general/share/transfer',
  },
];

interface SettingsShareLayoutProps {
  children: React.ReactNode;
}

export const SettingsShareLayout = ({ children }: SettingsShareLayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={t['shareSettings']} />
      <Box
        w="300px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight={'1px'}
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <SettingsInnerVerticalMenu tablinks={tabList} />
      </Box>
      <Box ml="300px">{children}</Box>
    </>
  );
};
