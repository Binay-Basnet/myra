import { Box, Divider, Text } from '@chakra-ui/react';

import { ROUTES } from '@coop/cbs/utils';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const tabList: TabList[] = [
  {
    title: 'settingsAuditLog',
    to: ROUTES.SETTINGS_GENERAL_AUDIT_LOG,
  },
  {
    title: 'settingsAccessLog',
    to: ROUTES.SETTINGS_ACCESS_LOG,
  },
];

export const SettingsMonitorSidebar = () => (
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
      Monitor
    </Text>
    <Divider borderColor="border.layout" />
    <VerticalSideBarForSettings tablinks={tabList} />
  </Box>
);
