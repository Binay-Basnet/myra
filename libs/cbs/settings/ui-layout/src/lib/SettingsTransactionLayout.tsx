import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'Transaction Constraints',
    to: ROUTES.SETTINGS_GENERAL_TRANSACTION_CONSTRAINTS_LIST,
  },
  {
    title: 'Penny Restrictions',
    to: ROUTES.SETTINGS_GENERAL_TRANSACTIONS_PENNY_RESTRICTIONS,
  },
];

interface SettingsTransactionsLayoutProps {
  children: React.ReactNode;
}

export const SettingsTransactionsLayout = ({ children }: SettingsTransactionsLayoutProps) => (
  <>
    <SettingsPageHeader heading="Transactions Settings" />
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
