import { IconType } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoMailUnreadOutline, IoPerson, IoPrismOutline } from 'react-icons/io5';
import { TbMailForward } from 'react-icons/tb';

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
  | 'OTHERS';

type Nodata = Record<
  MenuType,
  {
    icon: IconType;
    title: string;
    subtitle?: string;
    buttonLabel?: string;
    buttonLink?: Page[];
    docLink?: string;
  }
>;

export const EMPTYSTATE: Nodata = {
  MEMBERS: {
    icon: IoPerson,
    title: 'Member',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Member/member_add',
  },
  SHARE: {
    icon: IoCubeOutline,
    title: 'Share',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Share/intro',
    buttonLink: APP_NAVS.CBS.menus.SHARE?.forms,
  },
  SAVINGS: {
    icon: ImStack,
    title: 'Savings',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Savings/account',
    buttonLink: APP_NAVS.CBS.menus.SAVINGS?.forms,
  },
  LOAN: {
    icon: BsArrowLeftRight,
    title: 'Loan',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Loan/',
    buttonLink: APP_NAVS.CBS.menus.LOAN?.forms,
  },
  TRANSACTIONS: {
    icon: IoIosList,
    title: 'Transactions',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Transaction/record_transaction',
    buttonLink: APP_NAVS.CBS.menus.TRANSACTIONS?.forms,
  },

  TRANSFERS: {
    icon: AiOutlineSend,
    title: 'Transfers',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Transfer/Record_transfer',
    buttonLink: APP_NAVS.CBS.menus.TRANSFERS?.forms,
  },
  REPORTS: {
    icon: BsFileText,
    title: 'Reports',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Reports/',
  },
  WITHDRAW_SLIP: {
    icon: TbMailForward,
    title: 'Withdraw slip',
    subtitle: '',
    buttonLabel: '',
    docLink:
      'https://docs.migration.myraerp.com/docs/CBS/Withdraw%20Slip/Create_new_wihdraw_slip_book',
    buttonLink: APP_NAVS.CBS.menus.WITHDRAW_SLIP?.forms,
  },
  REQUESTS: {
    icon: IoMailUnreadOutline,
    title: 'Requests',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Requests/',
  },
  OTHERS: {
    icon: IoPrismOutline,
    title: 'Reports',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Others/Market_representative_list',
    buttonLink: APP_NAVS.CBS.menus.OTHERS?.forms,
  },
};

export default EMPTYSTATE;
