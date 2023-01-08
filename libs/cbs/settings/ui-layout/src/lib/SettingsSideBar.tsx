import { Box, Text } from '@chakra-ui/react';

import { Divider, TabColumn } from '@myra-ui';

import { AclKey, ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

type TabList = {
  label: string;
  route: string;
  aclKey: AclKey;
};

const orgTabList: TabList[] = [
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
    label: 'settingsAuditLog',
    aclKey: 'SETTINGS_AUDIT_LOG',
    route: ROUTES.SETTINGS_GENERAL_AUDIT_LOG,
  },
  {
    label: 'bank',
    aclKey: 'SETTINGS_BANK',
    route: ROUTES.SETTINGS_GENERAL_BANK,
  },
];

const tabList: TabList[] = [
  {
    label: 'settingsSideBarMembers',
    aclKey: 'SETTINGS_MEMBER',

    route: ROUTES.SETTINGS_GENERAL_MEMBERS,
  },
  {
    label: 'settingsSideBarShare',
    aclKey: 'SETTINGS_SHARE',

    route: ROUTES.SETTINGS_GENERAL_SHARE,
  },
  {
    label: 'settingsSideBarDeposit',
    aclKey: 'SETTINGS_SAVING_PARAMETERS',

    route: ROUTES.SETTINGS_GENERAL_SAVINGS_TDS,
  },
  {
    label: 'settingsSideBarDepositProducts',
    aclKey: 'SETTINGS_SAVING_PRODUCTS',

    route: ROUTES.SETTINGS_GENERAL_SP_LIST,
  },
  {
    label: 'settingsSideBarLoan',
    aclKey: 'SETTINGS_LOAN_PARAMETERS',

    route: ROUTES.SETTINGS_GENERAL_LOAN,
  },

  {
    label: 'settingsSideBarLoanProducts',
    aclKey: 'SETTINGS_LOAN_PRODUCTS',

    route: ROUTES.SETTINGS_GENERAL_LP_LIST,
  },
];

const otherTabList: TabList[] = [
  {
    label: 'Code Management',
    aclKey: 'SETTINGS_CODE_MANAGEMENT',
    route: ROUTES.SETTINGS_GENERAL_CODE_MANAGEMENT_CBS,
  },
  {
    label: 'settingsAlternativeChannel',
    aclKey: 'SETTINGS_ALTERNATIVE_CHANNELS',
    route: ROUTES.SETTINGS_GENERAL_ALTERNATIVE_CHANNELS,
  },
  {
    label: 'Indexing',
    route: ROUTES.SETTINGS_GENERAL_INDEXING,
    aclKey: 'SETTINGS_INDEXING',
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
      >
        <Box height="50px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['settingsGeneral']}
          </Text>
        </Box>
        <Box p="s16">
          <TabColumn list={orgTabList} />
          <Divider my="s16" />
          <TabColumn list={tabList} />
          <Divider my="s16" />
          <TabColumn list={otherTabList} />
        </Box>
      </Box>
    </Box>
  );
};
