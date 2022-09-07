import { Box, Divider, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'settingsSideBarOrganization',
    to: '/settings/general/organization',
  },
  {
    title: 'serviceCenterSettings',
    to: '/settings/general/service-center',
  },
  {
    title: 'settingsSideBarChartsOfAccounts',
    to: '/settings/general/charts-of-accounts',
  },
  {
    title: 'settingsSideBarMembers',
    to: '/settings/general/members',
  },
  {
    title: 'settingsSideBarShare',
    to: '/settings/general/share',
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
    to: '/settings/general/loan/loan-general',
  },
  {
    title: 'settingsSideBarLoanProducts',
    to: '/settings/general/loan-products',
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
      w="275px"
      display="flex"
      flexDirection="column"
      gap="s16"
      p="s24"
      flexShrink={0}
      minWidth="250px"
    >
      <Text fontSize="l1" fontWeight="600" color="gray.800">
        {t['settingsGeneral']}
      </Text>
      <Divider borderColor="border.layout" />
      <VerticalSideBarForSettings tablinks={tabList} />
    </Box>
  );
};
