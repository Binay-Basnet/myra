export enum ReportGroup {
  ORGANIZATIONS = 'Organizations',
  OTHERS = 'Others',
  MEMBERS = 'Members',
  SHARE = 'Share',
  SAVINGS = 'Savings',
  LOAN = 'loan',
  MOBILE_BANKING = 'Mobile Banking',
  TRANSACTION_REPORT = 'Transaction Reports',
  BRANCHLESS_BANKING = 'Branchless Banking',
  ATM = 'ATM',
  BRANCH = 'Branch',
  EXCEPTION = 'Exception',
  INVENTORY = 'Inventory',
  ACCOUNTING = 'Accounting',
}

export enum Report {
  GENERAL_LEDGER_REPORT = 'General Ledger Report',

  ORGANIZATION_PROFILE = 'Organization Profile',
  BOARD_OF_DIRECTOR_DETAIL_REGISTER = 'Board Of Directors Detail Register',

  INDIVIDUAL_MEMBER_PROFILE = 'Individual Member Profile',
  MEMBER_REPORTS = 'Member Reports',
  MEMBER_REGISTER_REPORT = 'Member Register Report',
  MEMBER_ACTIVATIONS = 'Active/Inactive Member',
  MEMBER_CLASSIFICATION_REPORT = 'Member Classification Reports',
  KYM_STATUS_REPORT = 'Kym Status Report',
  MINOR_LIST_REPORT = 'Minor List Report',
  MEMBER_WISE_BALANCE_REPORT = 'Member Wise Balance Report',

  SHARE_REGISTER = 'Share Register',
  SHARE_STATEMENT = 'Share Statement Report',
  SHARE_TRANSACTION_REPORT = 'Share Transaction Report',
  SHARE_BALANCE_REPORT = 'Share Balance Report',
  SHARE_CONSOLIDATED_REPORT = 'Share Consolidated Report',
  SHARE_CERTIFICATE_PRINT = 'Share Certificate Print',
  SHARE_BONUS_DISTRIBUTION_REPORT = 'Share Bonus Distribution Report',

  SAVING_STATEMENT = 'Saving Account Statement',
  SAVING_INTEREST_STATEMENT = 'Interest Statement Report',
  DEPOSIT_CONSOLIDATED_REPORT = 'Deposit Consolidated Report',
  DEPOSIT_DAILY_TRANSACTION_REPORT = 'Deposit Daily Transaction Report',
  DEPOSIT_INTEREST_REPORT = 'Interest Report',
  DEPOSIT_MIS_ANALYSIS_REPORT = 'Deposit MIS/Analysis Report, Dimensional Report',
  FD_PRE_MATURE_REPORT = 'FD Pre-mature/mature Report',
  DORMANT_AC_REPORT = 'Dormant AC Report',
  SAVE_CUSTOMIZE_REPORT_FORMAT = 'Save Customize report format',
  AML_REPORTING = 'AML Reporting',
  TARGET_VS_ACHIEVEMENT_REPORT = 'Target vs Achievement Report',
  PROGRESS_REPORT_WITH_CHART = 'Progress Report with Chart',
  CHEQUE_WITHDRAW_RECORD = 'Cheque/Withdraw Record',
  BALANCE_CERTIFICATE = 'Balance Certificate (Deposit)',
  INTEREST_TAX_REPORT = 'Interest Tax Report',
  ACCOUNT_OPENING_REPORT = 'Opened Account Report',
  ACCOUNT_CLOSING_REPORT = 'Closed Account Report',
  SAVINGS_FD_MATURE_REPORT = 'Fixed Deposit Maturity Report',
  SAVING_PRODUCT_BALANCE_REPORT = 'Saving Product Wise Balance Report',
  CLOSED_SAVING_ACCOUNT_STATEMENT = 'Closed Saving Account Statement',
  SAVING_ACCOUNT_ACCRUED_INTEREST_REPORT = 'Saving Account Accrued Interest Report',
  E_TDS_REPORT = 'e-TDS Report',

