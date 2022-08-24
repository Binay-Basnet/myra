import { Box, Divider, Text } from '@chakra-ui/react';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'settingsUserSidebarSuperAdmin',
    to: '/settings/users/super-admin',
  },
  {
    title: 'settingsUserSidebarBranchManager',
    to: '/settings/general/service-center',
  },
  {
    title: 'settingsUserSidebarAgent',
    to: '/settings/general/charts-of-accounts',
  },
  {
    title: 'settingsUserSidebarOtherUsers',
    to: '/settings/general/members',
  },
  {
    title: 'settingsUserSidebarRoleReferences',
    to: '/settings/general/share',
  },
  {
    title: 'settingsUserSidebarInvitation',
    to: '/settings/general/deposit/tds',
  },
];

export const SettingsUserSideBar = () => {
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
        Users
      </Text>
      <Divider borderColor="border.layout" />
      <VerticalSideBarForSettings tablinks={tabList} />
    </Box>
  );
};
