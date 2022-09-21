import React from 'react';
import { useRouter } from 'next/router';

import { Box, PathBar } from '@coop/shared/ui';

import { DetailPageSideBar } from '../components/detailPage';

interface SettingsDetailPage {
  children: React.ReactNode;
  // tabList: { title: string; to: string }[];
}

const tabList = [
  {
    title: 'bankAccountsOverview',
    to: '/accounting/accounting/bank-accounts/12123/overview',
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
  {
    title: 'bankAccountsBankStatement',
    to: '/accounting/accounting/bank-accounts/12123/bank-statement',
  },
];

export const SettingsDetailPageLayout = ({ children }: SettingsDetailPage) => {
  const router = useRouter();

  return (
    <>
      <Box bg="white" zIndex="10" ml="s20" top="110px" position="sticky">
        <PathBar
          paths={[
            {
              label: 'Loan Products',
              link: '/accounting/accounting/bank-accounts/list',
            },
            {
              label: 'House Loan',
              link: router.asPath,
            },
          ]}
        />
      </Box>
      <Box
        w="240px"
        position="fixed"
        borderRight="1px"
        borderRightColor="border.layout"
        minHeight="100vh"
      >
        <DetailPageSideBar tablinks={tabList} />
      </Box>
      <Box bg="background.500" ml="240px">
        {children}
      </Box>
    </>
  );
};