  LOAN_INDIVIDUAL_STATEMENT = 'Loan Account Statement',
  LOAN_CONSOLIDATED_REPORT = 'Loan Consolidated Report',
  LOAN_AGING_REPORT = 'Loan Aging Report',
  LOAN_DAILY_TRANSACTION_REPORT = 'Loan Daily Transaction Report',
  LOAN_INTEREST_REPORT = 'Interest Report',
  LOAN_MIS_ANALYSIS_REPORT = 'Loan MIS/Analysis Report',
  LOAN_COLLATERAL_VALUATION_REPORT = 'Collateral Valuation Report',
  LOAN_COLLATERAL_REPORT = 'Loan Collateral Report',
  LOAN_PRODUCT_WISE_BALANCE_REPORT = 'Loan Product Wise Balance Report',
  LOAN_CALL_REPORT = 'Loan Call Sheet Report',
  LOAN_ACCOUNT_ACCRUED_INTEREST_REPORT = 'Loan Account Accrued Interest Report',

  LOAN_PERSONAL_GURANTEE_REPORT = 'Personal Guarantee Report',
  LOAN_TRANSACTION_STATEMENT_REPORT = 'Loan Account Statement Report',
  LOAN_WRITE_OFF_REPORT = 'Loan write off report',
  LOAN_PRE_INFORM_REPORT = 'Loan pre-inform report',
  LOAN_APPROVAL_REPORT_REJECT = 'Loan Approval Report / Reject Report',
  LOAN_FOLLOWUP_REPORT = 'Loan Followup report',
  LOAN_SAVE_CUSTOMIZATION = 'Save Customize Loan report format',
  MEMBER_LOAN_INFORMATION_SYSTEM = 'Member Loan Information System (MLIB) Setup',
  CIB_CIC_MEMBER_LOAN_INFORMATION = 'CIB/CIC/Member loan information system(MLIB) Setup',
  LOAN_UTILIZATION_INSPECTION = 'Loan utilization inspection(eg. above 5 Lakh)',
  LOAN_BALANCE_REPORT = 'Loan Balance Report',
  CLOSED_LOAN_ACCOUNT_STATEMENT = 'Closed Loan Account Statement',
  DOSARI_LOAN_REPORT = 'Dosari Loan Report',
  DOSARI_MEMBER_REPORT = 'Dosari Member Report',

  THRESHOLD_TRANSACTION_REPORT = 'Threshold Transaction ',
  TRANSACTION_TRIAL_SHEET = 'Trial Balance',
  TRANSACTION_FISCAL_YEAR = 'Fiscal Year Transactions Report',
  TRANSACTION_INCOME_STATEMENT = 'Income Statement',
  TRANSACTION_CASH_FLOW_STATEMENT = 'Cash Flow Statement',
  TRANSACTION_CHANGE_OF_EQUITY = 'Change of Equity',
  TRANSACTION_APPROPRIATE_OF_PROFIT = 'Appropriation of Profit',
  TRANSACTION_PROFIT_AND_LOSS = 'Profit and Loss',
  // TRANSACTION_BANK_GL_BALANCE = 'Bank GL Balance',
  TRANSACTION_BANK_GL_REPORT = 'Bank GL Statement',
  TRANSACTION_TELLER_REPORT = 'Teller Report',
  TRANSACTION_CASH_LEDGER = 'Cash Ledger Report',
  TRANSACTION_VAULT_BALANCE = 'Vault Balance Report',
  TRANSACTION_DAY_BOOK_REPORT = 'Day Book Report',
  TRANSACTION_SUSPICIOUS_TRANSACTION_REPORT = 'Suspicious Transaction Report',
  TRANSACTION_BALANCE_SHEET_REPORT = 'Balance Sheet Report',
  TRANSACTION_SERVICE_CENTER_BALANCE_REPORT = 'Service Center Balance',
  TRANSACTION_SERVICE_CENTER_COA_WISE_BALANCE = 'Service Center COA Head Wise Balance',
  TRANSACTION_BANK_GL_BALANCE_REPORT = 'Bank GL Balance Report',
  TRANSACTION_ABBS_STATUS_REPORT = 'ABBS Report',
  TRANSACTION_ABBS_TRANSACTION_REPORT = 'ABBS Transaction Report',
  TRANSACTION_CHAR_KHATA_REPORT = 'Charkhata Ledger Report',
  TRANSACTION_MRTRANSACTION_REPORT = 'Market Representative Transaction Report',
  TRANSACTION_TAG_KHATA_REPORT = 'Ledger Group Report',

