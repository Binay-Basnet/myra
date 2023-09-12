import { Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@chakra-ui/react';

import { Box, SidebarTabs } from '@myra-ui';

const REPORTS_INNER_TAB_LINKS = [
  // {
  //   title: 'Organization Profile / Report',
  //   to: '/cbs/reports/cbs-reports/organizations',
  // },
  {
    title: 'Share Report',
    to: '/cbs/reports/cbs-reports/share',
  },
  {
    title: 'Member Report',
    to: '/cbs/reports/cbs-reports/members',
  },
  {
    title: 'Savings Report',
    to: '/cbs/reports/cbs-reports/savings',
  },
  {
    title: 'Loan Report',
    to: '/cbs/reports/cbs-reports/loan',
  },
  {
    title: 'Transaction Report',
    to: '/cbs/reports/cbs-reports/transactions',
  },
  {
    title: 'Mobile Banking Reports',
    to: '/cbs/reports/cbs-reports/mobile-banking',
  },
  {
    title: 'Service Center Report',
    to: '/cbs/reports/cbs-reports/service-center',
  },
  {
    title: 'Exception Reports',
    to: '/cbs/reports/cbs-reports/exceptions',
  },
  {
    title: 'Inventory Reports',
    to: '/cbs/reports/cbs-reports/inventory',
  },
  {
    title: 'Accounting Reports',
    to: '/cbs/reports/cbs-reports/accounting',
  },
  {
    title: 'Others Report',
    to: '/cbs/reports/cbs-reports/others',
  },
];

interface IReportsInnerSidebarProps {
  tabs?: { title: string; to: string }[];
}

export const ReportsInnerSidebar = ({
  tabs = REPORTS_INNER_TAB_LINKS,
}: IReportsInnerSidebarProps) => {
  const router = useRouter();

  const currentIndex = useMemo(
    () => tabs.findIndex((link) => router.pathname.includes(link.to)),
    [router.pathname]
  );
  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {tabs.map((tab) => (
          <Fragment key={tab?.title}>
            <SidebarTabs {...tab} />
          </Fragment>
        ))}
      </Tabs>
    </Box>
  );
};
