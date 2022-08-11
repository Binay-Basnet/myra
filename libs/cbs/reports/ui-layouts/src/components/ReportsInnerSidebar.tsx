import React, { Fragment, useMemo } from 'react';
import { IoStar } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Tabs } from '@chakra-ui/react';

import { Box, Divider, Icon, SidebarTabs } from '@coop/shared/ui';

const REPORTS_INNER_TAB_LINKS = [
  {
    title: 'Organization Profile / Report',
    to: '/reports/cbs/organization-reports',
  },
  {
    title: 'Share Report',
    to: '/reports/cbs/share-report',
  },
  {
    title: 'Member Report',
    to: '/reports/cbs/member-report',
  },
  {
    title: 'Deposit Report',
    to: '/reports/cbs/deposit-report',
  },
  {
    title: 'Loan Report',
    to: '/reports/cbs/loan-report',
  },
  {
    title: 'Account Report',
    to: '/reports/cbs/account-report',
  },

  {
    title: 'Branch Report',
    to: '/reports/cbs/branch-report',
  },

  {
    title: 'Employee Report',
    to: '/reports/cbs/employee-report',
  },

  {
    title: 'Inventory Report',
    to: '/reports/cbs/inventory-report',
  },

  {
    title: 'Notification',
    to: '/reports/cbs/notification',
  },
];

export const ReportsInnerSidebar = () => {
  const router = useRouter();

  const currentIndex = useMemo(
    () =>
      REPORTS_INNER_TAB_LINKS.findIndex((link) =>
        router.pathname.includes(link.to)
      ),
    [router.pathname]
  );
  return (
    <Box>
      <Tabs
        variant="unstyled"
        index={router.pathname.includes('/favorites') ? 0 : 1}
      >
        <SidebarTabs
          title={
            <Box display="flex" alignItems="center" gap="s8">
              <Icon as={IoStar} size="md" color="primary.500" />
              Favorite Reports
            </Box>
          }
          // to={'/reports/cbs/favorites'}
          to={'/reports/cbs/share-report'}
        />
      </Tabs>
      <Divider my="s4" />
      <Tabs variant="unstyled" index={currentIndex}>
        {REPORTS_INNER_TAB_LINKS.map((tabs, index) => (
          <Fragment key={index}>
            <SidebarTabs {...tabs} />
          </Fragment>
        ))}
      </Tabs>
    </Box>
  );
};