  MB_REGISTRATION_REPORT = 'Mobile Banking Registration Report',
  MB_EXPIRY_REPORT = 'Mobile Banking Expiry Report',
  MB_CHANNEL_TRANSACTION_REPORT = 'Mobile Banking Channel Transaction Report',
  MB_DAILY_TRANSACTION_REPORT = 'Daily Transaction Report',
  MB_USER_REPORT = 'Mobile Banking User Report',
  MB_RENEWABLE_LIST = 'Renewable List/Expiry List',
  MB_RECONCILIATION_REPORT = 'Reconciliation Report (Member AC vs Transaction)',
  MB_FEE_AND_COMMISSION_REPORT = 'Fee and commission report',

  ATM_DAILY_TRANSACTION_REPORT = 'Daily Transaction Report',
  ATM_USER_REPORT = 'ATM User Report',
  ATM_RENEWABLE_LIST = 'Renewable List/Expiry List',
  ATM_RECONCILIATION_REPORT = 'Reconciliation Report (Member AC vs Transaction)',
  ATM_FEE_AND_COMMISSION_REPORT = 'Fee and commission report',

  BB_USERWISE_TRANSACTION_REPORT = 'Userwise Transaction Report',
  BB_PROGRESS_REPORT = 'Progress Report',

  BRANCH_WISE_FINANCIAL_REPORT = 'Service Centerwise financial Report',
  SERVICE_CENTER_LIST_REPORT = 'Service Center List Report',
  BRANCH_READINESS_REPORT = 'Branch Readiness Report',

  BRANCH_WISE_TARGET_VS_ACHIEVEMENT = 'Service Centerwise Target vs Achievement',

  USER_LIST_REPORT = 'User List Report',
  SAVING_BALANCE_REPORT = 'Saving Balance [Individual]',
  SAVING_BALANCE_MINOR_REPORT = 'Minor Saving Balance Report',
  COPOMIS_IMPORT_MEMBER_REPORT = 'Copomis Import Member Report',
  COPOMIS_FINANCIAL_REPORT = 'Copomis Financial Report',
  PEARLS_REPORT = 'Pearls Report',

  EXCEPTION_SAVING_BALANCE = 'Saving Balance Exception Report',
  EXCEPTION_LOAN_BALANCE = 'Loan Balance Exception Report',
  EXCEPTION_MEMBER_WISE_BALANCE = 'Member Wise Balance Execption Report',
  EXCEPTION_SHARE_BALANCE = 'Share Balance Exception Report',

  OTHERS_COMMITTEE_REGISTER = 'Committee Registered Details Report',
  OTHERS_ORGANIZATIONAL_PROFILE = 'Organizational Profile Report',
  OTHERS_SHARE_CERTIFICATE_PRINT_REPORT = 'Share Certificate Report',
  OTHERS_FD_CERTIFICATE_PRINT_REPORT = 'FD-Certificate Report',

  INVENTORY_REGISTER_REPORT = 'Inventory Register Report',
  INVENTORY_SALES_REPORT = 'Inventory Item Sales Report',
  INVENTORY_STOCK_STATUS_REPORT = 'Inventory Stock Status Report',

  ACCOUNTING_EXTERNAL_LOAN_STATEMENT_REPORT = 'External Loan Statement Report',
  ACCOUNTING_EXTERNAL_LOAN_REPORT = 'External Loan Report',
  ACCOUNTING_FD_INVESTMENT_STATEMENT_REPORT = 'FD Investment Statement Report',
  ACCOUNTING_FD_INVESTMENT = 'FD Investment Report',
}

