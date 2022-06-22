import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    // title: 'TDS',
    title: 'settingsDepositTds',
    to: '/settings/general/deposit/tds',
  },
  {
    // title: 'IRO Setup',
    title: 'settingsDepositIROSetup',
    to: '/settings/general/deposit/iro-setup',
  },
];

interface SettingsDepositLayout {
  children: React.ReactNode;
}

export const SettingsDepositLayout = ({ children }: SettingsDepositLayout) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={t['settingsDeposit']} />
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
