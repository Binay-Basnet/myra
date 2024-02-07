import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@chakra-ui/react';

import { Box, SidebarTabs } from '@myra-ui';

import { AclKey, Can } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

const REPORTS_INNER_TAB_LINKS: { title: string; to: string; acl: AclKey }[] = [
  {
    title: 'reportsSidebarShareReports',
    to: '/cbs/reports/cbs-reports/share',
    acl: 'CBS_REPORTS_SHARE',
  },
  {
    title: 'reportsSidebarMemberReports',
    to: '/cbs/reports/cbs-reports/members',
    acl: 'CBS_REPORTS_MEMBER',
  },
  {
    title: 'reportsSidebarSavingsReports',
    to: '/cbs/reports/cbs-reports/savings',
    acl: 'CBS_REPORTS_SAVINGS',
  },
  {
    title: 'reportsSidebarLoanReports',
    to: '/cbs/reports/cbs-reports/loan',
    acl: 'CBS_REPORTS_LOAN',
  },
  {
    title: 'reportsSidebarTransactionReports',
    to: '/cbs/reports/cbs-reports/transactions',
    acl: 'CBS_REPORTS_TRANSACTION',
  },
  {
    title: 'reportsSidebarMobileBankingReports',
    to: '/cbs/reports/cbs-reports/mobile-banking',
    acl: 'CBS_REPORTS_MOBILE_BANKING',
  },
  {
    title: 'reportsSidebarServiceCenterReports',
    to: '/cbs/reports/cbs-reports/service-center',
    acl: 'CBS_REPORTS_SERVICE_CENTER',
  },
  {
    title: 'reportsSidebarExceptionReports',
    to: '/cbs/reports/cbs-reports/exceptions',
    acl: 'CBS_REPORTS_EXCEPTION',
  },
  {
    title: 'reportsSidebarInventoryReports',
    to: '/cbs/reports/cbs-reports/inventory',
    acl: 'CBS_REPORTS_INVENTORY',
  },
  {
    title: 'reportsSidebarAccountingReports',
    to: '/cbs/reports/cbs-reports/accounting',
    acl: 'CBS_REPORTS_ACCOUNTING',
  },
  {
    title: 'reportsSidebarMicroFinanceReports',
    to: '/cbs/reports/cbs-reports/micro-finance',
    acl: 'CBS_REPORTS_MICROFINANCE',
  },
  {
    title: 'reportsSidebarOthersReports',
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

  const { t } = useTranslation();

  return (
    <Box>
      <Tabs variant="unstyled" index={-1}>
        {tabs.map((tab) => (
          <Fragment key={tab?.title}>
            <Can I="SHOW_IN_MENU" a={tab.acl}>
              <SidebarTabs
                isSelected={tab.to.split('/')[4] === listName}
                {...tab}
                title={t[tab?.title]}
              />
            </Can>
          </Fragment>
        ))}
      </Tabs>
    </Box>
  );
};
