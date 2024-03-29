import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const SETTINGS: NavType = {
  label: 'Settings',
  menus: {
    GENERAL: {
      aclKey: 'SETTINGS_GENERAL',
      label: 'General',
      pages: [
        {
          label: 'Members',
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

        {
          label: 'settingsAlternativeChannel',
          aclKey: 'SETTINGS_ALTERNATIVE_CHANNELS',
          route: ROUTES.SETTINGS_GENERAL_ALTERNATIVE_CHANNELS,
        },
      ],
    },
    USERS: {
      aclKey: 'SETTINGS_USERS',
      label: 'Users',
      pages: [
        {
          label: 'settingsUserSidebarSuperAdmin',
          route: ROUTES.SETTINGS_USERS_LIST,
          aclKey: 'SETTINGS_USERS',
        },
      ],
    },
    MONITOR: {
      aclKey: 'SETTINGS_AUDIT_LOG',
      label: 'Monitor',
      pages: [
        {
          label: 'settingsAuditLog',
          aclKey: 'SETTINGS_AUDIT_LOG',
          route: ROUTES.SETTINGS_GENERAL_AUDIT_LOG,
        },
        {
          label: 'settingsAccessLog',
          route: ROUTES.SETTINGS_ACCESS_LOG,
          aclKey: 'SETTINGS_AUDIT_LOG',
        },
      ],
    },
    GLOBAL: {
      aclKey: 'SETTINGS_AUDIT_LOG',
      label: 'GLOBAL',
      pages: [
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
          label: 'bank',
          aclKey: 'SETTINGS_BANK',
          route: ROUTES.SETTINGS_GENERAL_BANK,
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
      ],
    },
  },
};
