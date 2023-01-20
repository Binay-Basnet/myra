import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { featureCode, useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    // title: 'TDS',
    title: 'settingsDepositTds',
    to: ROUTES.SETTINGS_GENERAL_SAVINGS_TDS,
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
      <SettingsPageHeader
        heading={`${t['settingsDeposit']} - ${featureCode.savingGeneralSetting}`}
      />
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
