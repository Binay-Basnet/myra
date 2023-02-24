import { Box, Divider, Text } from '@chakra-ui/react';

import { ROUTES } from '@coop/cbs/utils';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'settingsUserSidebarSuperAdmin',
    to: ROUTES.SETTINGS_USERS_LIST,
  },
  // {
  //   title: 'settingsUserSidebarAgent',
  //   to: '/settings/users/agent',
  // },
  // {
  //   title: 'settingsUserSidebarOtherUsers',
  //   to: '/settings/users/other-users',
  // },
];

const otherTabList: TabList[] = [
  // {
  //   title: 'settingsUserSidebarRoleReferences',
  //   to: '/settings/users/role-references',
  // },
  // {
  //   title: 'settingsUserSidebarInvitation',
  //   to: '/settings/users/invitation',
  // },
];

export const SettingsUserSideBar = () => (
  <Box
    w="240px"
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
    <Divider borderColor="border.layout" />
    <VerticalSideBarForSettings tablinks={otherTabList} />
  </Box>
);
