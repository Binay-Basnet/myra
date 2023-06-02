import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'General',
    to: ROUTES.HRMODULE_EMPLOYEES_SETTINGS,
  },
];

interface ISettingsDepositLayout {
  children: React.ReactNode;
}

export const SettingsEmployeeLayout = ({ children }: ISettingsDepositLayout) => (
  <>
    <SettingsPageHeader heading="Employee Settings" />
    <Box
      w="250px"
      px="s8"
      position="fixed"
      py="s12"
      borderRight="1px"
      borderRightColor="border.layout"
      minHeight="100vh"
    >
      <SettingsInnerVerticalMenu tablinks={tabList} />
    </Box>
    <Box ml="250px">{children}</Box>
  </>
);
