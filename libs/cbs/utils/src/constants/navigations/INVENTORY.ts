import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const INVENTORY: NavType = {
  label: 'Inventory',
  menus: {
    INVENTORY: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'inventory',
      pages: [
        {
          label: 'Inventory Register',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_REGISTER,
        },
        {
          label: 'Inventory Adjustments',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_INVENTORY_ADJUSTMENT,
          addRoute: ROUTES.INVENTORY_INVENTORY_ADJUSTMENT_ADD,
        },
      ],

      forms: [
        {
          label: 'New Inventory Adjustment',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_INVENTORY_ADJUSTMENT_ADD,
        },
      ],
    },

    ITEMS: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'items',
      pages: [
        {
          label: 'Items',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_ITEMS,
          addRoute: ROUTES.INVENTORY_ITEMS_ADD,
        },
        {
          label: 'Items Category',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_ITEMS_CATEGORY,
        },
        {
          label: 'Units',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_ITEMS_UNIT_LIST,
        },
      ],
      forms: [
        {
          label: 'Add New Item',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_ITEMS_ADD,
        },
      ],
    },
    WAREHOUSE: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'warehouse',
      pages: [
        {
          label: 'Warehouse List',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_WAREHOUSE,
        },
        {
          label: 'Warehouse Transfer',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_WAREHOUSE_TRASFER_LIST,
        },
      ],
    },
    SUPPLIERS: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'warehouse',
      pages: [
        {
          label: 'Supplier List',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_SUPPLIERS,
          addRoute: ROUTES.INVENTORY_SUPPLIERS_ADD,
        },
      ],
      forms: [
        {
          label: 'Add New Suppliers',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_SUPPLIERS_ADD,
        },
      ],
    },
  },
};
