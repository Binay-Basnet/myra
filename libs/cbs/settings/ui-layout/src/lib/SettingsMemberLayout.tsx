import React from 'react';

import { Box } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'settingsSideGeneral',
    to: ROUTES.SETTINGS_GENERAL_MEMBERS,
  },
  {
    title: 'settingsSideIndividual',
    to: ROUTES.SETTINGS_GENERAL_MEMBERS_KYM_IND,
  },
  {
    title: 'settingsSideInstitutional',
    to: ROUTES.SETTINGS_GENERAL_MEMBERS_KYM_INS,
  },
  {
    title: 'settingsSideCoop',
    to: ROUTES.SETTINGS_GENERAL_MEMBERS_KYM_COOP,
  },
  {
    title: 'settingsSideCoopUnion',
    to: ROUTES.SETTINGS_GENERAL_MEMBERS_KYM_COOP_UNION,
  },
];

interface SettingsMemberLayoutProps {
  children: React.ReactNode;
}

export const SettingsMemberLayout = ({ children }: SettingsMemberLayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <SettingsPageHeader heading={t['settingsMember']} />
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
};
