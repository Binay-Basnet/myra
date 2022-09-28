import { Box, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'settingsAuditLog',
    to: '/settings/general/audit-log',
  },
  {
    title: 'settingsSideBarChartsOfAccounts',
    to: '/settings/general/charts-of-accounts',
  },
  {
    title: 'settingsSideBarDeposit',
    to: '/settings/general/deposit/tds',
  },
  {
    title: 'settingsSideBarDepositProducts',
    to: '/settings/general/deposit-products',
  },
  {
    title: 'settingsSideBarLoan',
    to: '/settings/general/loan',
  },
  {
    title: 'settingsSideBarLoanProducts',
    to: '/settings/general/loan-products',
  },

  {
    title: 'settingsSideBarMembers',
    to: '/settings/general/members',
  },
  {
    title: 'settingsSideBarOrganization',
    to: '/settings/general/organization',
  },
  {
    title: 'serviceCenterSettings',
    to: '/settings/general/service-center',
  },
  {
    title: 'settingsSideBarShare',
    to: '/settings/general/share',
  },
  {
    title: 'settingsSideBarValuator',
    to: '/settings/general/valuator/list',
  },
];

export const SettingSideBar = () => {
  const { t } = useTranslation();
  return (
    <Box
      position="fixed"
      w="260px"
      display="flex"
      flexDirection="column"
      flexShrink={0}
      minWidth="220px"
    >
      <Box height="60px" py="s12" px="s16">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['settingsGeneral']}
        </Text>
      </Box>
      <Box p="s16">
        <VerticalSideBarForSettings tablinks={tabList} />
      </Box>
    </Box>
  );
};
