import { useAbility } from '@casl/react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Id_Type } from '@coop/cbs/data-access';
import { AbilityContext, AclKey, Actions, RouteValue } from '@coop/cbs/utils';

import { ACCOUNTING, ALTERNATIVE_CHANNELS, CBS, INVENTORY, SETTINGS } from './navigations';

export type ModuleType = 'CBS' | 'SETTINGS' | 'ALTERNATIVE_CHANNELS' | 'ACCOUNTING' | 'INVENTORY';

export type MenuType =
  | 'MEMBERS'
  | 'SHARE'
  | 'SAVINGS'
  | 'LOAN'
  | 'TRANSACTIONS'
  | 'TRANSFERS'
  | 'REQUESTS'
  | 'WITHDRAW_SLIP'
  | 'REPORTS'
  | 'OTHERS'
  | 'GENERAL'
  | 'USERS'
  | 'DOWNLOADS'
  | 'SALES'
  | 'PURCHASE'
  | 'ACCOUNTING'
  | 'INVESTMENT'
  | 'INVENTORY'
  | 'ITEMS'
  | 'WAREHOUSE'
  | 'SUPPLIERS';

export type Page = {
  label: string;
  aclKey: AclKey;
  route: RouteValue;
  idType?: Id_Type;
};

type PageWithAdd = Page & {
  addAclKey?: AclKey;
  addRoute?: RouteValue;
};

export type NavType = {
  label: string;
  aclKey?: AclKey;
  menus: Partial<
    Record<
      MenuType,
      {
        label: string;
        aclKey: AclKey;
        forms?: Page[];
        pages: PageWithAdd[];
        settingPages?: Page[];
        reportPages?: Page[];
      }
    >
  >;
};

export const APP_NAVS = {
  CBS,
  SETTINGS,
  ALTERNATIVE_CHANNELS,
  ACCOUNTING,
  INVENTORY,
};

export const useLink = (app: ModuleType = 'CBS') => {
  const ability = useAbility(AbilityContext);

  const linkArr: string[] = [];

  const menuKeys = Object.keys(APP_NAVS[app].menus) as MenuType[];
  menuKeys.forEach((menu) => {
    const aclKey = APP_NAVS[app].menus?.[menu]?.aclKey;

    if (aclKey && ability.can('SHOW_IN_MENU', aclKey)) {
      APP_NAVS[app]?.menus[menu]?.pages.forEach((page) => {
        if (ability.can('SHOW_IN_MENU', page.aclKey)) {
          linkArr.push(page.route);
        }
      });
    }
    return true;
  });

  return { link: linkArr[0] || '/' };
};

export const useMenuLink = (menu: MenuType, app: ModuleType = 'CBS') => {
  const ability = useAbility(AbilityContext);

  const linkArr: string[] = [];

  const appMenu = APP_NAVS[app].menus[menu];

  console.log(appMenu?.pages);

  appMenu?.pages?.forEach((page) => {
    if (ability.can('SHOW_IN_MENU', page.aclKey)) {
      linkArr.push(page.route);
    }
    return true;
  });

  return { link: linkArr[0] || '/' };
};

export const useMultipleAbility = (keys: AclKey[], action: Actions) => {
  const ability = useAbility(AbilityContext);

  let isAllowed = false;

  keys.forEach((key) => {
    if (ability.can(action, key as AclKey)) {
      isAllowed = true;
    }
  });

  return isAllowed;
};
