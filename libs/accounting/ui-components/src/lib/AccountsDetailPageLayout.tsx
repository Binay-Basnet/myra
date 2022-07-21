import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DetailPageHeader, DetailPageSideBar } from '../components';

const tabList = [
  {
    title: 'bankAccountsOverview',
    to: '/settings/general/members',
  },
  {
    title: 'bankAccountsBankStatement',
    to: '/settings/general/members/kym-individual',
  },
  {
    title: 'bankAccountsBookStatement',
    to: '/settings/general/members/kym-institutional',
  },
  {
    title: 'bankAccountsReconcillationReport',
    to: '/settings/general/members/kym-cooperative',
  },
  {
    title: 'bankAccountsCheque',
    to: '/settings/general/members/kym-cooperative-union',
  },
  {
    title: 'bankAccountsTasks',
    to: '/settings/general/members/kym-institutional',
  },
  {
    title: 'bankAccountsDocuments',
    to: '/settings/general/members/kym-cooperative',
  },
  {
    title: 'bankAccountsActivity',
    to: '/settings/general/members/kym-cooperative-union',
  },
];

interface AccountsDetailLayout {
  children: React.ReactNode;
}

export const AccountsDetailPageLayout = ({
  children,
}: AccountsDetailLayout) => {
  const { t } = useTranslation();

  return (
    <>
      <DetailPageHeader heading={t['settingsMember']} />
      <Box
        w="300px"
        px="s8"
        position="fixed"
        py="s16"
        borderRight={'1px'}
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <DetailPageSideBar tablinks={tabList} />
      </Box>
      <Box bg="background.500" ml="300px">
        {children}
      </Box>
    </>
  );
};
