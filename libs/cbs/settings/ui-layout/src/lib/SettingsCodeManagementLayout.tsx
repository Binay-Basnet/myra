import React from 'react';

import { Box } from '@myra-ui';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'Core Banking System',
    to: '/settings/general/code-management/core-banking-system',
  },
  // {
  //   title: 'Accounting',
  //   to: '/settings/general/code-management/accounting',
  // },
  // {
  //   title: 'Inventory',
  //   to: '/settings/general/code-management/inventory',
  // },
];

interface SettingsCodeManagementLayoutProps {
  children: React.ReactNode;
}

export const SettingsCodeManagementLayout = ({ children }: SettingsCodeManagementLayoutProps) => (
  <>
    <SettingsPageHeader heading="Code Management" />
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
    <Box ml="260px" p="s16">
      {children}
    </Box>
  </>
);
