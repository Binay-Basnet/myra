import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'Withdraw Slip',
    to: ROUTES.SETTINGS_GENERAL_PRINT_PREFERENCE,
  },
];

interface SettingsMemberLayoutProps {
  children: React.ReactNode;
}

export const SettingsPrintPreferenceLayout = ({ children }: SettingsMemberLayoutProps) => (
  <>
    <SettingsPageHeader heading="Print Preference" />
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
