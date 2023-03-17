import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'History',
    to: ROUTES.SETTINGS_EOD_HISTORY,
  },
  {
    title: 'Setup',
    to: ROUTES.SETTINGS_EOD_SETUP,
  },
];

interface SettingsDayEndLayoutProps {
  children: React.ReactNode;
}

export const SettingsDayEndLayout = ({ children }: SettingsDayEndLayoutProps) => (
  <>
    <SettingsPageHeader heading="Day End" />
    <Box
      w="260px"
      px="s8"
      position="fixed"
      py="s16"
      borderRight="1px"
      borderRightColor="border.layout"
      minHeight="100vh"
    >
      <SettingsInnerVerticalMenu tablinks={tabList} />
    </Box>
    <Box ml="260px">{children}</Box>
  </>
);
