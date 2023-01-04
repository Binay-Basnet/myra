import { Box, Text } from '@chakra-ui/react';

import { Divider } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const orgTabList: TabList[] = [
  // {
  //   title: 'settingsSideBarOrganization',
  //   to: '/settings/general/organization',
  // },
  {
    title: 'serviceCenterSettings',
    to: ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST,
  },
  {
    title: 'settingsSideBarChartsOfAccounts',
    to: ROUTES.SETTINGS_GENERAL_COA,
  },
  {
    title: 'settingsAuditLog',
    to: ROUTES.SETTINGS_GENERAL_AUDIT_LOG,
  },
];

const tabList: TabList[] = [
  {
    title: 'settingsSideBarMembers',
    to: ROUTES.SETTINGS_GENERAL_MEMBERS,
  },
  {
    title: 'settingsSideBarShare',
    to: ROUTES.SETTINGS_GENERAL_SHARE,
  },
  {
    title: 'settingsSideBarDeposit',
    to: ROUTES.SETTINGS_GENERAL_SAVINGS_TDS,
  },
  {
    title: 'settingsSideBarDepositProducts',
    to: ROUTES.SETTINGS_GENERAL_SP_LIST,
  },
  {
    title: 'settingsSideBarLoan',
    to: ROUTES.SETTINGS_GENERAL_LOAN,
  },

  {
    title: 'settingsSideBarLoanProducts',
    to: ROUTES.SETTINGS_GENERAL_LP_LIST,
  },
];

const otherTabList: TabList[] = [
  {
    title: 'Code Management',
    to: ROUTES.SETTINGS_GENERAL_CODE_MANAGEMENT_CBS,
  },
  {
    title: 'settingsAlternativeChannel',
    to: ROUTES.SETTINGS_GENERAL_ALTERNATIVE_CHANNELS,
  },
  {
    title: 'Indexing',
    to: ROUTES.SETTINGS_GENERAL_INDEXING,
  },
  // {
  //   title: 'settingsDocuments',
  //   to: '/settings/general/documents',
  // },
];

export const SettingSideBar = () => {
  const { t } = useTranslation();
  return (
    <Box height="100%">
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        width="260px"
        height="calc(100vh - 110px)"
        overflowY="auto"
        position="fixed"
      >
        <Box height="50px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['settingsGeneral']}
          </Text>
        </Box>
        <Box p="s16">
          <VerticalSideBarForSettings tablinks={orgTabList} />
          <Divider my="s16" />
          <VerticalSideBarForSettings tablinks={tabList} />
          <Divider my="s16" />
          <VerticalSideBarForSettings tablinks={otherTabList} />
        </Box>
      </Box>
    </Box>
  );
};
