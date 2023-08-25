import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'General',
    to: ROUTES.SETTINGS_APPLICATION_ALTERNATIVE_CHANNEL_UTILITY_PAYMENT_GENERAL,
  },
  {
    title: 'Topup',
    to: ROUTES.SETTINGS_APPLICATION_ALTERNATIVE_CHANNEL_UTILITY_PAYMENT_TOPUP,
  },
  {
    title: 'Internet',
    to: ROUTES.SETTINGS_APPLICATION_ALTERNATIVE_CHANNEL_UTILITY_PAYMENT_INTERNET,
  },
];

interface ISettingsLoanLayout {
  children: React.ReactNode;
}

export const SettingsAlternativeChannelUtilityPaymentLayout = ({
  children,
}: ISettingsLoanLayout) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={`${t['settingsAlternativeChannel']}`} />
      <Box
        w="250px"
        px="s8"
        position="fixed"
        bg="white"
        zIndex={15}
        py="s16"
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
