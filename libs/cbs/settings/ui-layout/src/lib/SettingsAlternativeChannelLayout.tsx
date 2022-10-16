import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'acFeeAndCharges',
    to: '/settings/general/alternative-channels/charges',
  },
];

interface ISettingsLoanLayout {
  children: React.ReactNode;
}

export const SettingsAlternativeChannelLayout = ({ children }: ISettingsLoanLayout) => {
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
