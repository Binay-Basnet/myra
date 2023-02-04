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
          label: 'items',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_REGISTER,
        },
      ],
    },

    ITEMS: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'items',
      pages: [
        {
          label: 'items',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_ITEMS,
        },
      ],
    },
    WAREHOUSE: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'warehouse',
      pages: [
        {
          label: 'items',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_WAREHOUSE,
        },
      ],
    },
    SUPPLIERS: {
      aclKey: 'CBS_MEMBERS_MEMBER',
      label: 'warehouse',
      pages: [
        {
          label: 'items',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.INVENTORY_SUPPLIERS,
        },
      ],
    },
  },
};
