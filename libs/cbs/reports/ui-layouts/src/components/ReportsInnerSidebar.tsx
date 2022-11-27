import { Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@chakra-ui/react';

import { Box, SidebarTabs } from '@myra-ui';

const REPORTS_INNER_TAB_LINKS = [
  {
    title: 'Organization Profile / Report',
    to: '/reports/cbs/organizations',
  },
  {
    title: 'Share Report',
    to: '/reports/cbs/share',
  },
  {
    title: 'Member Report',
    to: '/reports/cbs/member-report',
  },
  {
    title: 'Savings Report',
    to: '/reports/cbs/savings',
  },
  {
    title: 'Loan Report',
    to: '/reports/cbs/loan',
  },
  {
    title: 'Transaction Report',
    to: '/reports/cbs/transactions',
  },
  {
    title: 'Mobile Banking Reports',
    to: '/reports/cbs/mobile-banking',
  },

  {
    title: 'ATM Reports',
    to: '/reports/cbs/atm-report',
  },
  {
    title: 'Branchless Banking Reports',
    to: '/reports/cbs/branch-less-report',
  },
  {
    title: 'Branch Report',
    to: '/reports/cbs/service-center',
  },
  {
    title: 'Others Report',
    to: '/reports/cbs/others',
  },
];

export const ReportsInnerSidebar = () => {
  const router = useRouter();

  const currentIndex = useMemo(
    () => REPORTS_INNER_TAB_LINKS.findIndex((link) => router.pathname.includes(link.to)),
    [router.pathname]
  );
  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {REPORTS_INNER_TAB_LINKS.map((tabs) => (
          <Fragment key={tabs?.title}>
            <SidebarTabs {...tabs} />
          </Fragment>
        ))}
      </Tabs>
    </Box>
  );
};
