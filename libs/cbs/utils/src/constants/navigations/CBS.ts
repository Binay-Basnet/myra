import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

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
          route: ROUTES.CBS_REPORTS_MEMBER_ACTIVE_INACTIVE,
        },
        {
          label: 'memberLayoutKymStatusReport',
          aclKey: 'CBS_REPORTS',
          route: ROUTES.CBS_REPORTS_KYM_STATUS,
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
        {
          label: 'All Accounts',
          route: ROUTES.CBS_TRANS_ALL_ACCOUNTS_LIST,
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
          route: ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_ADD,
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
          label: 'transServiceCenterTransfer',
          route: ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_LIST,
          aclKey: 'CBS_TRANSFERS_SERVICE_CENTER_CASH_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_ADD,
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
