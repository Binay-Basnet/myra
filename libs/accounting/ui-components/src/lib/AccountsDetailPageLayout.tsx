import React from 'react';

import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DetailPageHeader, DetailPageSideBar } from '../components';

const tabList = [
  {
    title: 'bankAccountsOverview',
    to: '/accounting/accounting/bank-accounts/12123/overview',
  },
  {
    title: 'bankAccountsBankStatement',
    to: '/accounting/accounting/bank-accounts/12123/bank-statement',
  },
  {
    title: 'bankAccountsBookStatement',
    to: '/accounting/accounting/bank-accounts/12123/book-statement',
  },
  {
    title: 'bankAccountsReconcillationReport',
    to: '/accounting/accounting/bank-accounts/12123/reconcillation-report',
  },
  {
    title: 'bankAccountsCheque',
    to: '/accounting/accounting/bank-accounts/12123/cheque',
  },
  {
    title: 'bankAccountsTasks',
    to: '/accounting/accounting/bank-accounts/12123/tasks',
  },
  {
    title: 'bankAccountsDocuments',
    to: '/accounting/accounting/bank-accounts/12123/documents',
  },
  {
    title: 'bankAccountsActivity',
    to: '/accounting/accounting/bank-accounts/12123/activity',
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
