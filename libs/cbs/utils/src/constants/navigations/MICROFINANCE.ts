import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const MICROFINANCE: NavType = {
  label: 'Micro Finance',
  menus: {
    GROUPS: {
      aclKey: 'HCM_EMPLOYEE',
      label: 'Tasks',
      forms: [
        {
          label: 'Groups',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.MICRO_FINANCE_GROUPS_ADD,
        },
        {
          label: 'Groups Meetings',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.MICRO_FINANCE_GROUPS_MEETINGS_ADD,
        },
      ],

      pages: [
        {
          label: 'Groups',
          route: ROUTES.MICRO_FINANCE_GROUPS_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.MICRO_FINANCE_GROUPS_ADD,
        },
        {
          label: 'Groups Meetings',
          route: ROUTES.MICRO_FINANCE_GROUPS_MEETINGS_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.MICRO_FINANCE_GROUPS_MEETINGS_ADD,
        },
      ],
    },
    SAVINGS: {
      aclKey: 'HCM_EMPLOYEE_LIFECYCLE',
      label: 'Savings',
      forms: [
        {
          label: 'Saving Accounts',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          route: ROUTES.MICRO_FINANCE_SAVING_ACCOUNTS_ADD,
        },
        {
          label: 'Deposit',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          route: ROUTES.MICRO_FINANCE_DEPOSIT_ADD,
        },
        {
          label: 'Withdraw',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          route: ROUTES.MICRO_FINANCE_WITHDRAW_ADD,
        },
        {
          label: 'Saving Products',
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          route: ROUTES.MICRO_FINANCE_SAVING_PRODUCTS_ADD,
        },
      ],
      pages: [
        {
          label: 'Saving Accounts',
          route: ROUTES.MICRO_FINANCE_SAVING_ACCOUNTS_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          addRoute: ROUTES.MICRO_FINANCE_SAVING_ACCOUNTS_ADD,
        },
        {
          label: 'Deposit',
          route: ROUTES.MICRO_FINANCE_DEPOSIT_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          addRoute: ROUTES.MICRO_FINANCE_DEPOSIT_ADD,
        },
        {
          label: 'Withdraw',
          route: ROUTES.MICRO_FINANCE_WITHDRAW_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_ONBOARDING',
          addRoute: ROUTES.MICRO_FINANCE_WITHDRAW_ADD,
        },
        {
          label: 'Saving Products',
          route: ROUTES.MICRO_FINANCE_SAVING_PRODUCTS_LIST,
          aclKey: 'HCM_EMPLOYEE_LIFECYCLE_TRANSFER',
          addRoute: ROUTES.MICRO_FINANCE_SAVING_PRODUCTS_ADD,
        },
      ],
    },
  },
};
