import { Box, Text } from '@chakra-ui/react';

import { Divider, TabColumn } from '@myra-ui';

import { AclKey, ROUTES } from '@coop/cbs/utils';

type TabList = {
  label: string;
  route: string;
  aclKey: AclKey;
};

const orgTabList: TabList[] = [
  {
    label: 'Organization',
    aclKey: 'SETTINGS_SERVICE_CENTER',
    route: ROUTES.SETTINGS_GENERAL_ORGANIZATION_DETAILS,
  },
  {
    label: 'serviceCenterSettings',
    aclKey: 'SETTINGS_SERVICE_CENTER',
    route: ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST,
  },
  {
    label: 'settingsSideBarChartsOfAccounts',
    aclKey: 'SETTINGS_COA',
    route: ROUTES.SETTINGS_GENERAL_COA,
  },
  {
    label: 'Day End',
    aclKey: 'SETTINGS_SERVICE_CENTER',
    route: ROUTES.SETTINGS_EOD_HISTORY,
  },
  {
    label: 'Committee',
    aclKey: 'SETTINGS_SERVICE_CENTER',
    route: ROUTES.SETTINGS_GENERAL_COMMITTEE,
  },
  {
    label: 'bank',
    aclKey: 'SETTINGS_BANK',
    route: ROUTES.SETTINGS_GENERAL_BANK,
  },
  {
    label: 'Print Preference',
    aclKey: 'SETTINGS_PRINT_PREFERENCE',
    route: ROUTES.SETTINGS_GENERAL_PRINT_PREFERENCE,
  },
  {
    label: 'Code Management',
    aclKey: 'SETTINGS_CODE_MANAGEMENT',
    route: ROUTES.SETTINGS_GENERAL_CODE_MANAGEMENT_CBS,
  },
  {
    label: 'Indexing',
    route: ROUTES.SETTINGS_GENERAL_INDEXING,
    aclKey: 'SETTINGS_INDEXING',
  },
];

export const GlobalSettingSidebar = () => (
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
      Global Settings
    </Text>
    <Divider borderColor="border.layout" />
    <TabColumn list={orgTabList} />
  </Box>
);
