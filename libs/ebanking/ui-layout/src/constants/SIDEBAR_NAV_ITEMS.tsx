import { IoCube, IoCubeOutline, IoDocumentText, IoDocumentTextOutline } from 'react-icons/io5';
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
    label: 'Home',
    link: '/home',
    icon: {
      active: MdHome,
      inactive: MdOutlineHome,
    },
  },
  {
    label: 'Accounts',
    link: '/accounts',
    icon: {
      active: MdCalendarViewDay,
      inactive: MdOutlineCalendarViewDay,
    },
  },
  // {
  //   label: 'Utility Payments',
  //   link: '/utility-payments',
  //   icon: {
  //     active: IoWaterSharp,
  //     inactive: IoWaterOutline,
  //   },
  // },
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
    label: 'COOP',
    link: '/coop',
    icon: {
      active: MdWorkspacesFilled,
      inactive: MdWorkspacesFilled,
    },
  },

  {
    label: 'Share Info',
    link: '/share-info',
    icon: {
      active: IoCube,
      inactive: IoCubeOutline,
    },
  },
  {
    label: 'Transaction History',
    link: '/transaction-history',
    icon: {
      active: IoDocumentText,
      inactive: IoDocumentTextOutline,
    },
  },
  {
    label: 'Settings',
    link: '/settings',
    icon: {
      active: MdOutlineSettings,
      inactive: MdOutlineSettings,
    },
  },
];
