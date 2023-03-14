import React from 'react';

import { Box } from '@myra-ui';

import { SettingsPageHeader } from './SettingsPageHeader';

// const tabList = [
//   {
//     title: 'General',
//     to: '/settings/general/accounting/general',
//   },
//   {
//     title: 'Credit Terms',
//     to: '/settings/general/accounting/credit-terms',
//   },
//   {
//     title: 'Custom Fields',
//     to: '/settings/general/accounting/custom-fields',
//   },
//   {
//     title: 'Default Ledger Mapping',
//     to: '/settings/general/accounting/default-ledger-mapping',
//   },
//   {
//     title: 'Tax',
//     to: '/settings/general/accounting/tax',
//   },
// ];

interface SettingsAccountingLayoutProps {
  children: React.ReactNode;
}

export const SettingsAccountingLayout = ({ children }: SettingsAccountingLayoutProps) => (
  <>
    <SettingsPageHeader heading="Accounting" />
    {/* <Box
      w="250px"
      px="s8"
      position="fixed"
      py="s16"
      borderRight="1px"
      borderRightColor="border.layout"
      minHeight="100vh"
    >
      <SettingsInnerVerticalMenu tablinks={tabList} />
    </Box> */}
    <Box p="s16">{children}</Box>
  </>
);
