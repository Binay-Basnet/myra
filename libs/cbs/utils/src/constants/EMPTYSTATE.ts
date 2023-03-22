import { IconType } from 'react-icons';
import {
  FiBox,
  FiCreditCard,
  FiDisc,
  FiFileText,
  FiLayers,
  FiMessageSquare,
  FiRepeat,
  FiSend,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi';

import { APP_NAVS, Page } from './NAV';

type MenuType =
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
  | 'SETTINGS_SAVINGS_ORGANIZATION_RATE';

type Nodata = Record<
  MenuType,
  {
    icon?: IconType;
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonLink?: Page[];
    docLink?: string;
  }
>;

export const EMPTYSTATE: Nodata = {
  MEMBERS: {
    icon: FiUser,
    title: 'Member',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Member/member_add',
  },
  SHARE: {
    icon: FiTrendingUp,
    title: 'Share',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Share/intro',
    buttonLink: APP_NAVS.CBS.menus.SHARE?.forms,
  },
  SAVINGS: {
    icon: FiLayers,
    title: 'Savings',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Savings/account',
    buttonLink: APP_NAVS.CBS.menus.SAVINGS?.forms,
  },
  LOAN: {
    icon: FiBox,
    title: 'Loan',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Loan/',
    buttonLink: APP_NAVS.CBS.menus.LOAN?.forms,
  },
  TRANSACTIONS: {
    icon: FiSend,
    title: 'Transactions',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Transaction/record_transaction',
    buttonLink: APP_NAVS.CBS.menus.TRANSACTIONS?.forms,
  },

  TRANSFERS: {
    icon: FiRepeat,
    title: 'Transfers',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Transfer/Record_transfer',
    buttonLink: APP_NAVS.CBS.menus.TRANSFERS?.forms,
  },
  REPORTS: {
    icon: FiMessageSquare,
    title: 'Reports',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Reports/',
  },
  WITHDRAW_SLIP: {
    icon: FiCreditCard,
    title: 'Withdraw slip',
    subtitle: '',
    buttonLabel: '',
    docLink:
      'https://docs.migration.myraerp.com/docs/CBS/Withdraw%20Slip/Create_new_wihdraw_slip_book',
    buttonLink: APP_NAVS.CBS.menus.WITHDRAW_SLIP?.forms,
  },
  REQUESTS: {
    icon: FiFileText,
    title: 'Requests',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Requests/',
  },
  OTHERS: {
    icon: FiDisc,
    title: 'Reports',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Others/Market_representative_list',
    buttonLink: APP_NAVS.CBS.menus.OTHERS?.forms,
  },
  SETTINGS_SAVINGS_ORGANIZATION_RATE: {
    title: 'Interest Rate',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Others/Market_representative_list',
  },
};

export default EMPTYSTATE;
