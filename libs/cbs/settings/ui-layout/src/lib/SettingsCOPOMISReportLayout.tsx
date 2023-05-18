import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'P1',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_P1,
  },
  {
    title: 'P2',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_P2,
  },
  {
    title: 'P2X',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_P2X,
  },
  {
    title: 'E1',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_E1,
  },
  {
    title: 'E5',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_E5,
  },
  {
    title: 'E6',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_E6,
  },
  {
    title: 'E7',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_E7,
  },
  {
    title: 'E8',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_E8,
  },
  {
    title: 'A1',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_A1,
  },
  {
    title: 'A2',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_A2,
  },
  {
    title: 'L1',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_L1,
  },
  {
    title: 'L2',
    to: ROUTES.SETTINGS_GENERAL_COPOMIS_FINACIAL_L2,
  },
];

interface SettingsMemberLayoutProps {
  children: React.ReactNode;
}

export const SettingsCOPOMISLayout = ({ children }: SettingsMemberLayoutProps) => (
  <>
    <SettingsPageHeader heading="COPOMIS Financial" />
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
