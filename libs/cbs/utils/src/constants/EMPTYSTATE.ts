import { IconType } from 'react-icons';
import { AiOutlineSend } from 'react-icons/ai';
import { BsArrowLeftRight, BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoMailUnreadOutline, IoPerson, IoPrismOutline } from 'react-icons/io5';
import { TbMailForward } from 'react-icons/tb';

import { Page } from './NAV';
import { ROUTES } from './ROUTES';

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
    buttonLink: [
      {
        label: 'New Share Issue',
        aclKey: 'CBS_SHARE_SHARE_ISSUE',
        route: ROUTES.CBS_SHARE_ISSUE_ADD,
      },
      {
        label: 'New Share Return',
        aclKey: 'CBS_SHARE_SHARE_RETURN',
        route: ROUTES.CBS_SHARE_RETURN_ADD,
      },
    ],
  },
  SAVINGS: {
    icon: ImStack,
    title: 'Savings',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Savings/account',
    buttonLink: [
      {
        label: 'newAccountOpen',
        aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT',
        route: ROUTES.CBS_ACCOUNT_OPEN_ADD,
      },
      {
        label: 'New Account Close',
        aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT_CLOSE',
        route: ROUTES.CBS_ACCOUNT_CLOSE_ADD,
      },
    ],
  },
  LOAN: {
    icon: BsArrowLeftRight,
    title: 'Loan',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Loan/',
    buttonLink: [
      {
        label: 'New Loan Application',
        aclKey: 'CBS_LOAN_LOAN_APPLICATION',
        route: ROUTES.CBS_LOAN_APPLICATIONS_ADD,
      },
      {
        label: 'Loan Repayment',
        aclKey: 'CBS_TRANSACTIONS_LOAN_REPAYMENT',
        route: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
      },
    ],
  },
  TRANSACTIONS: {
    icon: IoIosList,
    title: 'Transactions',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Transaction/record_transaction',
    buttonLink: [
      {
        label: 'transactionSidebarNewDeposit',
        route: ROUTES.CBS_TRANS_DEPOSIT_ADD,
        aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
      },
      {
        label: 'transactionSidebarNewWithdraw',
        route: ROUTES.CBS_TRANS_WITHDRAW_ADD,
        aclKey: 'CBS_TRANSACTIONS_WITHDRAW',
      },
      {
        label: 'transactionSidebarNewAccountTransfer',
        route: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD,
        aclKey: 'CBS_TRANSACTIONS_ACCOUNT_TRANSFER',
      },
      {
        label: 'transactionSidebarNewLoanPayment',
        route: ROUTES.CBS_TRANS_LOAN_PAYMENT_ADD,
        aclKey: 'CBS_TRANSACTIONS_LOAN_REPAYMENT',
      },

      {
        label: 'transactionSidebarNewMarketRepresentativeTransaction',
        route: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD,
        aclKey: 'CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION',
      },
      {
        label: 'New Journal Voucher',
        route: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD,
        aclKey: 'CBS_TRANSACTIONS_JOURNAL_VOUCHER',
      },
    ],
  },

  TRANSFERS: {
    icon: AiOutlineSend,
    title: 'Transfers',
    subtitle: '',
    buttonLabel: '',
    docLink: 'https://docs.migration.myraerp.com/docs/CBS/Transfer/Record_transfer',
    buttonLink: [
      {
        label: 'transferVaultTransfer',
        route: ROUTES.CBS_TRANSFER_VAULT_ADD,
        aclKey: 'CBS_TRANSFERS_VAULT_TRANSFER',
      },
      {
        label: 'transferTellerTransfer',
        route: ROUTES.CBS_TRANSFER_TELLER_ADD,
        aclKey: 'CBS_TRANSFERS_TELLER_TRANSFER',
      },
      {
        label: 'transCashTransitTransfer',
        route: ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_ADD,
        aclKey: 'CBS_TRANSFERS_CASH_IN_TRANSIT_TRANSFER',
      },
      {
        label: 'transServiceCenterTransfer',
        route: ROUTES.CBS_TRANSFER_SERVICE_TRANSFER_ADD,
        aclKey: 'CBS_TRANSFERS_SERVICE_CENTER_CASH_TRANSFER',
      },
    ],
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
    buttonLink: [
      {
        label: 'Withdraw Slip Book',
        route: ROUTES.CBS_WITHDRAW_SLIP_BOOK_ADD,
        aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_ISSUE',
      },
      {
        label: 'Block Withdraw Slip Requests',
        route: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD,
        aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_BLOCK',
      },
    ],
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
    buttonLink: [
      {
        label: 'New Market Representatives Transaction',
        route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD,
        aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
      },
      {
        label: 'New Profit to Fund Management',
        route: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_ADD,
        aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_PROFIT_TO_FUND_MANAGEMENT',
      },
      {
        label: 'New Share Dividend Posting',
        route: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD,
        aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING',
      },
    ],
  },
};

export default EMPTYSTATE;
