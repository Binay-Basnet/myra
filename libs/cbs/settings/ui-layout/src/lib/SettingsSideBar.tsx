import { Box, Text } from '@chakra-ui/react';

import { Divider } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { VerticalSideBarForSettings } from '../components/VerticalSideBarForSettings';

type TabList = {
  title: string;
  to: string;
};

const orgTabList: TabList[] = [
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
    title: 'settingsAuditLog',
    to: '/settings/general/audit-log',
  },
];

const tabList: TabList[] = [
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
    to: '/settings/general/loan',
  },

  {
    title: 'settingsSideBarLoanProducts',
    to: '/settings/general/loan-products',
  },
];

const otherTabList: TabList[] = [
  {
    title: 'settingsAlternativeChannel',
    to: '/settings/general/alternative-channels/charges',
  },
  {
    title: 'settingsDocuments',
    to: '/settings/general/documents',
  },
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
