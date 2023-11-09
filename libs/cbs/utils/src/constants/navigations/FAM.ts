import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const FAM: NavType = {
  label: 'Fixed Assets Management',
  menus: {
    ASSETS: {
      aclKey: 'HCM_EMPLOYEE',
      label: 'Assets',
      forms: [
        {
          label: 'Assets List',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_ASSETS_ADD,
        },
        {
          label: 'Assets Group',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_ASSETS_GROUP_ADD,
        },
      ],

      pages: [
        {
          label: 'Assets List',
          route: ROUTES.FAM_ASSETS_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_ASSETS_ADD,
        },
        {
          label: 'Assets Group',
          route: ROUTES.FAM_ASSETS_GROUP_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_ASSETS_GROUP_ADD,
        },
        {
          label: 'Asset Type',
          route: ROUTES.FAM_ASSETS_TYPE_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_ASSETS_TYPE_ADD,
        },
        {
          label: 'Custom Fields',
          route: ROUTES.FAM_CUSTOM_FIELDS_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_CUSTOM_FIELDS_ADD,
        },
      ],
    },
    OPERATIONS: {
      aclKey: 'HCM_EMPLOYEE',
      label: 'Operations',
      forms: [
        {
          label: 'Assets Transfer',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_ASSETS_ADD,
        },
        {
          label: 'Assets Assign',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_ASSETS_GROUP_ADD,
        },
        {
          label: 'Scheduling',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_SCHEDULING_ADD,
        },
        {
          label: 'Disposal',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_DISPOSAL_ADD,
        },
        {
          label: 'Maintenance',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_MAINTENANCE_ADD,
        },
      ],

      pages: [
        {
          label: 'Assets Transfer',
          route: ROUTES.FAM_ASSETS_TRANSFER_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_ASSETS_TRANSFER_ADD,
        },
        {
          label: 'Assets Assign',
          route: ROUTES.FAM_ASSETS_ASSIGN_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_ASSETS_ASSIGN_ADD,
        },
        {
          label: 'Scheduling',
          route: ROUTES.FAM_SCHEDULING_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_SCHEDULING_ADD,
        },
        {
          label: 'Disposal',
          route: ROUTES.FAM_DISPOSAL_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_DISPOSAL_ADD,
        },
        {
          label: 'Maintenance',
          route: ROUTES.FAM_MAINTENANCE_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_MAINTENANCE_ADD,
        },
      ],
    },
    PURCHASE: {
      aclKey: 'HCM_EMPLOYEE',
      label: 'Purchase',
      forms: [
        {
          label: 'Purchase Entry',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_PURCHASE_ENTRY_ADD,
        },
        {
          label: 'Supplier',
          aclKey: 'HCM_EMPLOYEE',
          route: ROUTES.FAM_PURCHASE_ENTRY_LIST,
        },
      ],

      pages: [
        {
          label: 'Purchase Entry',
          route: ROUTES.FAM_PURCHASE_ENTRY_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_PURCHASE_ENTRY_ADD,
        },
        {
          label: 'Supplier',
          route: ROUTES.FAM_SUPPLIER_LIST,
          aclKey: 'HCM_EMPLOYEE',
          addRoute: ROUTES.FAM_SUPPLIER_ADD,
        },
      ],
    },
  },
};
