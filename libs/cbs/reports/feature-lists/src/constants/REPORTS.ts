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

  SHARE_REGISTER = 'Share Register',
  SHARE_STATEMENT = 'Share Statement Report',
  SHARE_TRANSACTION_REPORT = 'Share Transaction Report',
  SHARE_CONSOLIDATED_REPORT = 'Share Consolidated Report',
  SHARE_CERTIFICATE_PRINT = 'Share Certificate Print',
  SHARE_BONUS_DISTRIBUTION_REPORT = 'Share Bonus Distribution Report',

  SAVING_STATEMENT = 'Saving Statement',
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
  ACCOUNT_OPENING_REPORT = 'Account Opening Report',
  ACCOUNT_CLOSING_REPORT = 'Account Closing Report',

  LOAN_INDIVIDUAL_STATEMENT = 'Loan Individual Statement',
  LOAN_CONSOLIDATED_REPORT = 'Loan Consolidated Report',
  LOAN_AGING_REPORT = 'Loan Aging Report',
  LOAN_DAILY_TRANSACTION_REPORT = 'Loan Daily Transaction Report',
  LOAN_INTEREST_REPORT = 'Interest Report',
  LOAN_MIS_ANALYSIS_REPORT = 'Loan MIS/Analysis Report',
  LOAN_COLLATERAL_VALUATION_REPORT = 'Collateral Valuation Report',
  LOAN_WRITE_OFF_REPORT = 'Loan write off report',
  LOAN_PRE_INFORM_REPORT = 'Loan pre-inform report',
  LOAN_APPROVAL_REPORT_REJECT = 'Loan Approval Report / Reject Report',
  LOAN_FOLLOWUP_REPORT = 'Loan Followup report',
  LOAN_SAVE_CUSTOMIZATION = 'Save Customize Loan report format',
  MEMBER_LOAN_INFORMATION_SYSTEM = 'Member Loan Information System (MLIB) Setup',
  CIB_CIC_MEMBER_LOAN_INFORMATION = 'CIB/CIC/Member loan information system(MLIB) Setup',
  LOAN_UTILIZATION_INSPECTION = 'Loan utilization inspection(eg. above 5 Lakh)',
  LOAN_BALANCE_REPORT = 'Loan Balance Report',

  THRESHOLD_TRANSACTION_REPORT = 'Threshold Transaction ',
  TRANSACTION_TRIAL_SHEET = 'Trial Balance',
  TRANSACTION_INCOME_STATEMENT = 'Income Statement',
  TRANSACTION_CASH_FLOW_STATEMENT = 'Cash Flow Statement',
  TRANSACTION_CHANGE_OF_EQUITY = 'Change of Equity',
  TRANSACTION_APPROPRIATE_OF_PROFIT = 'Appropriation of Profit',
  TRANSACTION_BANK_GL_BALANCE = 'Bank GL Balance',
  TRANSACTION_BANK_GL_REPORT = 'Bank GL Statement',
  TRANSACTION_TELLER_REPORT = 'Teller Report',
  TRANSACTION_CASH_LEDGER = 'Cash Ledger Report',

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

  BRANCH_WISE_FINANCIAL_REPORT = 'Branchwise financial Report',
  SERVICE_CENTER_LIST_REPORT = 'Service Center List Report',
  BRANCH_WISE_TARGET_VS_ACHIEVEMENT = 'Branchwise Target vs Achievement',

  USER_LIST_REPORT = 'User List Report',
  SAVING_BALANCE_REPORT = 'Saving Balance [Individual]',
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
      report: Report.FD_PRE_MATURE_REPORT,
    },
    {
      id: '5.7',
      report: Report.DORMANT_AC_REPORT,
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
  ],

  [ReportGroup.LOAN]: [
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
      id: '7.1',
      report: Report.TRANSACTION_TRIAL_SHEET,
      link: 'trial-sheet',
    },
    {
      id: '7.2',
      report: Report.TRANSACTION_INCOME_STATEMENT,
    },
    {
      id: '7.2.5.b',
      report: Report.TRANSACTION_CASH_LEDGER,
      link: 'cash-ledger',
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
    {
      id: '7.5',
      report: Report.TRANSACTION_APPROPRIATE_OF_PROFIT,
    },
    {
      id: '7.6',
      report: Report.TRANSACTION_BANK_GL_BALANCE,
    },
    {
      id: '7.7',
      report: Report.TRANSACTION_BANK_GL_REPORT,
      link: 'bank-gl-statement',
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
      id: '8',
      report: Report.BRANCH_WISE_FINANCIAL_REPORT,
    },
    {
      id: '8',
      report: Report.BRANCH_WISE_TARGET_VS_ACHIEVEMENT,
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
      report: Report.LOAN_BALANCE_REPORT,
      link: 'loan-balance',
    },
    {
      id: '',
      report: Report.SAVING_BALANCE_REPORT,
      link: 'saving-balance',
    },
  ],
};
