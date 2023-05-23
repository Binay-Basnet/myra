import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'P1',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_P1,
  },
  {
    title: 'P2',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_P2,
  },
  {
    title: 'P2X',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_P2X,
  },
  {
    title: 'E1',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_E1,
  },
  {
    title: 'E5',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_E5,
  },
  {
    title: 'E6',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_E6,
  },
  {
    title: 'E7',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_E7,
  },
  {
    title: 'E8',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_E8,
  },
  {
    title: 'A1',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_A1,
  },
  {
    title: 'A2',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_A2,
  },
  {
    title: 'L1',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_L1,
  },
  {
    title: 'L2',
    to: ROUTES.SETTINGS_GENERAL_PEARLS_REPORT_L2,
  },
];

interface SettingsMemberLayoutProps {
  children: React.ReactNode;
}

export const SettingsPEARLSLayout = ({ children }: SettingsMemberLayoutProps) => (
  <>
    <SettingsPageHeader heading="PEARLS Report" />
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
