import { Fragment, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@chakra-ui/react';

import { Box, SidebarTabs } from '@myra-ui';

const REPORTS_INNER_TAB_LINKS = [
  // {
  //   title: 'Organization Profile / Report',
  //   to: '/reports/cbs/organizations',
  // },
  {
    title: 'Share Report',
    to: '/reports/cbs/share',
  },
  {
    title: 'Member Report',
    to: '/reports/cbs/members',
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
    title: 'Service Center Report',
    to: '/reports/cbs/service-center',
  },
  // {
  //   title: 'Exception Reports',
  //   to: '/reports/cbs/exceptions',
  // },
  {
    title: 'Others Report',
    to: '/reports/cbs/others',
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
