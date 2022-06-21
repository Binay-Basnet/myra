import { Box, Divider, Text } from '@chakra-ui/react';

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
    title: 'settingsSideBarBranches',
    to: '/settings/general/branches',
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
    title: 'settingsSideBarDepositWithdraw',
    to: '/settings/general/deposit-withdraw',
  },
  {
    title: 'settingsSideBarLoan',
    to: '/settings/general/loan',
  },
];

export const SettingSideBar = () => {
  return (
    <Box
      w="13%"
      display="flex"
      flexDirection="column"
      gap="s16"
      flexShrink={0}
      minWidth="250px"
      pt="s8"
      pl="s8"
    >
      <Text fontSize="r3" fontWeight="600">
        General
      </Text>
      <Divider borderColor="border.layout" />
      <VerticalSideBarForSettings tablinks={tabList} />
    </Box>
  );
};
