import React from 'react';
import { Box } from '@myra-ui';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsDocumentsAllDocuments',
    to: '/settings/general/documents',
  },
  {
    title: 'settingsDocumentsKYM',
    to: '/settings/general/documents/kym',
  },
  {
    title: 'settingsDocumentsLoan',
    to: '/settings/general/documents/loan',
  },
  {
    title: 'settingsDocumentsDeposit',
    to: '/settings/general/documents/deposit',
  },
  {
    title: 'settingsDocumentsTransaction',
    to: '/settings/general/documents/transaction',
  },
];

interface SettingsDocumentsLayoutProps {
  children: React.ReactNode;
}

export const SettingsDocumentsLayout = ({ children }: SettingsDocumentsLayoutProps) => (
  <>
    <SettingsPageHeader heading="Documents" />
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
