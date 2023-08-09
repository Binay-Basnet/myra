import {
  IoCube,
  IoCubeOutline,
  IoDocumentText,
  IoDocumentTextOutline,
  IoWaterOutline,
  IoWaterSharp,
} from 'react-icons/io5';
import {
  MdCalendarViewDay,
  MdHome,
  MdOutlineCalendarViewDay,
  MdOutlineHome,
  MdOutlineSettings,
  MdWorkspacesFilled,
} from 'react-icons/md';

export const SIDEBAR_NAV_ITEMS = [
  {
    key: 'HOME',
    label: 'Home',
    link: '/home',
    icon: {
      active: MdHome,
      inactive: MdOutlineHome,
    },
  },
  {
    key: 'ACCOUNTS',
    label: 'Accounts',
    link: '/accounts',
    icon: {
      active: MdCalendarViewDay,
      inactive: MdOutlineCalendarViewDay,
    },
  },
  {
    key: 'UTILITY_PAYMENTS',
    label: 'Utility Payments',
    link: '/utility-payments',
    icon: {
      active: IoWaterSharp,
      inactive: IoWaterOutline,
    },
  },
  // {
  //   label: 'Saved Payment',
  //   link: '/saved-payments',
  //   icon: {
  //     active: MdOutlineCollectionsBookmark,
  //     inactive: MdCollectionsBookmark,
  //   },
  // },
  // {
  //   label: 'Scheduled Payments',
  //   link: '/scheduled-payments',
  //   icon: {
  //     active: IoCashSharp,
  //     inactive: IoCashOutline,
  //   },
  // },
  {
    key: 'COOP',
    label: 'COOP',
    link: '/coop',
    icon: {
      active: MdWorkspacesFilled,
      inactive: MdWorkspacesFilled,
    },
  },

  {
    key: 'SHARE_INFO',
    label: 'Share Info',
    link: '/share-info',
    icon: {
      active: IoCube,
      inactive: IoCubeOutline,
    },
  },
  {
    key: 'TRANSACTION_HISTORY',
    label: 'Transaction History',
    link: '/transaction-history',
    icon: {
      active: IoDocumentText,
      inactive: IoDocumentTextOutline,
    },
  },
  {
    key: 'SETTINGS',
    label: 'Settings',
    link: '/settings',
    icon: {
      active: MdOutlineSettings,
      inactive: MdOutlineSettings,
    },
  },
] as const;