export const REPORTS = {
  [ReportGroup.ORGANIZATIONS]: [
    {
      id: '1.1',
      report: Report.ORGANIZATION_PROFILE,
    },
    {
      id: '1.2',
      report: Report.BOARD_OF_DIRECTOR_DETAIL_REGISTER,
    },
  ],
  [ReportGroup.MEMBERS]: [
    {
      id: '2.1',
      report: Report.INDIVIDUAL_MEMBER_PROFILE,
      link: 'individual-member-report',
    },
    {
      id: '2.2',
      report: Report.MEMBER_REPORTS,
    },
    {
      id: '2.3',
      report: Report.MEMBER_REGISTER_REPORT,
      link: 'register',
    },
    {
      id: '2.4',
      report: Report.MEMBER_ACTIVATIONS,
      link: 'activations',
    },
    {
      id: '2.5',
      report: Report.KYM_STATUS_REPORT,
      link: 'kym-status',
    },
    {
      id: '2.6',
      report: Report.MEMBER_CLASSIFICATION_REPORT,
      link: 'classification',
    },
    {
      id: '2.7',
      report: Report.MEMBER_WISE_BALANCE_REPORT,
      link: 'balance',
    },
    {
      report: Report.DOSARI_MEMBER_REPORT,
      link: 'dosari-member',
    },
    {
      report: Report.MINOR_LIST_REPORT,
      link: 'minor-list',
    },
  ],

  [ReportGroup.SHARE]: [
    {
      id: '3.1',
      report: Report.SHARE_REGISTER,
      link: 'register',
    },
    {
      id: '3.2',
      report: Report.SHARE_STATEMENT,
      link: 'statement',
    },
    {
      id: '3.3',
      report: Report.SHARE_TRANSACTION_REPORT,
      link: 'transaction',
    },
    {
      id: '3.4',
      report: Report.SHARE_BALANCE_REPORT,
      link: 'balance',
    },
    {
      id: '3.4.1',
      report: Report.SHARE_CONSOLIDATED_REPORT,
    },
    {
      id: '3.5',
      report: Report.SHARE_CERTIFICATE_PRINT,
    },
    {
      id: '3.6',
      report: Report.SHARE_BONUS_DISTRIBUTION_REPORT,
    },
  ],

  [ReportGroup.SAVINGS]: [
    {
      id: '5.0',
      report: Report.SAVING_BALANCE_REPORT,
      link: 'saving-balance',
    },
    {
      id: '5.1',
      report: Report.SAVING_STATEMENT,
      link: 'statement',
    },
    {
      id: '5.2',
      report: Report.DEPOSIT_CONSOLIDATED_REPORT,
    },
    {
      id: '5.2.e',
      report: Report.ACCOUNT_CLOSING_REPORT,
      link: 'account-closing',
    },

    {
      id: '5.3',
      report: Report.DEPOSIT_DAILY_TRANSACTION_REPORT,
    },
    {
      id: '5.4',
      report: Report.DEPOSIT_INTEREST_REPORT,
      link: 'interest-statement',
    },
    {
      id: '5.5',
      report: Report.DEPOSIT_MIS_ANALYSIS_REPORT,
    },
    {
      id: '5.6',
      report: Report.SAVINGS_FD_MATURE_REPORT,
      link: 'fd-mature',
    },
    {
      id: '5.6.1',
      report: Report.FD_PRE_MATURE_REPORT,
    },
    {
      id: '5.7',
      report: Report.DORMANT_AC_REPORT,
      link: 'dormant-account',
    },
    {
      id: '5.8',
      report: Report.SAVE_CUSTOMIZE_REPORT_FORMAT,
    },
    {
      id: '5.9',
      report: Report.AML_REPORTING,
    },
    {
      id: '5.9.1',
      report: Report.THRESHOLD_TRANSACTION_REPORT,
      link: 'ttr',
    },
    {
      id: '5.9.2',
      report: Report.TRANSACTION_SUSPICIOUS_TRANSACTION_REPORT,
      link: 'suspicious-transactions',
    },
    {
      id: '5.10',
      report: Report.TARGET_VS_ACHIEVEMENT_REPORT,
    },
    {
      id: '5.11',
      report: Report.PROGRESS_REPORT_WITH_CHART,
    },
    {
      id: '5.12',
      report: Report.CHEQUE_WITHDRAW_RECORD,
    },
    {
      id: '5.13',
      report: Report.BALANCE_CERTIFICATE,
    },
    {
      id: '5.14',
      report: Report.INTEREST_TAX_REPORT,
      link: 'interest-tax',
    },
    {
      id: '5.15',
      report: Report.ACCOUNT_OPENING_REPORT,
      link: 'account-opening',
    },
    {
      id: '5.16',
      report: Report.CLOSED_SAVING_ACCOUNT_STATEMENT,
      link: 'closed-account-statement',
    },
    {
      id: '5.17',
      report: Report.SAVING_PRODUCT_BALANCE_REPORT,
      link: 'saving-product-balance',
    },
    {
      id: '5.18',
      report: Report.SAVING_BALANCE_MINOR_REPORT,
      link: 'saving-balance-minor',
    },
    {
      report: Report.SAVING_ACCOUNT_ACCRUED_INTEREST_REPORT,
      link: 'saving-account-accrued-interest',
    },
    {
      report: Report.E_TDS_REPORT,
      link: 'e-tds',
    },
  ],

  [ReportGroup.LOAN]: [
    {
      id: '6.0',
      report: Report.LOAN_BALANCE_REPORT,
      link: 'loan-balance',
    },
    {
      id: '6.1',
      report: Report.LOAN_INDIVIDUAL_STATEMENT,
      link: 'statement',
    },
    {
      id: '6.2',
      report: Report.LOAN_CONSOLIDATED_REPORT,
    },
    {
      id: '6.3',
      report: Report.LOAN_AGING_REPORT,
      link: 'ageing',
    },
    {
      id: '6.4',
      report: Report.LOAN_DAILY_TRANSACTION_REPORT,
    },
    {
      id: '6.5',
      report: Report.LOAN_INTEREST_REPORT,
    },
    {
      id: '6.6',
      report: Report.LOAN_MIS_ANALYSIS_REPORT,
    },
    {
      id: '6.7',
      report: Report.LOAN_COLLATERAL_VALUATION_REPORT,
    },
    {
      id: '6.8',
      report: Report.LOAN_WRITE_OFF_REPORT,
    },
    {
      id: '6.9',
      report: Report.LOAN_PRE_INFORM_REPORT,
    },
    {
      id: '6.10',
      report: Report.LOAN_APPROVAL_REPORT_REJECT,
    },
    {
      id: '6.11',
      report: Report.LOAN_FOLLOWUP_REPORT,
    },
    {
      id: '6.12',
      report: Report.LOAN_SAVE_CUSTOMIZATION,
    },
    {
      id: '6.13',
      report: Report.MEMBER_LOAN_INFORMATION_SYSTEM,
    },
    {
      id: '6.14',
      report: Report.CIB_CIC_MEMBER_LOAN_INFORMATION,
    },
    {
      id: '6.15',
      report: Report.LOAN_UTILIZATION_INSPECTION,
    },
    {
      id: '6.15.2.a',
      report: Report.LOAN_PRODUCT_WISE_BALANCE_REPORT,
      link: 'loan-product-balance',
    },
    {
      id: '6.16',
      report: Report.CLOSED_LOAN_ACCOUNT_STATEMENT,
      link: 'closed-loan-account-statement',
    },
    {
      id: '14.2.5.a',
      report: Report.LOAN_COLLATERAL_REPORT,
      link: 'loan-collateral',
    },
    {
      id: '14.2.6',
      report: Report.LOAN_PERSONAL_GURANTEE_REPORT,
      link: 'personal-gurantee',
    },
    {
      id: '14.2.9',
      report: Report.LOAN_CALL_REPORT,
      link: 'call-sheet',
    },
    {
      report: Report.LOAN_ACCOUNT_ACCRUED_INTEREST_REPORT,
      link: 'loan-account-accrued-interest',
    },
    {
      report: Report.DOSARI_LOAN_REPORT,
      link: 'dosari-loan',
    },
    {
      report: Report.LOAN_WRITE_OFF_REPORT,
      link: 'loan-write-off',
    },
    {
      report: Report.LOAN_TRANSACTION_STATEMENT_REPORT,
      link: 'loan-transaction-statement',
    },
  ],

  [ReportGroup.MOBILE_BANKING]: [
    {
      id: '4.1',
      report: Report.MB_DAILY_TRANSACTION_REPORT,
    },
    {
      id: '4.2',
      report: Report.MB_USER_REPORT,
    },
    {
      id: '4.3',
      report: Report.MB_RENEWABLE_LIST,
    },
    {
      id: '4.4',
      report: Report.MB_RECONCILIATION_REPORT,
    },
    {
      id: '4.5',
      report: Report.MB_FEE_AND_COMMISSION_REPORT,
    },
    {
      id: '',
      report: Report.MB_CHANNEL_TRANSACTION_REPORT,
      link: 'transaction',
    },
    {
      id: '4.6',
      report: Report.MB_REGISTRATION_REPORT,
      link: 'registration',
    },
    {
      id: '4.7',
      report: Report.MB_EXPIRY_REPORT,
      link: 'expiry',
    },
  ],

  [ReportGroup.ATM]: [
    {
      id: '4b.1',
      report: Report.ATM_DAILY_TRANSACTION_REPORT,
    },
    {
      id: '4b.2',
      report: Report.ATM_USER_REPORT,
    },
    {
      id: '4b.3',
      report: Report.ATM_RENEWABLE_LIST,
    },
    {
      id: '4b.4',
      report: Report.ATM_RECONCILIATION_REPORT,
    },
    {
      id: '4b.5',
      report: Report.ATM_FEE_AND_COMMISSION_REPORT,
    },
  ],

  [ReportGroup.TRANSACTION_REPORT]: [
    {
      id: '7.8',
      report: Report.TRANSACTION_DAY_BOOK_REPORT,
      link: 'day-book',
    },
    {
      id: '7.1',
      report: Report.TRANSACTION_TRIAL_SHEET,
      link: 'trial-sheet',
    },
    {
      id: '7.1.2',
      report: Report.TRANSACTION_CHAR_KHATA_REPORT,
      link: 'charkhata',
    },
    {
      id: '7.1.1',
      report: Report.TRANSACTION_BALANCE_SHEET_REPORT,
      link: 'balance-sheet',
    },
    {
      id: '7.21',
      report: Report.TRANSACTION_PROFIT_AND_LOSS,
      link: 'profit-and-loss',
    },
    {
      id: '7.5',
      report: Report.TRANSACTION_APPROPRIATE_OF_PROFIT,
    },
    {
      id: '7.2.5.b',
      report: Report.TRANSACTION_CASH_LEDGER,
      link: 'cash-ledger',
    },
    {
      id: '7.2.5.2',
      report: Report.TRANSACTION_BANK_GL_BALANCE_REPORT,
      link: 'bankGL-balance',
    },
    {
      id: '7.2.6',
      report: Report.TRANSACTION_VAULT_BALANCE,
      link: 'vault-balance',
    },
    {
      id: '7.2.7',
      report: Report.TRANSACTION_TELLER_REPORT,
      link: 'teller',
    },
    {
      id: '7.3',
      report: Report.TRANSACTION_CASH_FLOW_STATEMENT,
    },
    {
      id: '7.4',
      report: Report.TRANSACTION_CHANGE_OF_EQUITY,
    },

    // {
    //   id: '7.5',
    //   report: Report.TRANSACTION_APPROPRIATE_OF_PROFIT,
    // },
    // {
    //   id: '7.6',
    //   report: Report.TRANSACTION_BANK_GL_BALANCE,
    // },
    {
      id: '7.7',
      report: Report.TRANSACTION_BANK_GL_REPORT,
      link: 'bank-gl-statement',
    },
    {
      id: '7.7.1',
      report: Report.TRANSACTION_ABBS_TRANSACTION_REPORT,
      link: 'abbs-transaction',
    },
    {
      id: '7.7.1',
      report: Report.TRANSACTION_MRTRANSACTION_REPORT,
      link: 'mr-transaction',
    },
    {
      report: Report.TRANSACTION_TAG_KHATA_REPORT,
      link: 'tag-khata',
    },
    {
      id: '7.7.3',
      report: Report.TRANSACTION_FISCAL_YEAR,

      link: 'fiscal-year',
    },
  ],
  [ReportGroup.BRANCHLESS_BANKING]: [
    {
      id: '4c.1',
      report: Report.BB_USERWISE_TRANSACTION_REPORT,
    },
    {
      id: '4c.2',
      report: Report.BB_PROGRESS_REPORT,
    },
  ],

  [ReportGroup.BRANCH]: [
    {
      id: '8',
      report: Report.SERVICE_CENTER_LIST_REPORT,
      link: 'list-report',
    },
    {
      id: '7.2',
      report: Report.TRANSACTION_ABBS_STATUS_REPORT,
      link: 'abbs-status',
    },
    {
      id: '7.2.2',
      report: Report.TRANSACTION_SERVICE_CENTER_BALANCE_REPORT,
      link: 'service-center-balance',
    },
    {
      id: '7.2.2',
      report: Report.TRANSACTION_SERVICE_CENTER_COA_WISE_BALANCE,
      link: 'service-center-coa-wise-balance',
    },
    {
      report: Report.BRANCH_READINESS_REPORT,
      link: 'branch-readiness',
    },
  ],

  [ReportGroup.OTHERS]: [
    {
      id: '9',
      report: Report.GENERAL_LEDGER_REPORT,
      link: 'ledger',
    },
    {
      id: '10',
      report: Report.USER_LIST_REPORT,
      link: 'users',
    },
    {
      id: '11',
      report: Report.COPOMIS_IMPORT_MEMBER_REPORT,
      link: 'copomis-import-member',
    },
    {
      id: '11.1',
      report: Report.COPOMIS_FINANCIAL_REPORT,
      link: 'copomis-financial',
    },
    {
      id: '12',
      report: Report.PEARLS_REPORT,
      link: 'pearls-report',
    },
    {
      id: '13',
      report: Report.OTHERS_COMMITTEE_REGISTER,
      link: 'committee-register',
    },
    { id: '14', report: Report.OTHERS_ORGANIZATIONAL_PROFILE, link: 'organizational-profile' },
    { id: '15', report: Report.OTHERS_SHARE_CERTIFICATE_PRINT_REPORT, link: 'share-issue-print' },
    { id: '15', report: Report.OTHERS_FD_CERTIFICATE_PRINT_REPORT, link: 'fd-print' },
  ],
  [ReportGroup.EXCEPTION]: [
    {
      id: '',
      report: Report.EXCEPTION_SAVING_BALANCE,
      link: 'saving-balance',
    },
    {
      id: '',
      report: Report.EXCEPTION_LOAN_BALANCE,
      link: 'loan-balance',
    },
    {
      id: '',
      report: Report.EXCEPTION_MEMBER_WISE_BALANCE,
      // link: 'member-wise-balance',
    },

    {
      id: '',
      report: Report.EXCEPTION_SHARE_BALANCE,
      link: 'share-balance',
    },
  ],

  [ReportGroup.INVENTORY]: [
    {
      id: '',
      report: Report.INVENTORY_REGISTER_REPORT,
      link: 'register',
    },
    {
      id: '',
      report: Report.INVENTORY_STOCK_STATUS_REPORT,
      link: 'stock-status',
    },
    {
      id: '',
      report: Report.INVENTORY_SALES_REPORT,
      link: 'item-sales',
    },
  ],
  [ReportGroup.ACCOUNTING]: [
    {
      id: '1',
      report: Report.ACCOUNTING_EXTERNAL_LOAN_STATEMENT_REPORT,
      link: 'external-loan-statement',
    },
    {
      id: '2',
      report: Report.ACCOUNTING_EXTERNAL_LOAN_REPORT,
      link: 'external-loan',
    },
    {
      id: '3',
      report: Report.ACCOUNTING_FD_INVESTMENT_STATEMENT_REPORT,
      link: 'fd-investment-statement',
    },
    {
      id: 4,
      report: Report.ACCOUNTING_FD_INVESTMENT,
      link: 'fd-investment',
    },
  ],
};
