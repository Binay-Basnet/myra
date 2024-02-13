import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const CBS: NavType = {
  label: 'coreBankingSystem',
  menus: {
    MEMBERS: {
      label: 'Members',
      aclKey: 'CBS_MEMBERS_MEMBER',
      pages: [
        {
          label: 'activeMembers',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.CBS_MEMBER_LIST,
        },
        {
          label: 'inactiveMembers',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.CBS_MEMBER_INACTIVE_LIST,
        },
        {
          label: 'minorMembers',
          aclKey: 'CBS_MEMBERS_MEMBER',
          route: ROUTES.CBS_MEMBER_MINOR_LIST,
        },
      ],
      settingPages: [
        {
          label: 'memberSettings',
          aclKey: 'SETTINGS_MEMBER',
          route: ROUTES.SETTINGS_GENERAL_MEMBERS,
        },
      ],
      reportPages: [
        {
          label: 'memberLayoutMemberClassification',
          aclKey: 'REPORTS_MEMBER_MEMBER_CLASSIFICATION',
          route: ROUTES.CBS_REPORTS_MEMBER_CLASSIFICATION,
        },
        {
          label: 'memberLayoutActiveInactiveMemberReport',
          aclKey: 'REPORTS_MEMBER_ACTIVE_INACTIVE',
          route: ROUTES.CBS_REPORTS_MEMBER_ACTIVE_INACTIVE,
        },
        {
          label: 'memberLayoutKymStatusReport',
          aclKey: 'REPORTS_MEMBER_KYM_STATUS',
          route: ROUTES.CBS_REPORTS_KYM_STATUS,
        },
      ],
    },

    SHARE: {
      label: 'Share',
      aclKey: 'CBS_SHARE',

      forms: [
        {
          label: 'shareNewShareIssue',
          aclKey: 'CBS_SHARE_SHARE_ISSUE',
          route: ROUTES.CBS_SHARE_ISSUE_ADD,
        },
        {
          label: 'shareNewShareReturn',
          aclKey: 'CBS_SHARE_SHARE_RETURN',
          route: ROUTES.CBS_SHARE_RETURN_ADD,
        },
      ],

      pages: [
        {
          label: 'shareBalance',
          aclKey: 'CBS_SHARE_SHARE_BALANCE',
          route: ROUTES.CBS_SHARE_BALANCE,
        },
        {
          label: 'shareRegister',
          aclKey: 'CBS_SHARE_SHARE_REGISTER',
          route: ROUTES.CBS_SHARE_REGISTER,
        },
      ],
      settingPages: [
        {
          label: 'shareSettings',
          aclKey: 'SETTINGS_SHARE',
          route: ROUTES.SETTINGS_GENERAL_SHARE,
        },
      ],
      reportPages: [
        {
          label: 'shareLayoutRegisterReport',
          route: ROUTES.CBS_REPORTS_SHARE_REGISTER,
          aclKey: 'REPORTS_SHARE_SHARE_REGISTER',
        },
        {
          label: 'shareLayoutStateReport',
          route: ROUTES.CBS_REPORTS_SHARE_STATEMENT,
          aclKey: 'REPORTS_SHARE_SHARE_STATEMENT',
        },
        {
          label: 'shareLayoutTransactionReport',
          aclKey: 'REPORTS_SHARE_SHARE_TRANSACTION',
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
          label: 'newAccountClose',
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
          aclKey: 'REPORTS_SAVINGS_SAVING_ACCOUNT_STATEMENT',
          route: ROUTES.CBS_REPORTS_SAVING_STATEMENT,
        },
        {
          label: 'savingsIntrestTaxReport',
          aclKey: 'REPORTS_SAVINGS_INTEREST_TAX',
          route: ROUTES.CBS_REPORTS_INTEREST_TAX_REPORT,
        },
        {
          label: 'savingsIntrestStatement',
          aclKey: 'REPORTS_SAVINGS_INTEREST_REPORT',
          route: ROUTES.CBS_REPORTS_INTEREST_STATEMENT,
        },
      ],
    },
    LOAN: {
      label: 'Loan',
      aclKey: 'CBS_LOAN',
      forms: [
        {
          label: 'newLoanApplication',
          aclKey: 'CBS_LOAN_LOAN_APPLICATION',
          route: ROUTES.CBS_LOAN_APPLICATIONS_ADD,
        },
        {
          label: 'newLoanRepayment',
          aclKey: 'CBS_TRANSACTIONS_LOAN_REPAYMENT',
          route: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
        },
        {
          label: 'newCloseLoanAccount',
          // route: ROUTES.CBS_LOAN_CLOSED_ACCOUNTS,
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT_CLOSE',
          route: ROUTES.CBS_LOAN_CLOSED_ACCOUNTS_ADD,
        },
        {
          label: 'newLoanLossProvision',
          // route: ROUTES.CBS_LOAN_CLOSED_ACCOUNTS,
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT_CLOSE',
          route: ROUTES.CBS_LOAN_LOSS_PROVISION_ADD,
        },
      ],
      pages: [
        {
          label: 'loanAccounts',
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT',
          route: ROUTES.CBS_LOAN_ACCOUNTS_LIST,
        },
        {
          label: 'loanApplications',
          route: ROUTES.CBS_LOAN_APPLICATIONS_LIST,
          aclKey: 'CBS_LOAN_LOAN_APPLICATION',
          addRoute: ROUTES.CBS_LOAN_APPLICATIONS_ADD,
        },
        {
          label: 'loanRepayment',
          aclKey: 'CBS_TRANSACTIONS_LOAN_REPAYMENT',
          route: ROUTES.CBS_LOAN_REPAYMENTS_LIST,
          addRoute: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
        },
        {
          label: 'loanProducts',
          aclKey: 'SETTINGS_LOAN_PRODUCTS',
          route: ROUTES.CBS_LOAN_PRODUCTS_LIST,
        },
        {
          label: 'declinedLoan',
          route: ROUTES.CBS_LOAN_DECLINED_LIST,
          aclKey: 'CBS_LOAN_DECLINED_LOAN',
        },
        {
          label: 'closedAccounts',
          route: ROUTES.CBS_LOAN_CLOSED_ACCOUNTS,
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT_CLOSE',
          addRoute: ROUTES.CBS_LOAN_CLOSED_ACCOUNTS_ADD,
        },
        {
          label: 'loanLossProvision',
          route: ROUTES.CBS_LOAN_LOSS_PROVISION_LIST,
          aclKey: 'CBS_LOAN_LOAN_ACCOUNT_CLOSE',
          addRoute: ROUTES.CBS_LOAN_LOSS_PROVISION_ADD,
        },
        {
          label: 'loanWriteOff',
          route: ROUTES.CBS_LOAN_WRITE_OFF_LIST,
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
          label: 'loanAccountStatementReport',
          route: ROUTES.CBS_REPORTS_LOAN_ACCOUNT_STATEMENT_REPORT,
          aclKey: 'REPORTS_LOAN_LOAN_ACCOUNT_STATEMENT',
        },
        {
          label: 'loanLayoutAgeingReport',
          route: ROUTES.CBS_REPORTS_LOAN_AGEING_REPORT,
          aclKey: 'REPORTS_LOAN_LOAN_AGING',
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

        // {
        //   label: 'transactionSidebarNewMarketRepresentativeTransaction',
        //   route: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD,
        //   aclKey: 'CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION',
        // },
        {
          label: 'transactionSidebarNewJournalVoucher',
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

          // addRoute: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD,
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
          label: 'transactionsSidebarAdjustedTransaction',
          route: ROUTES.CBS_TRANS_ADJUSTED_TRANSACTIONS_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
        },
        {
          label: 'transactionsSidebarAllLedger',
          route: ROUTES.CBS_TRANS_ALL_LEDGERS_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
        },
        {
          label: 'transactionsSidebarAllUserAccounts',
          route: ROUTES.CBS_TRANS_ALL_ACCOUNTS_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
        },
        {
          label: 'transactionsSidebarAllHoldingAccounts',
          route: ROUTES.CBS_TRANS_ALL_HOLDING_ACCOUNTS_LIST,
          aclKey: 'CBS_TRANSACTIONS_DEPOSIT',
        },
      ],
      reportPages: [
        {
          label: 'transactionLayoutBalanceSheet',
          route: ROUTES.CBS_REPORTS_TRANS_TRIAL_SHEET,
          aclKey: 'REPORTS_TXN_TRIAL_BALANCE',
        },
        {
          label: 'transactionLayoutCashFlowStament',
          route: ROUTES.CBS_REPORTS_TRANS_CASH_LEDGER,
          aclKey: 'REPORTS_TXN_CASH_LEDGER',
        },
        {
          label: 'transactionLayoutBankGLStatement',
          route: ROUTES.CBS_REPORTS_TRANS_BANK_GL_STATEMENT,
          aclKey: 'REPORTS_TXN_BANK_GL_BALANCE',
        },
      ],
    },
    TRANSFERS: {
      label: 'Transfer',
      aclKey: 'CBS_TRANSFERS',
      forms: [
        {
          label: 'transferVaultTransfer',
          route: ROUTES.CBS_TRANSFER_VAULT_ADD,
          aclKey: 'CBS_TRANSFERS_VAULT_TRANSFER',
        },
        {
          label: 'transferBankTransfer',
          route: ROUTES.CBS_TRANSFER_BANK_ADD,
          aclKey: 'CBS_TRANSFERS_BANK_TRANSFER',
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
          label: 'transferBankTransfer',
          route: ROUTES.CBS_TRANSFER_BANK_LIST,
          aclKey: 'CBS_TRANSFERS_BANK_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_BANK_ADD,
        },
        {
          label: 'transferTellerTransfer',
          route: ROUTES.CBS_TRANSFER_TELLER_LIST,
          aclKey: 'CBS_TRANSFERS_TELLER_TRANSFER',
          addRoute: ROUTES.CBS_TRANSFER_TELLER_ADD,
        },
        {
          label: 'transCashTransitTransfer',
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
          aclKey: 'REPORTS_TXN_VAULT_BALANCE',
        },
        {
          label: 'transferTellerReport',
          route: ROUTES.CBS_REPORTS_TELLER_REPORT,
          aclKey: 'REPORTS_TXN_TELLER_REPORT',
        },
        {
          label: 'transferCashLedgerReport',
          route: ROUTES.CBS_REPORTS_TRANS_CASH_LEDGER,
          aclKey: 'REPORTS_TXN_CASH_LEDGER',
        },
        {
          label: 'transferDayBookReport',
          route: ROUTES.CBS_REPORTS_DAY_BOOK_REPORT,
          aclKey: 'REPORTS_TXN_DAYBOOK',
        },
      ],
    },

    REQUESTS: {
      label: 'request',
      aclKey: 'CBS_REQUESTS',
      pages: [
        {
          label: 'requestMember',
          aclKey: 'CBS_REQUESTS_MEMBER_REQUESTS',
          route: ROUTES.CBS_REQUESTS_MEMBER_LIST,
        },
        {
          label: 'requestWithdraw',
          aclKey: 'CBS_REQUESTS_WITHDRAW_REQUEST',
          route: ROUTES.CBS_REQUESTS_WITHDRAW_VIA_COLLECTOR_LIST,
        },
        {
          label: 'requestLoan',
          aclKey: 'CBS_REQUESTS_LOAN_REQUESTS',
          route: ROUTES.CBS_REQUESTS_LOAN_LIST,
        },
        {
          label: 'requestMemberTransfer',
          aclKey: 'CBS_REQUESTS_LOAN_REQUESTS',
          route: ROUTES.CBS_REQUESTS_MEMBER_TRANSFER_LIST,
        },
      ],
    },

    WITHDRAW_SLIP: {
      label: 'Withdraw Slip',
      aclKey: 'CBS_WITHDRAW_SLIPS',
      pages: [
        {
          label: 'withdrawSlipBook',
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
          label: 'withdrawSlipBook',
          route: ROUTES.CBS_WITHDRAW_SLIP_BOOK_ADD,
          aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_ISSUE',
        },
        {
          label: 'withdrawSlipBlockRequests',
          route: ROUTES.CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD,
          aclKey: 'CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_BLOCK',
        },
      ],
    },
    MICROFINANCE: {
      label: 'Microfinance',
      aclKey: 'CBS_SHARE',
      forms: [
        {
          label: 'mfAddMFCenter',
          route: ROUTES.CBS_MICRO_FINANCE_CENTER_ADD,
          aclKey: 'MICROFINANCE_MF_MF',
        },
        {
          label: 'mfAddMFGroup',
          route: ROUTES.CBS_MICRO_FINANCE_GROUP_ADD,
          aclKey: 'MICROFINANCE_MF_MF',
        },
        {
          label: 'mfAddGroupMeetings',
          route: ROUTES.CBS_MICRO_FINANCE_GROUP_MEETINGS_ADD,
          aclKey: 'MICROFINANCE_MF_MF',
        },
      ],
      pages: [
        {
          label: 'mfCenter',
          route: ROUTES?.CBS_MICRO_FINANCE_CENTER_LIST,
          aclKey: 'MICROFINANCE_MF_MF',
          addRoute: ROUTES.CBS_MICRO_FINANCE_CENTER_ADD,
        },
        {
          label: 'mfGroup',
          route: ROUTES?.CBS_MICRO_FINANCE_GROUP_LIST,
          aclKey: 'MICROFINANCE_MF_MF',
          addRoute: ROUTES.CBS_MICRO_FINANCE_GROUP_ADD,
        },
        {
          label: 'mfGroupMeetings',
          route: ROUTES?.CBS_MICRO_FINANCE_GROUP_MEETINGS_LIST,
          aclKey: 'MICROFINANCE_MF_MF',
          addRoute: ROUTES.CBS_MICRO_FINANCE_GROUP_MEETINGS_ADD,
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
        // {
        //   label: 'reportsSavedReports',
        //   aclKey: 'CBS_REPORTS',

        //   route: ROUTES.CBS_REPORT_SAVED,
        // },
      ],
    },

    OTHERS: {
      label: 'OTHERS',
      aclKey: 'CBS_OTHERS',
      pages: [
        {
          label: 'othersMRList',
          route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
        },
        {
          label: 'othersMRTransaction',
          route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST,
          aclKey: 'CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION',
          // addRoute: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD,
        },
        {
          label: 'othersProfitToFundManagement',
          route: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_PROFIT_TO_FUND_MANAGEMENT',
          addRoute: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_ADD,
        },
        {
          label: 'othersShareDividendPosting',
          route: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING',
          addRoute: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD,
        },
        {
          label: 'othersBulkTransfer',
          route: ROUTES.CBS_OTHERS_BULK_TRANSFERS_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING',
          addRoute: ROUTES.CBS_OTHERS_BULK_TRANSFERS_ADD,
        },
        {
          label: 'othersMRCollection',
          route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_LIST,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
          // addRoute: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_ADD,
        },
      ],
      forms: [
        // {
        //   label: 'New Market Representatives Transaction',
        //   route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD,
        //   aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
        // },
        {
          label: 'othersNewProfitToFundManagement',
          route: ROUTES.CBS_OTHERS_FUND_MANAGEMENT_ADD,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_PROFIT_TO_FUND_MANAGEMENT',
          prod: false,
        },
        {
          label: 'othersNewShareDividendPosting',
          route: ROUTES.CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING',
          prod: false,
        },
        {
          label: 'othersNewBulkTransfer',
          route: ROUTES.CBS_OTHERS_BULK_TRANSFERS_ADD,
          aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING',
        },
        // {
        //   label: 'New Market Representative Collection',
        //   route: ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_ADD,
        //   aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
        // },
      ],
    },
  },
};
