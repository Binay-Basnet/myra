import React from 'react';
import { useRouter } from 'next/router';

import { Box, PathBar } from '@myra-ui';

import { DetailPageSideBar } from '../components';

interface AccountsDetailLayout {
  children: React.ReactNode;
  // tabList: { title: string; to: string }[];
}

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

export const AccountsDetailPageLayout = ({ children }: AccountsDetailLayout) => {
  const router = useRouter();

  return (
    <>
      <Box bg="white" zIndex="10" ml="s20" top="0" position="sticky">
        <PathBar
          paths={[
            {
              label: 'Bank Accounts',
              link: '/accounting/accounting/bank-accounts/list',
            },
            {
              label: 'Standard Chartered Bank Nepal Ltd.',
              link: router.asPath,
            },
            // {
            //   label: String(router.query['name']),
            //   link: router.asPath,
            // },
          ]}
        />
      </Box>
      <Box
        w="250px"
        position="fixed"
        borderRight="1px"
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
