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
    to: '/settings/users/service-center-manager',
  },
  {
    title: 'settingsUserSidebarAgent',
    to: '/settings/users/agent',
  },
  {
    title: 'settingsUserSidebarOtherUsers',
    to: '/settings/users/other-users',
  },
  {
    title: 'settingsUserSidebarRoleReferences',
    to: '/settings/users/role-references',
  },
  {
    title: 'settingsUserSidebarInvitation',
    to: '/settings/users/invitation',
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
