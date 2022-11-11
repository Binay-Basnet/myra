import React from 'react';

import { Box } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    // title: 'TDS',
    title: 'settingsDepositTds',
    to: '/settings/general/deposit/tds',
  },
  // {
  //   // title: 'IRO Setup',
  //   title: 'settingsDepositIROSetup',
  //   to: '/settings/general/deposit/iro-setup',
  // },
];

interface ISettingsDepositLayout {
  children: React.ReactNode;
}

export const SettingsDepositLayout = ({ children }: ISettingsDepositLayout) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={`${t['settingsDeposit']} - ${featureCode?.settingsDeposit}`} />
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
};
