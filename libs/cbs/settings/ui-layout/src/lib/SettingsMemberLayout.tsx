import React from 'react';

import { Box } from '@coop/shared/ui';

import { SettingsPageHeader } from './SettingsPageHeader';
import { SettingsInnerVerticalMenu } from '../components/SettingsInnerVerticalMenu';

const tabList = [
  {
    title: 'General',
    to: '/settings/general/members',
  },
  {
    title: 'KYM Form - Individual',
    to: '/settings/general/members/kym-individual',
  },
  {
    title: 'KYM Form - Institutional',
    to: '/settings/general/members/kym-institutional',
  },
  {
    title: 'KYM Form - CoOperative',
    to: '/settings/general/members/kym-cooperative',
  },
  {
    title: 'KYM Form - CoOperative Union',
    to: '/settings/general/members/kym-cooperative-union',
  },
];

interface SettingsMemberLayout {
  children: React.ReactNode;
}

export const SettingsMemberLayout = ({ children }: SettingsMemberLayout) => {
  return (
    <>
      <SettingsPageHeader heading="Member Settings" />
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
