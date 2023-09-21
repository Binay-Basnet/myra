import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@chakra-ui/react';

import { Box, SidebarTabs } from '@myra-ui';

import { AclKey, Can } from '@coop/cbs/utils';

const REPORTS_INNER_TAB_LINKS: { title: string; to: string; acl: AclKey }[] = [
  {
    title: 'Share Report',
    to: '/cbs/reports/cbs-reports/share',
    acl: 'CBS_REPORTS_SHARE',
  },
  {
    title: 'Member Report',
    to: '/cbs/reports/cbs-reports/members',
    acl: 'CBS_REPORTS_MEMBER',
  },
  {
    title: 'Savings Report',
    to: '/cbs/reports/cbs-reports/savings',
    acl: 'CBS_REPORTS_SAVINGS',
  },
  {
    title: 'Loan Report',
    to: '/cbs/reports/cbs-reports/loan',
    acl: 'CBS_REPORTS_LOAN',
  },
  {
    title: 'Transaction Report',
    to: '/cbs/reports/cbs-reports/transactions',
    acl: 'CBS_REPORTS_TRANSACTION',
  },
  {
    title: 'Mobile Banking Reports',
    to: '/cbs/reports/cbs-reports/mobile-banking',
    acl: 'CBS_REPORTS_MOBILE_BANKING',
  },
  {
    title: 'Service Center Report',
    to: '/cbs/reports/cbs-reports/service-center',
    acl: 'CBS_REPORTS_SERVICE_CENTER',
  },
  {
    title: 'Exception Reports',
    to: '/cbs/reports/cbs-reports/exceptions',
    acl: 'CBS_REPORTS_EXCEPTION',
  },
  {
    title: 'Inventory Reports',
    to: '/cbs/reports/cbs-reports/inventory',
    acl: 'CBS_REPORTS_INVENTORY',
  },
  {
    title: 'Accounting Reports',
    to: '/cbs/reports/cbs-reports/accounting',
    acl: 'CBS_REPORTS_ACCOUNTING',
  },
  {
    title: 'Others Report',
    to: '/cbs/reports/cbs-reports/others',
    acl: 'CBS_REPORTS_OTHER',
  },
];

interface IReportsInnerSidebarProps {
  tabs?: { title: string; to: string; acl: AclKey }[];
}

export const ReportsInnerSidebar = ({
  tabs = REPORTS_INNER_TAB_LINKS,
}: IReportsInnerSidebarProps) => {
  const router = useRouter();

  const listName = router.query['report-group'];

  return (
    <Box>
      <Tabs variant="unstyled" index={-1}>
        {tabs.map((tab) => (
          <Fragment key={tab?.title}>
            <Can I="SHOW_IN_MENU" a={tab.acl}>
              <SidebarTabs isSelected={tab.to.split('/')[4] === listName} {...tab} />
            </Can>
          </Fragment>
        ))}
      </Tabs>
    </Box>
  );
};
