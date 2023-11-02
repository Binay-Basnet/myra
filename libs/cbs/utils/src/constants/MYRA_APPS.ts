import { ROUTES } from './ROUTES';

export const MYRA_APPS = [
  {
    key: 'CBS',
    title: 'corebankingSystems',
    img: '/cbs.svg',
    link: ROUTES.CBS_MEMBER_LIST,
  },
  {
    key: 'MEMBER_AND_SHARE',
    title: 'memberAndShareManagement',
    img: '/memberandshare.svg',
    link: ROUTES.CBS_MEMBER_LIST,
  },
  {
    key: 'ACCOUNTING',
    title: 'accountingSystem',
    img: '/accounting.svg',
    link: ROUTES.ACCOUNTING_SALES_ENTRY,
  },
  {
    key: 'ALTERNATIVE_CHANNELS',
    title: 'alternativeChannelsAndCrossConnectivity',
    img: '/tnt.svg',
    link: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_USERS,
  },
  {
    key: 'INVENTORY',
    title: 'inventoryManagement',
    img: '/inventory.svg',
    link: ROUTES.INVENTORY_REGISTER,
  },
  {
    key: 'HCM',
    title: 'hrTrainingAndCapacityManagement',
    img: '/btcd.svg',
    link: ROUTES.HRMODULE_EMPLOYEES_LIST,
  },
  {
    key: 'BPM',
    title: 'businessProcessManagement',
    img: '/rvn.svg',
    link: ROUTES.BPM_TASKS_LISTS,
  },
  {
    key: 'FAM',
    title: 'fixedAssetManagement',
    img: '/rvn.svg',
    link: ROUTES?.FAM_ASSETS_LIST,
  },
  {
    key: 'MICROFINANCE',
    title: 'microfinance',
    img: '/cbs.svg',
    link: ROUTES.MICRO_FINANCE_GROUPS_LIST,
  },
] as const;
