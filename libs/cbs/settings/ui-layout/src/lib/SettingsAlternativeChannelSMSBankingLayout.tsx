import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'SMS Template',
    to: ROUTES.SETTINGS_APPLICATION_ALTERNATIVE_CHANNEL_SMS_BANKING_SMS_TEMPLATE,
  },
  {
    title: 'SMS Setting',
    to: ROUTES.SETTINGS_APPLICATION_ALTERNATIVE_CHANNEL_SMS_BANKING_SMS_SETTING,
  },
];

interface ISettingsLoanLayout {
  children: React.ReactNode;
}

export const SettingsAlternativeChannelSMSBankingLayout = ({ children }: ISettingsLoanLayout) => {
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
