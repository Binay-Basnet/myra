import { useAbility } from '@casl/react';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Id_Type } from '@coop/cbs/data-access';
import { AbilityContext, AclKey, Actions, RouteValue } from '@coop/cbs/utils';

import { ROUTES } from './ROUTES';

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

type Page = {
  label: string;
  aclKey: AclKey;
  route: RouteValue;
  idType?: Id_Type;
};

type PageWithAdd = Page & {
  addAclKey?: AclKey;
  addRoute?: RouteValue;
};

type NavType = {
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

export const CBS: NavType = {
  label: 'Core Banking System',
  menus: {
    MEMBERS: {
      label: 'Members',
      aclKey: 'CBS_MEMBERS_MEMBER',
      pages: [
        {
          label: 'Members',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.CBS_MEMBER_LIST,
        },
      ],
      settingPages: [
        {
          label: 'Member Settings',
          aclKey: 'SETTINGS_MEMBER',
          route: ROUTES.SETTINGS_GENERAL_MEMBERS,
        },
      ],
      reportPages: [
        {
          label: 'memberLayoutMemberClassification',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_MEMBER_CLASSIFICATION,
        },
        {
          label: 'memberLayoutActiveInactiveMemberReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_MEMBER_CLASSIFICATION,
        },
        {
          label: 'memberLayoutKymStatusReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_MEMBER_CLASSIFICATION,
        },
      ],
    },

    SHARE: {
      label: 'Share',
      aclKey: 'CBS_SHARE',

      forms: [
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

      pages: [
        {
          label: 'Share Balance',
          aclKey: 'CBS_SHARE_SHARE_BALANCE',
          route: ROUTES.CBS_SHARE_BALANCE,
        },
        {
          label: 'Share Register',
          aclKey: 'CBS_SHARE_SHARE_REGISTER',
          route: ROUTES.CBS_SHARE_REGISTER,
        },
      ],
      settingPages: [
        {
          label: 'Share Settings',
          aclKey: 'SETTINGS_SHARE',
          route: ROUTES.SETTINGS_GENERAL_SHARE,
        },
      ],
      reportPages: [
        {
          label: 'shareLayoutRegisterReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_SHARE_REGISTER,
        },
        {
          label: 'shareLayoutStateReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_SHARE_STATEMENT,
        },
        {
          label: 'shareLayoutTransactionReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_SHARE_TRANSACTION,
        },
      ],
    },

    SAVINGS: {
      label: 'Savings',
      aclKey: 'CBS_SAVINGS',
      forms: [
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
      pages: [
        {
          label: 'accountList',
          aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT',
          route: ROUTES.CBS_ACCOUNT_LIST,
          addRoute: ROUTES.CBS_ACCOUNT_OPEN_ADD,
        },
        {
          label: 'transactionsSidebarDeposit',
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
          route: ROUTES.CBS_ACCOUNT_DEPOSIT_LIST,
          addRoute: ROUTES.CBS_ACCOUNT_DEPOSIT_ADD,
        },
        {
          label: 'transactionsSidebarWithdraw',
          aclKey: 'CBS_TRANSACTIONS_WITHDRAW',
          route: ROUTES.CBS_ACCOUNT_WITHDRAW_LIST,
          addRoute: ROUTES.CBS_ACCOUNT_WITHDRAW_ADD,
        },
        {
          label: 'transactionsSidebarAccountTransfer',
          aclKey: 'CBS_TRANSACTIONS_ACCOUNT_TRANSFER',
          route: ROUTES.CBS_ACCOUNT_TRANSFER_LIST,
          addRoute: ROUTES.CBS_ACCOUNT_TRANSFER_ADD,
        },
        {
          label: 'savingProducts',
          aclKey: 'CBS_SAVINGS_SAVING_PRODUCT',
          route: ROUTES.CBS_ACCOUNT_SAVING_PRODUCT,
        },
        {
          label: 'accountClose',
          aclKey: 'CBS_SAVINGS_SAVING_ACCOUNT_CLOSE',
          route: ROUTES.CBS_ACCOUNT_CLOSE_LIST,
          addRoute: ROUTES.CBS_ACCOUNT_CLOSE_ADD,
        },
      ],
      settingPages: [
        {
          label: 'savingsDepositSettings',
          aclKey: 'SETTINGS_SAVING_PARAMETERS',
          route: ROUTES.SETTINGS_GENERAL_SAVINGS_TDS,
        },
        {
          label: 'savingsProductSettings',
          aclKey: 'SETTINGS_SAVING_PRODUCTS',
          route: ROUTES.SETTINGS_GENERAL_SP_LIST,
        },
      ],
      reportPages: [
        {
          label: 'savingsDepositStatementReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_SAVING_STATEMENT,
        },
        {
          label: 'savingsIntrestTaxReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_INTEREST_TAX_REPORT,
        },
        {
          label: 'savingsIntrestStatement',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_INTEREST_STATEMENT,
        },
      ],
    },
    LOAN: {
      label: 'Loan',
      aclKey: 'CBS_LOAN',
      forms: [
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
      pages: [
        {
          label: 'Loan Applications',
          route: ROUTES.CBS_LOAN_APPLICATIONS_LIST,
          aclKey: 'CBS_LOAN_LOAN_APPLICATION',
          addRoute: ROUTES.CBS_LOAN_APPLICATIONS_ADD,
        },
        {
          label: 'Loan Accounts',
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT',
          route: ROUTES.CBS_LOAN_ACCOUNTS_LIST,
        },
        {
          label: 'Loan Repayment',
          aclKey: 'CBS_TRANSACTIONS_LOAN_REPAYMENT',
          route: ROUTES.CBS_LOAN_REPAYMENTS_LIST,
          addRoute: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
        },
        {
          label: 'Loan Products',
          aclKey: 'SETTINGS_LOAN_PRODUCTS',
          route: ROUTES.CBS_LOAN_PRODUCTS_LIST,
        },
        {
          label: 'Declined Loan',
          route: ROUTES.CBS_LOAN_DECLINED_LIST,
          aclKey: 'CBS_LOAN_DECLINED_LOAN',
        },
        {
          label: 'Closed Accounts',
          route: ROUTES.CBS_LOAN_CLOSED_ACCOUNTS,
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT_CLOSE',
        },
      ],
      settingPages: [
        {
          label: 'loanLayoutSettings',
          route: ROUTES.SETTINGS_GENERAL_LOAN,
          aclKey: 'SETTINGS_LOAN_PARAMETERS',
        },
        {
          label: 'loanLayoutProductsSettings',
          route: ROUTES.SETTINGS_GENERAL_LP_LIST,
          aclKey: 'SETTINGS_LOAN_PRODUCTS',
        },
      ],
      reportPages: [
        {
          label: 'loanLayoutStatementReport',
          route: ROUTES.CBS_REPORTS_LOAN_STATEMENT,
          aclKey: 'CBS_REPORTS',
        },
        {
          label: 'loanLayoutAgeingReport',
          route: ROUTES.CBS_REPORTS_LOAN_AGEING_REPORT,
          aclKey: 'CBS_REPORTS',
        },
      ],
    },

    TRANSACTIONS: {
      label: 'Transactions',
      aclKey: 'CBS_TRANSACTIONS',
      forms: [
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
      pages: [
        {
          label: 'transactionsSidebarDeposit',
          route: ROUTES.CBS_TRANS_DEPOSIT_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
          addRoute: ROUTES.CBS_TRANS_DEPOSIT_ADD,
        },
        {
          label: 'transactionsSidebarWithdraw',
          route: ROUTES.CBS_TRANS_WITHDRAW_LIST,
          aclKey: 'CBS_TRANSACTIONS_WITHDRAW',
          addRoute: ROUTES.CBS_TRANS_WITHDRAW_ADD,
        },
        {
          label: 'transactionsSidebarAccountTransfer',
          route: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_LIST,
          aclKey: 'CBS_TRANSACTIONS_ACCOUNT_TRANSFER',
          addRoute: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD,
        },
        {
          label: 'transactionsSidebarLoanPayment',
          route: ROUTES.CBS_TRANS_LOAN_PAYMENT_LIST,
          addRoute: ROUTES.CBS_TRANS_LOAN_PAYMENT_ADD,
          aclKey: 'CBS_TRANSACTIONS_LOAN_REPAYMENT',
        },
        {
          label: 'transactionsSidebarAgentTransaction',
          route: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_LIST,
          aclKey: 'CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION',

          addRoute: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD,
        },
        {
          label: 'transactionsSidebarAgentList',
          route: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_LIST,
          aclKey: 'CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION',
        },
        {
          label: 'transactionsSidebarJournalVoucher',
          route: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_LIST,
          addRoute: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD,
          aclKey: 'CBS_TRANSACTIONS_JOURNAL_VOUCHER',
        },
        {
          label: 'transactionsSidebarAllTransactions',
          route: ROUTES.CBS_TRANS_ALL_TRANSACTION_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
        },
        {
          label: 'All Ledgers',
          route: ROUTES.CBS_TRANS_ALL_LEDGERS_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
        },
      ],
      reportPages: [
        {
          label: 'transactionLayoutBalanceSheet',
          route: ROUTES.CBS_REPORTS_TRANS_TRIAL_SHEET,
          aclKey: 'CBS_REPORTS',
        },
        {
          label: 'transactionLayoutCashFlowStament',
          route: ROUTES.CBS_REPORTS_TRANS_CASH_LEDGER,
          aclKey: 'CBS_REPORTS',
        },
        {
          label: 'transactionLayoutBankGLStatement',
          route: ROUTES.CBS_REPORTS_TRANS_BANK_GL_STATEMENT,
          aclKey: 'CBS_REPORTS',
        },
      ],
    },
    TRANSFERS: {
      label: 'Transfers',
      aclKey: 'CBS_TRANSFERS',
      forms: [
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
      pages: [
        {
          label: 'transferVaultTransfer',
          route: ROUTES.CBS_TRANSFER_VAULT_LIST,
          aclKey: 'CBS_TRANSFERS_VAULT_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_VAULT_ADD,
        },
        {
          label: 'transferTellerTransfer',
          route: ROUTES.CBS_TRANSFER_TELLER_LIST,
          aclKey: 'CBS_TRANSFERS_TELLER_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_TELLER_ADD,
        },
        {
          label: 'Cash in Transit Transfer',
          route: ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_LIST,
          aclKey: 'CBS_TRANSFERS_CASH_IN_TRANSIT_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_ADD,
        },
        {
          label: 'Service Center Cash Transfer',
          route: ROUTES.CBS_TRANSFER_SERVICE_TRANSFER_LIST,
          aclKey: 'CBS_TRANSFERS_SERVICE_CENTER_CASH_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_SERVICE_TRANSFER_ADD,
        },
      ],
      reportPages: [
        {
          label: 'transferVaultBalanceReport',
          route: ROUTES.CBS_REPORTS_VAULT_BALANCE,
          aclKey: 'CBS_REPORTS',
        },
        {
          label: 'transferTellerReport',
          route: ROUTES.CBS_REPORTS_TELLER_REPORT,
          aclKey: 'CBS_REPORTS',
        },
      ],
    },

    REQUESTS: {
      label: 'Requests',
      aclKey: 'CBS_REQUESTS',
      pages: [
        {
          label: 'Member Request',
          aclKey: 'CBS_REQUESTS_MEMBER_REQUESTS',
          route: ROUTES.CBS_REQUESTS_MEMBER_LIST,
        },
        {
          label: 'Withdraw Request',
          aclKey: 'CBS_REQUESTS_WITHDRAW_REQUEST',
          route: ROUTES.CBS_REQUESTS_WITHDRAW_VIA_COLLECTOR_LIST,
        },
        {
          label: 'Loan Request',
          aclKey: 'CBS_REQUESTS_LOAN_REQUESTS',
          route: ROUTES.CBS_REQUESTS_LOAN_LIST,
        },
      ],
    },

    WITHDRAW_SLIP: {
      label: 'Withdraw Slip',
      aclKey: 'CBS_WITHDRAW_SLIPS',
      pages: [
        {
          label: 'Withdraw Slip Book',
          route: ROUTES.CBS_WITHDRAW_SLIP_BOOK_LIST,
          aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_ISSUE',
          addRoute: ROUTES.CBS_WITHDRAW_SLIP_BOOK_ADD,
        },
        {
          label: 'withdrawSlipRequests',
          aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_REQUESTS',
          route: ROUTES.CBS_WITHDRAW_SLIP_LIST,
        },
        {
          label: 'withdrawSlipBlockRequests',
          route: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_LIST,
          aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_BLOCK',
          addRoute: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD,
        },
      ],
      forms: [
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

    REPORTS: {
      label: 'REPORTS',
      aclKey: 'CBS_REPORTS',
      pages: [
        {
          label: 'reportsCbsReports',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORT_LIST,
        },
        {
          label: 'reportsSavedReports',
          aclKey: 'CBS_REPORTS',

          route: ROUTES.CBS_REPORT_SAVED,
        },
      ],
    },

    OTHERS: {
      label: 'OTHERS',
      aclKey: 'CBS_OTHERS',
      pages: [
        {
          label: 'Market Representatives List',
          route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
        },
        {
          label: 'Market Representative Transactions',
          route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST,
          aclKey: 'CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION',
          addRoute: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD,
        },
        {
          label: 'Profit to Fund Management',
          route: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_PROFIT_TO_FUND_MANAGEMENT',
          addRoute: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_ADD,
        },
        {
          label: 'Share Dividend Posting',
          route: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING',
          addRoute: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD,
        },
      ],
      forms: [
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
  },
};

export const SETTINGS: NavType = {
  label: 'Settings',
  menus: {
    GENERAL: {
      aclKey: 'SETTINGS_GENERAL',
      label: 'General',
      pages: [
        {
          label: 'serviceCenterSettings',
          aclKey: 'SETTINGS_SERVICE_CENTER',
          route: ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST,
        },
        {
          label: 'settingsSideBarChartsOfAccounts',
          aclKey: 'SETTINGS_COA',
          route: ROUTES.SETTINGS_GENERAL_COA,
        },
        {
          label: 'settingsAuditLog',
          aclKey: 'SETTINGS_AUDIT_LOG',
          route: ROUTES.SETTINGS_GENERAL_AUDIT_LOG,
        },
        {
          label: 'bank',
          aclKey: 'SETTINGS_BANK',
          route: ROUTES.SETTINGS_GENERAL_BANK,
        },
        {
          label: 'settingsSideBarMembers',
          aclKey: 'SETTINGS_MEMBER',
          route: ROUTES.SETTINGS_GENERAL_MEMBERS,
        },
        {
          label: 'settingsSideBarShare',
          aclKey: 'SETTINGS_SHARE',
          route: ROUTES.SETTINGS_GENERAL_SHARE,
        },
        {
          label: 'settingsSideBarDeposit',
          aclKey: 'SETTINGS_SAVING_PARAMETERS',
          route: ROUTES.SETTINGS_GENERAL_SAVINGS_TDS,
        },
        {
          label: 'settingsSideBarDepositProducts',
          aclKey: 'SETTINGS_SAVING_PRODUCTS',
          route: ROUTES.SETTINGS_GENERAL_SP_LIST,
        },
        {
          label: 'settingsSideBarLoan',
          aclKey: 'SETTINGS_LOAN_PARAMETERS',
          route: ROUTES.SETTINGS_GENERAL_LOAN,
        },

        {
          label: 'settingsSideBarLoanProducts',
          aclKey: 'SETTINGS_LOAN_PRODUCTS',
          route: ROUTES.SETTINGS_GENERAL_LP_LIST,
        },
        {
          label: 'Code Management',
          aclKey: 'SETTINGS_CODE_MANAGEMENT',
          route: ROUTES.SETTINGS_GENERAL_CODE_MANAGEMENT_CBS,
        },
        {
          label: 'settingsAlternativeChannel',
          aclKey: 'SETTINGS_ALTERNATIVE_CHANNELS',
          route: ROUTES.SETTINGS_GENERAL_ALTERNATIVE_CHANNELS,
        },
        {
          label: 'Indexing',
          route: ROUTES.SETTINGS_GENERAL_INDEXING,
          aclKey: 'SETTINGS_INDEXING',
        },
      ],
    },
    USERS: {
      aclKey: 'SETTINGS_USERS',
      label: 'Users',
      pages: [
        {
          label: 'settingsUserSidebarSuperAdmin',
          route: ROUTES.SETTINGS_USERS_LIST,
          aclKey: 'SETTINGS_USERS',
        },
      ],
    },
  },
};

export const ACCOUNTING: NavType = {
  label: 'Accounting',
  menus: {
    SALES: {
      aclKey: 'ACCOUNTING_SALES',
      label: 'Sales',
      forms: [
        {
          label: 'accountingSalesSalesEntry',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_SALES_ENTRY',
          route: ROUTES.ACCOUNTING_SALES_ENTRY_ADD,
        },
        {
          label: 'creditNote',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE',
          route: ROUTES.ACCOUNTING_SALES_CREDIT_NOTE_ADD,
        },
        {
          label: 'customerPayment',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
        {
          label: 'accountingSalesCustomers',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
      ],
      pages: [
        {
          label: 'accountingSalesSalesEntry',
          route: ROUTES.ACCOUNTING_SALES_ENTRY,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_SALES_ENTRY',
          addRoute: ROUTES.ACCOUNTING_SALES_ENTRY_ADD,
        },
        {
          label: 'creditNote',
          route: ROUTES.ACCOUNTING_SALES_CREDIT_NOTE,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE',
          addRoute: ROUTES.ACCOUNTING_SALES_CREDIT_NOTE_ADD,
        },
        {
          label: 'customerPayment',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          addRoute: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
        {
          label: 'accountingSalesCustomers',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          addRoute: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
      ],
    },
    PURCHASE: {
      aclKey: 'ACCOUNTING_PURCHASE',
      label: 'PURCHASE',
      pages: [
        {
          label: 'accountingPurchaseSidebarPurchaseList',
          route: ROUTES.ACCOUNTING_PURCHASE_LIST,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_LIST_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY',
        },
        {
          label: 'accountingPurchaseSidebarExpenses',
          route: ROUTES.ACCOUNTING_PURCHASE_EXPENSE,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_EXPENSE_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_EXPENSES',
        },
        {
          label: 'accountingPurchaseSidebarDebitNote',
          route: ROUTES.ACCOUNTING_PURCHASE_DEBIT_NOTE,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_DEBIT_NOTE_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE',
        },
        {
          label: 'accountingPurchaseSidebarSupplierPayment',
          route: ROUTES.ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT',
        },
      ],
      forms: [
        {
          label: 'accountingPurchaseSidebarPurchaseList',
          route: ROUTES.ACCOUNTING_PURCHASE_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY',
        },
        {
          label: 'accountingPurchaseSidebarExpenses',
          route: ROUTES.ACCOUNTING_PURCHASE_EXPENSE,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_EXPENSES',
        },
        {
          label: 'accountingPurchaseSidebarDebitNote',
          route: ROUTES.ACCOUNTING_PURCHASE_DEBIT_NOTE,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE',
        },
        {
          label: 'accountingPurchaseSidebarSupplierPayment',
          route: ROUTES.ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT',
        },
      ],
    },
    ACCOUNTING: {
      label: 'Accounting',
      aclKey: 'ACCOUNTING_ACCOUNTING',
      pages: [
        {
          label: 'accountingAccountingSidebarJournalVouchers',
          route: ROUTES.ACCOUNTING_JOURNAL_VOUCHER_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY',
          addRoute: ROUTES.ACCOUNTING_JOURNAL_VOUCHER_ADD,
        },
        {
          label: 'accountingAccountingSidebarCashTransfer',
          route: ROUTES.ACCOUNTING_CASH_TRANSFER_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_CASH_TRANSFER',
          addRoute: ROUTES.ACCOUNTING_CASH_TRANSFER_ADD,
        },

        {
          label: 'accountingAccountingSidebarBankAccounts',
          route: ROUTES.ACCOUNTING_BANK_ACCOUNTS_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS',
          addRoute: ROUTES.ACCOUNTING_BANK_ACCOUNTS_ADD,
        },
        {
          label: 'accountingAccountingSidebarChartsOfAccounts',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_CHARTS_OF_ACCOUNTS',
          route: ROUTES.ACCOUNTING_COA_LIST,
        },
      ],

      forms: [
        {
          label: 'accountingAccountingSidebarJournalVouchers',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY',
          route: ROUTES.ACCOUNTING_JOURNAL_VOUCHER_ADD,
        },
        {
          label: 'accountingAccountingSidebarCashTransfer',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_CASH_TRANSFER',
          route: ROUTES.ACCOUNTING_CASH_TRANSFER_ADD,
        },

        {
          label: 'accountingAccountingSidebarBankAccounts',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS',
          route: ROUTES.ACCOUNTING_BANK_ACCOUNTS_ADD,
        },
      ],
    },
    LOAN: {
      label: 'External Loan',
      aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN',
      pages: [
        {
          label: 'External Loans',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN',
          addRoute: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ADD,
        },
        {
          label: 'External Loan Accounts',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ACCOUNTS_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_ACCOUNTS',
          addRoute: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ACCOUNTS_ADD,
        },
        {
          label: 'External Loan Payment',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_PAYMENTS',
          addRoute: ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_ADD,
        },
      ],
      forms: [
        {
          label: 'External Loans',
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ADD,
        },
        {
          label: 'External Loan Accounts',
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_ACCOUNTS',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ACCOUNTS_ADD,
        },
        {
          label: 'External Loan Payment',
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_PAYMENTS',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_ADD,
        },
      ],
    },

    INVESTMENT: {
      label: 'Investments',
      aclKey: 'ACCOUNTING_INVESTMENT',
      forms: [
        {
          label: 'Investments',
          route: ROUTES.ACCOUNTING_INVESTMENT_LIST_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS',
        },
        {
          label: 'Investment Accounts',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNTS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS_ACCOUNTS',
        },
        {
          label: 'Investment Transaction',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENT_TRANSACTIONS',
        },
      ],
      pages: [
        {
          label: 'Investments',
          route: ROUTES.ACCOUNTING_INVESTMENT_LIST,
          addRoute: ROUTES.ACCOUNTING_INVESTMENT_LIST_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS',
        },
        {
          label: 'Investment Accounts',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNTS,
          addRoute: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNTS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS_ACCOUNTS',
        },
        {
          label: 'Investment Transaction',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD,
          addRoute: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENT_TRANSACTIONS',
        },
      ],
    },
  },
};

export const ALTERNATIVE_CHANNELS: NavType = {
  label: 'Alternative Channels',
  menus: {
    USERS: {
      aclKey: 'ALTERNATIVE_CHANNELS_USERS',
      label: 'Users',
      forms: [
        {
          label: 'acActivateMBanking',
          route: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_REG,
          aclKey: 'ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION',
        },
        {
          label: 'acActivateEBanking',
          route: ROUTES.ALTERNATIVE_CHANNELS_EBANKING_REG_LIST,
          aclKey: 'ALTERNATIVE_CHANNELS_E_BANKING_REGISTRATION',
        },
        {
          label: 'acActivateSMSBanking',
          route: '/alternative-channels/users/activation?type=smsBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_SMS_REGISTRATION',
        },
      ],
      pages: [
        {
          label: 'acMBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION',
          route: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_REG_LIST,
          addRoute: ROUTES.ALTERNATIVE_CHANNELS_MBANKING_REG,
        },
        {
          label: 'acEBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_E_BANKING_REGISTRATION',
          route: ROUTES.ALTERNATIVE_CHANNELS_EBANKING_REG_LIST,
          addRoute: ROUTES.ALTERNATIVE_CHANNELS_EBANKING_REG,
        },
        {
          label: 'acSMSBanking',
          aclKey: 'ALTERNATIVE_CHANNELS_SMS_REGISTRATION',
          route: ROUTES.ALTERNATIVE_CHANNELS_SMS_BANKING_REG_LIST,
          addRoute: ROUTES.ALTERNATIVE_CHANNELS_SMS_BANKING_REG,
        },
      ],
    },
    DOWNLOADS: {
      aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
      label: 'Users',
      pages: [
        {
          label: 'acDownloadsForms',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_FORMS,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
        {
          label: 'acDownloadsGuidelines',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_GUIDELINES,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
        {
          label: 'acDownloadsReports',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_REPORTS,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
        {
          label: 'acDwnloadsDirectives',
          route: ROUTES.ALTERNATIVE_CHANNELS_DOWNLOADS_DIRECTIVES,
          aclKey: 'ALTERNATIVE_CHANNELS_DOWNLOADS',
        },
      ],
    },
  },
};

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
