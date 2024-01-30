import * as Reports from '@coop/cbs/reports';
import { AclKey } from '@coop/cbs/utils';

export enum ReportGroup {
  OTHERS = 'others',
  MEMBERS = 'members',
  SHARE = 'share',
  SAVINGS = 'savings',
  LOAN = 'loan',
  MOBILE_BANKING = 'mobile-banking',
  TRANSACTION_REPORT = 'transactions',
  BRANCH = 'service-center',
  EXCEPTION = 'exceptions',
  INVENTORY = 'inventory',
  ACCOUNTING = 'accounting',
  MICROFINANCE = 'micro-finance',
}

export enum Report {
  GENERAL_LEDGER_REPORT = 'General Ledger Report',

  INDIVIDUAL_MEMBER_PROFILE = 'reportsIndividualMemberProfileReport',
  MEMBER_REGISTER_REPORT = 'reportsMemberRegisterReport',
  MEMBER_ACTIVATIONS = 'reportsActiveInactiveReport',
  MEMBER_CLASSIFICATION_REPORT = 'reportsMemberClassificationReport',
  MEMBER_TRANSFER_REPORT = 'reportsMemberTransferReport',
  KYM_STATUS_REPORT = 'reportsKymStatusReport',
  MINOR_LIST_REPORT = 'reportsMinorListReport',
  MEMBER_WISE_BALANCE_REPORT = 'reportsMemberWiseBalanceReport',

  SHARE_REGISTER = 'reportsShareRegister',
  SHARE_STATEMENT = 'reportsShareStatement',
  SHARE_TRANSACTION_REPORT = 'reportsShareTransactionReport',
  SHARE_BALANCE_REPORT = 'reportsShareBalanceReport',

  SAVING_BALANCE_REPORT = 'reportsSavingBalanceIndividualReport',
  SAVING_STATEMENT = 'reportsSavingAccountStatementReport',
  ACCOUNT_LOCKED_STATUS_REPORT = 'reportsSavingAccountLockedStatusReport',
  ACCOUNT_CLOSING_REPORT = 'reportsSavingAccountClosedAccountReport',
  DEPOSIT_INTEREST_REPORT = 'reportsSavingInterestReport',
  SAVINGS_FD_MATURE_REPORT = 'reportsSavingFixedDepositMaturityReport',
  DORMANT_AC_REPORT = 'reportsSavingDormantACReport',
  THRESHOLD_TRANSACTION_REPORT = 'reportsSavingThresholdTransactionReport',
  TRANSACTION_SUSPICIOUS_TRANSACTION_REPORT = 'reportsSavingSuspiciousTransactionReport',
  INTEREST_TAX_REPORT = 'reportsSavingInterestTaxReport',
  ACCOUNT_OPENING_REPORT = 'reportsSavingAccountOpenedAccountReport',
  CLOSED_SAVING_ACCOUNT_STATEMENT = 'reportsSavingClosedAccountStatement',
  SAVING_PRODUCT_BALANCE_REPORT = 'reportsSavingSavingProductWiseBalanceReport',
  SAVING_BALANCE_MINOR_REPORT = 'reportsSavingMinorSavingBalanceReport',
  SAVING_ACCOUNT_ACCRUED_INTEREST_REPORT = 'reportsSavingSavingAccountAccruedInterestReport',
  E_TDS_REPORT = 'reportsSavingETDSReport',
  REGULAR_RECURRING_SAVING_INSTALLMENT_REPORT = 'reportsSavingRegularRecurringSavingInstallmentReport',

  ADJUSTMENT_SAVING_STATEMENT = 'Adjustment Saving Account Statement',

  FD_PRE_MATURE_REPORT = 'FD Pre-mature/mature Report',

  BALANCE_CERTIFICATE = 'Balance Certificate (Deposit)',

  LOAN_INDIVIDUAL_STATEMENT = 'Loan Account Statement',
  LOAN_AGING_REPORT = 'Loan Aging Report',

  LOAN_COLLATERAL_REPORT = 'Loan Collateral Report',
  LOAN_PRODUCT_WISE_BALANCE_REPORT = 'Loan Product Wise Balance Report',
  LOAN_CALL_REPORT = 'Loan Call Sheet Report',
  LOAN_ACCOUNT_ACCRUED_INTEREST_REPORT = 'Loan Account Accrued Interest Report',

  LOAN_PERSONAL_GURANTEE_REPORT = 'Personal Guarantee Report',
  LOAN_TRANSACTION_STATEMENT_REPORT = 'Loan Account Statement Report',
  LOAN_WRITE_OFF_REPORT = 'Loan write off report',
  LOAN_DISBURSEMENT_REPORT = 'Loan Disbursement Report',

  LOAN_BALANCE_REPORT = 'Loan Balance Report',
  CLOSED_LOAN_ACCOUNT_STATEMENT = 'Closed Loan Account Statement',
  DOSARI_LOAN_REPORT = 'Dosari Loan Report',
  DOSARI_MEMBER_REPORT = 'Dosari Member Report',

  TRANSACTION_TRIAL_SHEET = 'Trial Balance',
  TRANSACTION_FISCAL_YEAR = 'Fiscal Year and Adjustment Trial Balance',

  TRANSACTION_PROFIT_AND_LOSS = 'Profit and Loss',
  TRANSACTION_BANK_GL_REPORT = 'Bank GL Statement',
  TRANSACTION_TELLER_REPORT = 'Teller Report',
  TRANSACTION_CASH_LEDGER = 'Cash Ledger Report',
  TRANSACTION_VAULT_BALANCE = 'Vault Balance Report',
  TRANSACTION_DAY_BOOK_REPORT = 'Day Book Report',
  TRANSACTION_TELLER_DAY_BOOK_REPORT = 'Teller Day Book Report',

  TRANSACTION_BALANCE_SHEET_REPORT = 'Balance Sheet Report',
  TRANSACTION_SERVICE_CENTER_BALANCE_REPORT = 'Service Center Balance',
  TRANSACTION_SERVICE_CENTER_COA_WISE_BALANCE = 'Service Center COA Head Wise Balance',
  TRANSACTION_BANK_GL_BALANCE_REPORT = 'Bank GL Balance Report',
  TRANSACTION_ABBS_STATUS_REPORT = 'ABBS Report',
  TRANSACTION_ABBS_TRANSACTION_REPORT = 'ABBS Transaction Report',
  TRANSACTION_CHAR_KHATA_REPORT = 'Charkhata Ledger Report',
  TRANSACTION_ADJUSTED_CHAR_KHATA_REPORT = 'Adjusted Charkhata Ledger Report',
  TRANSACTION_MRTRANSACTION_REPORT = 'Market Representative Transaction Report',
  TRANSACTION_TAG_KHATA_REPORT = 'Ledger Group Report',
  TRANSACTION_DAILY_BALANCE_REPORT = 'Daily Balance Report',
  TRANSACTION_JOURNAL_VOUCHER_SUMMARY = 'Journal Voucher Summary',
  TRANSACTION_DAILY_VOUCHER_SUMMARY = 'Daily Voucher Summary',
  TRANSACTION_SPREAD_RATE_CALCULATION = 'Spread Rate Calculation',

  MB_REGISTRATION_REPORT = 'Mobile Banking Registration Report',
  MB_EXPIRY_REPORT = 'Mobile Banking Expiry Report',
  MB_CHANNEL_TRANSACTION_REPORT = 'Mobile Banking Channel Transaction Report',
  MB_UTILITY_USAGE_REPORT = 'Utility Usage Report',
  MB_SMS_USAGE_REPORT = 'SMS Usage Report',

  SERVICE_CENTER_LIST_REPORT = 'Service Center List Report',
  BRANCH_READINESS_REPORT = 'Branch Readiness Report',
  USER_LIST_REPORT = 'User List Report',
  COPOMIS_IMPORT_MEMBER_REPORT = 'Copomis Import Member Report',
  COPOMIS_FINANCIAL_REPORT = 'Copomis Financial Report',
  PEARLS_REPORT = 'Pearls Report',

  EXCEPTION_SAVING_BALANCE = 'Saving Balance Exception Report',
  EXCEPTION_LOAN_BALANCE = 'Loan Balance Exception Report',
  EXCEPTION_MEMBER_WISE_BALANCE = 'Member Wise Balance Execption Report',
  EXCEPTION_SHARE_BALANCE = 'Share Balance Exception Report',

  OTHERS_ADJUSTED_LEDGER_REPORT = 'Adjusted Ledger Report',
  OTHERS_COMMITTEE_REGISTER = 'Committee Registered Details Report',
  OTHERS_ORGANIZATIONAL_PROFILE = 'Organizational Profile Report',
  OTHERS_SHARE_CERTIFICATE_PRINT_REPORT = 'Share Certificate Report',
  OTHERS_FD_CERTIFICATE_PRINT_REPORT = 'FD-Certificate Report',
  OTHERS_LEDGER_BALANCE_REPORT = 'Ledger Balance Report',
  OTHERS_SAVING_LOAN_INTEREST_REPORT = 'Saving and Loan Interest Report',

  INVENTORY_REGISTER_REPORT = 'Inventory Register Report',
  INVENTORY_SALES_REPORT = 'Inventory Item Sales Report',
  INVENTORY_PURCHASE_ORDER_REPORT = 'Inventory Purchase Order Report',
  INVENTORY_STOCK_STATUS_REPORT = 'Inventory Stock Status Report',

  ACCOUNTING_EXTERNAL_LOAN_STATEMENT_REPORT = 'External Loan Statement Report',
  ACCOUNTING_EXTERNAL_LOAN_REPORT = 'External Loan Report',
  ACCOUNTING_FD_INVESTMENT_STATEMENT_REPORT = 'FD Investment Statement Report',
  ACCOUNTING_FD_INVESTMENT = 'FD Investment Report',

  MICROFINANCE_TELLER_DAY_BOOK_REPORT = 'Micro Finance Teller Day Book Report',
}

type ReportType = Record<
  ReportGroup,
  {
    id: string;
    report: Report;
    link: string;
    component: JSX.Element;
    acl: AclKey;
  }[]
>;

export const REPORTS: ReportType = {
  [ReportGroup.MEMBERS]: [
    {
      id: '2.1',
      report: Report.INDIVIDUAL_MEMBER_PROFILE,
      link: 'individual-member-report',
      component: <Reports.IndividualMemberReport />,
      acl: 'REPORTS_MEMBER_INDIVIDUAL_MEMBER_PROFILE',
    },
    {
      id: '2.3',
      report: Report.MEMBER_REGISTER_REPORT,
      link: 'register',
      component: <Reports.MemberRegisterReport />,
      acl: 'REPORTS_MEMBER_MEMBER_REGISTER',
    },
    {
      id: '2.4',
      report: Report.MEMBER_ACTIVATIONS,
      link: 'activations',
      component: <Reports.MemberActiveInactiveReport />,
      acl: 'REPORTS_MEMBER_ACTIVE_INACTIVE',
    },
    {
      id: '2.5',
      report: Report.KYM_STATUS_REPORT,
      link: 'kym-status',
      acl: 'REPORTS_MEMBER_KYM_STATUS',
      component: <Reports.KYMStatusReport />,
    },
    {
      id: '2.6',
      report: Report.MEMBER_CLASSIFICATION_REPORT,
      link: 'classification',
      acl: 'REPORTS_MEMBER_MEMBER_CLASSIFICATION',
      component: <Reports.MemberClassificationReport />,
    },
    {
      id: '2.7',
      report: Report.MEMBER_WISE_BALANCE_REPORT,
      link: 'balance',
      acl: 'REPORTS_MEMBER_MEMBER_WISE_BALANCE',
      component: <Reports.MemberBalanceReport />,
    },
    {
      id: '2.8',
      report: Report.DOSARI_MEMBER_REPORT,
      link: 'dosari-member',
      acl: 'REPORTS_MEMBER_DOSARI_MEMBER',
      component: <Reports.DosariMemberReport />,
    },
    {
      id: '2.9',
      report: Report.MINOR_LIST_REPORT,
      link: 'minor-list',
      acl: 'REPORTS_MEMBER_MINOR_LIST',
      component: <Reports.MinorListReport />,
    },
    {
      id: '2.10',
      report: Report.MEMBER_TRANSFER_REPORT,
      link: 'transfer',
      acl: 'REPORTS_MEMBER_MEMBER_TRANSFER',
      component: <Reports.MemberTransferReport />,
    },
  ],

  [ReportGroup.SHARE]: [
    {
      id: '3.1',
      report: Report.SHARE_REGISTER,
      link: 'register',
      component: <Reports.ShareRegisterReport />,
      acl: 'REPORTS_SHARE_SHARE_REGISTER',
    },
    {
      id: '3.2',
      report: Report.SHARE_STATEMENT,
      link: 'statement',
      component: <Reports.ShareStatementReport />,
      acl: 'REPORTS_SHARE_SHARE_STATEMENT',
    },
    {
      id: '3.3',
      report: Report.SHARE_TRANSACTION_REPORT,
      link: 'transaction',
      component: <Reports.ShareTransactionsReport />,
      acl: 'REPORTS_SHARE_SHARE_TRANSACTION',
    },
    {
      id: '3.4',
      report: Report.SHARE_BALANCE_REPORT,
      link: 'balance',
      component: <Reports.ShareBalanceReport />,
      acl: 'REPORTS_SHARE_SHARE_BALANCE',
    },
  ],

  [ReportGroup.SAVINGS]: [
    {
      id: '5.0',
      report: Report.SAVING_BALANCE_REPORT,
      link: 'saving-balance',
      component: <Reports.SavingBalanceReport />,
      acl: 'REPORTS_SAVINGS_SAVING_BALANCE_IND',
    },
    {
      id: '5.1',
      report: Report.SAVING_STATEMENT,
      link: 'statement',
      component: <Reports.SavingStatementReport />,
      acl: 'REPORTS_SAVINGS_SAVING_ACCOUNT_STATEMENT',
    },

    {
      id: '5.2.e',
      report: Report.ACCOUNT_LOCKED_STATUS_REPORT,
      link: 'locked-status',
      component: <Reports.AccountLockStatusReport />,
      acl: 'REPORTS_SAVINGS_ACCOUNT_LOCKED_STATUS',
    },
    {
      id: '5.2.e',
      report: Report.ACCOUNT_CLOSING_REPORT,
      link: 'account-closing',
      component: <Reports.AccountCloseReport />,
      acl: 'REPORTS_SAVINGS_CLOSED_ACCOUNT',
    },

    {
      id: '5.4',
      report: Report.DEPOSIT_INTEREST_REPORT,
      link: 'interest-statement',
      component: <Reports.InterestPostingReport />,
      acl: 'REPORTS_SAVINGS_INTEREST_REPORT',
    },

    {
      id: '5.6',
      report: Report.SAVINGS_FD_MATURE_REPORT,
      link: 'fd-mature',
      component: <Reports.FixedDepositsReport />,
      acl: 'REPORTS_SAVINGS_FIXED_DEPOSIT_MATURITY',
    },

    {
      id: '5.7',
      report: Report.DORMANT_AC_REPORT,
      link: 'dormant-account',
      component: <Reports.DormantAccountsReport />,
      acl: 'REPORTS_SAVINGS_DORMANT_AC',
    },

    {
      id: '5.9.1',
      report: Report.THRESHOLD_TRANSACTION_REPORT,
      link: 'ttr',
      component: <Reports.TTRReport />,
      acl: 'REPORTS_SAVINGS_THRESHOLD_TRANSACTION',
    },
    {
      id: '5.9.2',
      report: Report.TRANSACTION_SUSPICIOUS_TRANSACTION_REPORT,
      link: 'suspicious-transactions',
      component: <Reports.SuspiousTransactionReport />,
      acl: 'REPORTS_SAVINGS_SUSPICIOUS_TRANSACTION',
    },

    {
      id: '5.14',
      report: Report.INTEREST_TAX_REPORT,
      link: 'interest-tax',
      component: <Reports.InterestTaxReport />,
      acl: 'REPORTS_SAVINGS_INTEREST_TAX',
    },
    {
      id: '5.15',
      report: Report.ACCOUNT_OPENING_REPORT,
      link: 'account-opening',
      component: <Reports.AccountOpenReport />,
      acl: 'REPORTS_SAVINGS_OPENED_ACCOUNT',
    },
    {
      id: '5.16',
      report: Report.CLOSED_SAVING_ACCOUNT_STATEMENT,
      link: 'closed-account-statement',
      component: <Reports.ClosedSavingAccountStatement />,
      acl: 'REPORTS_SAVINGS_CLOSED_SAVING_ACCOUNT',
    },
    {
      id: '5.17',
      report: Report.SAVING_PRODUCT_BALANCE_REPORT,
      link: 'saving-product-balance',
      component: <Reports.SavingProductBalanceReport />,
      acl: 'REPORTS_SAVINGS_SAVING_PRODUCT_WISE_BALANCE',
    },
    {
      id: '5.18',
      report: Report.SAVING_BALANCE_MINOR_REPORT,
      link: 'saving-balance-minor',
      component: <Reports.SavingBalanceMinorReport />,
      acl: 'REPORTS_SAVINGS_MINOR_SAVING_BALANCE',
    },
    {
      id: '5.19',
      report: Report.SAVING_ACCOUNT_ACCRUED_INTEREST_REPORT,
      link: 'saving-account-accrued-interest',
      component: <Reports.SavingAccountAccruedInterestReport />,
      acl: 'REPORTS_SAVINGS_SAVING_ACCOUNT_ACCRUED_INTEREST',
    },
    {
      id: '5.20',
      report: Report.E_TDS_REPORT,
      link: 'e-tds',
      component: <Reports.ETDSReport />,
      acl: 'REPORTS_SAVINGS_E_TDS',
    },
    {
      id: '5.21',
      report: Report.REGULAR_RECURRING_SAVING_INSTALLMENT_REPORT,
      link: 'regular-recurring-saving-installment',
      component: <Reports.RegularRecurringSavingInstallmentReport />,
      acl: 'REPORTS_RECURRING_SAVING_INSTALLMENT',
    },
  ],

  [ReportGroup.LOAN]: [
    {
      id: '6.0',
      report: Report.LOAN_BALANCE_REPORT,
      link: 'loan-balance',
      component: <Reports.LoanBalanceReport />,
      acl: 'REPORTS_LOAN_LOAN_BALANCE',
    },
    // {
    //   id: '6.1',
    //   report: Report.LOAN_INDIVIDUAL_STATEMENT,
    //   link: 'statement',
    //   component: <Reports.LoanStatementReport />,
    //   acl: 'REPORTS_LOAN_LOAN_ACCOUNT_STATEMENT',
    // },

    {
      id: '6.3',
      report: Report.LOAN_AGING_REPORT,
      link: 'ageing',
      component: <Reports.LoanAgingStatementsReport />,
      acl: 'REPORTS_LOAN_LOAN_AGING',
    },

    {
      id: '6.15.2.a',
      report: Report.LOAN_PRODUCT_WISE_BALANCE_REPORT,
      link: 'loan-product-balance',
      component: <Reports.LoanProductWiseBalanceReport />,
      acl: 'REPORTS_LOAN_LOAN_PRODUCT_WISE_BALANCE',
    },
    {
      id: '6.16',
      report: Report.CLOSED_LOAN_ACCOUNT_STATEMENT,
      link: 'closed-loan-account-statement',
      component: <Reports.ClosedLoanStatementReport />,
      acl: 'REPORTS_LOAN_CLOSED_LOAN_ACCOUNT_STATEMENT',
    },
    {
      id: '6.16',
      report: Report.LOAN_DISBURSEMENT_REPORT,
      link: 'disbursement',
      component: <Reports.LoanDisburesementReport />,
      acl: 'REPORTS_LOAN_LOAN_DISBURSEMENT',
    },
    {
      id: '14.2.5.a',
      report: Report.LOAN_COLLATERAL_REPORT,
      link: 'loan-collateral',
      component: <Reports.LoanCollateralReport />,
      acl: 'REPORTS_LOAN_LOAN_COLLATERAL',
    },
    {
      id: '14.2.6',
      report: Report.LOAN_PERSONAL_GURANTEE_REPORT,
      link: 'personal-gurantee',
      component: <Reports.LoanPersonalGuranteeReport />,
      acl: 'REPORTS_LOAN_PERSONAL_GUARANTEE',
    },
    {
      id: '14.2.9',
      report: Report.LOAN_CALL_REPORT,
      link: 'call-sheet',
      component: <Reports.LoanCallSheetReport />,
      acl: 'REPORTS_LOAN_LOAN_CALL_SHEET',
    },
    {
      id: '14.2.10',
      report: Report.LOAN_ACCOUNT_ACCRUED_INTEREST_REPORT,
      link: 'loan-account-accrued-interest',
      component: <Reports.LoanAccountAccruedInterestReport />,
      acl: 'REPORTS_LOAN_LOAN_ACCOUNT_ACCRUED_INTEREST',
    },
    {
      id: '14.2.11',
      report: Report.DOSARI_LOAN_REPORT,
      link: 'dosari-loan',
      component: <Reports.DosariLoanReport />,
      acl: 'REPORTS_LOAN_DOASRI_LOAN',
    },
    {
      id: '14.2.12',
      report: Report.LOAN_WRITE_OFF_REPORT,
      link: 'loan-write-off',
      component: <Reports.LoanWriteOffReport />,
      acl: 'REPORTS_LOAN_LOAN_WRITE_OFF',
    },
    {
      id: '14.2.13',
      report: Report.LOAN_TRANSACTION_STATEMENT_REPORT,
      link: 'loan-transaction-statement',
      component: <Reports.LoanTransactionStatementReport />,
      acl: 'REPORTS_LOAN_LOAN_ACCOUNT_TRANSACTION',
    },
  ],

  [ReportGroup.MOBILE_BANKING]: [
    {
      id: '4.5',
      report: Report.MB_CHANNEL_TRANSACTION_REPORT,
      link: 'transaction',
      component: <Reports.MBTransactionsReport />,
      acl: 'REPORTS_MB_MOBILE_BANKING_CHANNEL_TXN',
    },
    {
      id: '4.6',
      report: Report.MB_REGISTRATION_REPORT,
      link: 'registration',
      component: <Reports.MBRegistrationReport />,
      acl: 'REPORTS_MB_MOBILE_BANKING_CHANNEL_REGISTRATION',
    },
    {
      id: '4.7',
      report: Report.MB_EXPIRY_REPORT,
      link: 'expiry',
      component: <Reports.MBExpiryReport />,
      acl: 'REPORTS_MB_MOBILE_BANKING_CHANNEL_EXPIRY',
    },
    {
      id: '4.8',
      acl: 'REPORTS_UTILITY_USAGE',
      component: <Reports.UtilityUsageReport />,
      report: Report.MB_UTILITY_USAGE_REPORT,
      link: 'utility-usage',
    },
    {
      id: '4.9',
      acl: 'REPORTS_UTILITY_USAGE',
      component: <Reports.SMSUsageReport />,
      report: Report.MB_SMS_USAGE_REPORT,
      link: 'sms-usage',
    },
  ],

  [ReportGroup.TRANSACTION_REPORT]: [
    {
      id: '7.8',
      report: Report.TRANSACTION_DAY_BOOK_REPORT,
      link: 'day-book',
      component: <Reports.DayBookReport />,
      acl: 'REPORTS_TXN_DAYBOOK',
    },
    {
      id: '7.8.2',
      report: Report.TRANSACTION_TELLER_DAY_BOOK_REPORT,
      link: 'teller-day-book',
      component: <Reports.TellerDayBookReport />,
      acl: 'REPORTS_TXN_TELLER_DAYBOOK',
    },
    {
      id: '7.1',
      report: Report.TRANSACTION_TRIAL_SHEET,
      link: 'trial-sheet',
      component: <Reports.TrialSheetReport />,
      acl: 'REPORTS_TXN_TRIAL_BALANCE',
    },
    {
      id: '7.7.3',
      report: Report.TRANSACTION_FISCAL_YEAR,
      link: 'fiscal-year',
      component: <Reports.FiscalYearReport />,
      acl: 'REPORTS_TXN_FISCAL_YEAR_END_ADJUSTMENT_TRIAL_BALANCE',
    },
    {
      id: '7.1.2',
      report: Report.TRANSACTION_CHAR_KHATA_REPORT,
      link: 'charkhata',
      component: <Reports.CharKhataReport />,
      acl: 'REPORTS_TXN_CHARKHATA_LEDGER_REPORT',
    },
    {
      id: '7.1.2',
      report: Report.TRANSACTION_ADJUSTED_CHAR_KHATA_REPORT,
      link: 'adjusted-charkhata',
      component: <Reports.AdjustedCharKhataReport />,
      acl: 'REPORTS_TXN_CHARKHATA_LEDGER_REPORT',
    },
    {
      id: '7.1.1',
      report: Report.TRANSACTION_BALANCE_SHEET_REPORT,
      link: 'balance-sheet',
      component: <Reports.BalanceSheetReport />,
      acl: 'REPORTS_TXN_BALANCE_SHEET_REPORT',
    },
    {
      id: '7.21',
      report: Report.TRANSACTION_PROFIT_AND_LOSS,
      link: 'profit-and-loss',
      component: <Reports.ProfitAndLossReport />,
      acl: 'REPORTS_TXN_PROFIT_AND_LOSS',
    },

    {
      id: '7.2.5.b',
      report: Report.TRANSACTION_CASH_LEDGER,
      link: 'cash-ledger',
      component: <Reports.CashLedgersReport />,
      acl: 'REPORTS_TXN_CASH_LEDGER',
    },
    {
      id: '7.2.5.2',
      report: Report.TRANSACTION_BANK_GL_BALANCE_REPORT,
      link: 'bankGL-balance',
      component: <Reports.BankGLBalanceReport />,
      acl: 'REPORTS_TXN_BANK_GL_BALANCE',
    },
    {
      id: '7.2.6',
      report: Report.TRANSACTION_VAULT_BALANCE,
      link: 'vault-balance',
      component: <Reports.VaultBalanceReport />,
      acl: 'REPORTS_TXN_VAULT_BALANCE',
    },
    {
      id: '7.2.7',
      report: Report.TRANSACTION_TELLER_REPORT,
      link: 'teller',
      component: <Reports.TellerReport />,
      acl: 'REPORTS_TXN_TELLER_REPORT',
    },

    {
      id: '7.7',
      report: Report.TRANSACTION_BANK_GL_REPORT,
      link: 'bank-gl-statement',
      component: <Reports.BankGLStatementReport />,
      acl: 'REPORTS_TXN_BANK_GL_BALANCE',
    },
    {
      id: '7.7.1',
      report: Report.TRANSACTION_ABBS_TRANSACTION_REPORT,
      link: 'abbs-transaction',
      component: <Reports.ABBSTransactionReport />,
      acl: 'REPORTS_TXN_ABBS_TRANSACTION',
    },
    {
      id: '7.7.1',
      report: Report.TRANSACTION_MRTRANSACTION_REPORT,
      link: 'mr-transaction',
      component: <Reports.MarketRepresentativeTransactionReport />,
      acl: 'REPORTS_TXN_MARKET_REPRESENTATIVE_TXN',
    },
    {
      id: '7.7.2',
      report: Report.TRANSACTION_TAG_KHATA_REPORT,
      link: 'tag-khata',
      component: <Reports.TagKhataReport />,
      acl: 'REPORTS_TXN_LEDGER_GROUP',
    },
    {
      id: '7.7.2',
      report: Report.TRANSACTION_DAILY_BALANCE_REPORT,
      link: 'daily-balance',
      component: <Reports.DailyBalanceReport />,
      acl: 'REPORTS_TXN_DAILY_BALANCE',
    },
    {
      id: '7.7.2',
      report: Report.TRANSACTION_JOURNAL_VOUCHER_SUMMARY,
      link: 'journal-voucher-summary',
      component: <Reports.JournalVoucherSummary />,
      acl: 'REPORTS_TXN_JOURNAL_VOUCHER',
    },
    {
      id: '7.7.2',
      report: Report.TRANSACTION_DAILY_VOUCHER_SUMMARY,
      link: 'daily-voucher-summary',
      component: <Reports.DailyVoucherSummaryReport />,
      acl: 'REPORTS_TXN_DAILY_VOUCHER_SUMMARY',
    },
    {
      id: '7.7.2',
      report: Report.TRANSACTION_SPREAD_RATE_CALCULATION,
      link: 'spread-rate-calculation',
      component: <Reports.SpreadRateCalculationReport />,
      acl: 'REPORTS_TXN_DAILY_VOUCHER_SUMMARY',
    },
  ],

  [ReportGroup.BRANCH]: [
    {
      id: '8',
      report: Report.SERVICE_CENTER_LIST_REPORT,
      link: 'list-report',
      component: <Reports.ServiceCenterListReport />,
      acl: 'REPORTS_SC_SERVICE_CENTER_LIST',
    },
    {
      id: '7.2',
      report: Report.TRANSACTION_ABBS_STATUS_REPORT,
      link: 'abbs-status',
      component: <Reports.ABBSTransactionReport />,
      acl: 'REPORTS_SC_ABBS_REPORT',
    },
    {
      id: '7.2.2',
      report: Report.TRANSACTION_SERVICE_CENTER_BALANCE_REPORT,
      link: 'service-center-balance',
      component: <Reports.ServviceCenterBalanceReport />,
      acl: 'REPORTS_SC_SERVICE_CENTER_BALANCE',
    },
    {
      id: '7.2.2',
      report: Report.TRANSACTION_SERVICE_CENTER_COA_WISE_BALANCE,
      link: 'service-center-coa-wise-balance',
      component: <Reports.ServiceCenterCOAWiseBalanceReport />,
      acl: 'REPORTS_SC_SERVICE_CENTER_COA_HEAD_WISE_BALANCE',
    },
    {
      id: '7.2.3',
      report: Report.BRANCH_READINESS_REPORT,
      link: 'branch-readiness',
      component: <Reports.BranchReadinessReport />,
      acl: 'REPORTS_SC_BRANCH_READINESS_REPORT',
    },
  ],

  [ReportGroup.OTHERS]: [
    {
      id: '9',
      report: Report.OTHERS_ADJUSTED_LEDGER_REPORT,
      link: 'adjusted-ledger',
      component: <Reports.AdjustedLedgersReport />,
      acl: 'REPORTS_OTHERS_ADJUSTED_LEDGER',
    },
    {
      id: '9',
      report: Report.GENERAL_LEDGER_REPORT,
      link: 'ledger',
      component: <Reports.LedgerReport />,
      acl: 'REPORTS_OTHERS_GENERAL_LEDGER',
    },
    {
      id: '10',
      report: Report.USER_LIST_REPORT,
      link: 'users',
      component: <Reports.UsersReport />,
      acl: 'REPORTS_OTHERS_GENERAL_LEDGER',
    },
    {
      id: '11',
      report: Report.COPOMIS_IMPORT_MEMBER_REPORT,
      link: 'copomis-import-member',
      component: <Reports.CopomisImportMemberReport />,
      acl: 'REPORTS_OTHERS_COPOMIS_IMPORT_MEMBER',
    },
    {
      id: '11.1',
      report: Report.COPOMIS_FINANCIAL_REPORT,
      link: 'copomis-financial',
      component: <Reports.CopomisFinancialReport />,
      acl: 'REPORTS_OTHERS_COPOMIS_IMPORT_MEMBER',
    },
    {
      id: '12',
      report: Report.PEARLS_REPORT,
      link: 'pearls-report',
      acl: 'REPORTS_OTHERS_PEARLS_REPORT',
      component: <Reports.PearlsReport />,
    },
    {
      id: '13',
      report: Report.OTHERS_COMMITTEE_REGISTER,
      link: 'committee-register',
      acl: 'REPORTS_OTHERS_COMMITTEE_REGISTERED_DETAILS',
      component: <Reports.BODDetailsRegisterReport />,
    },
    {
      id: '14',
      report: Report.OTHERS_ORGANIZATIONAL_PROFILE,
      link: 'organizational-profile',
      acl: 'REPORTS_OTHERS_ORGANIZATIONAL_PRROFILE',
      component: <Reports.OrganizationalProfileReport />,
    },
    {
      id: '15',
      report: Report.OTHERS_SHARE_CERTIFICATE_PRINT_REPORT,
      link: 'share-issue-print',
      acl: 'REPORTS_OTHERS_SHARE_CERTIFICATE',
      component: <Reports.ShareCertificatePrintReport />,
    },
    {
      id: '15',
      report: Report.OTHERS_FD_CERTIFICATE_PRINT_REPORT,
      link: 'fd-print',
      acl: 'REPORTS_OTHERS_FD_CERTIFICATE',
      component: <Reports.FDCertificatePrintReport />,
    },
    {
      id: '15',
      acl: 'REPORTS_TXN_LEDGER_BALANCE',
      component: <Reports.LedgerBalanceReport />,
      report: Report.OTHERS_LEDGER_BALANCE_REPORT,
      link: 'ledger-balance',
    },
    {
      id: '9',
      report: Report.OTHERS_SAVING_LOAN_INTEREST_REPORT,
      link: 'saving-loan-interest',
      component: <Reports.SavingLoanInterestReport />,
      acl: 'REPORTS_OTHERS_GENERAL_LEDGER',
    },
    {
      id: '10',
      report: Report.LOAN_INDIVIDUAL_STATEMENT,
      link: 'statement',
      component: <Reports.LoanStatementReport />,
      acl: 'REPORTS_LOAN_LOAN_ACCOUNT_STATEMENT',
    },
  ],
  [ReportGroup.EXCEPTION]: [
    {
      id: '3',
      report: Report.EXCEPTION_SAVING_BALANCE,
      link: 'saving-balance',
      acl: 'REPORTS_EXCEPTION_SAVING_BALANCE_EXCEPTION',
      component: <Reports.ExceptionSavingBalanceReport />,
    },
    {
      id: '4',
      report: Report.EXCEPTION_LOAN_BALANCE,
      link: 'loan-balance',
      acl: 'REPORTS_EXCEPTION_LOAN_BALANCE_EXCEPTION',
      component: <Reports.ExceptionLoanBalanceReport />,
    },

    {
      id: '5',
      report: Report.EXCEPTION_SHARE_BALANCE,
      link: 'share-balance',
      acl: 'REPORTS_EXCEPTION_SHARE_BALANCE_EXCEPTION',
      component: <Reports.ExceptionShareBalanceReport />,
    },
  ],

  [ReportGroup.INVENTORY]: [
    {
      id: '2',
      report: Report.INVENTORY_REGISTER_REPORT,
      link: 'register',
      acl: 'REPORTS_INVENTORY_INVENTORY_REGISTER',
      component: <Reports.InventoryRegisterReport />,
    },
    {
      id: '4',
      report: Report.INVENTORY_STOCK_STATUS_REPORT,
      link: 'stock-status',
      acl: 'REPORTS_INVENTORY_INVENTORY_STOCK_STATUS',
      component: <Reports.InventoryStockStatusReport />,
    },
    {
      id: '5',
      report: Report.INVENTORY_SALES_REPORT,
      link: 'item-sales',
      acl: 'REPORTS_INVENTORY_INVENTORY_ITEM_SALES',
      component: <Reports.InventoryItemSalesReport />,
    },
    {
      id: '2.1',
      report: Report.INVENTORY_PURCHASE_ORDER_REPORT,
      link: 'purchase-order',
      acl: 'REPORTS_INVENTORY_INVENTORY_PURCHASE_ORDER',
      component: <Reports.InventoryPurchaseOrderReport />,
    },
  ],
  [ReportGroup.ACCOUNTING]: [
    {
      id: '1',
      report: Report.ACCOUNTING_EXTERNAL_LOAN_STATEMENT_REPORT,
      link: 'external-loan-statement',
      acl: 'REPORTS_ACCOUNTING_EXTERNAL_LOAN',
      component: <Reports.ExternalLoanStatementReport />,
    },
    {
      id: '2',
      report: Report.ACCOUNTING_EXTERNAL_LOAN_REPORT,
      link: 'external-loan',
      acl: 'REPORTS_ACCOUNTING_EXTERNAL_LOAN_STATEMENT',
      component: <Reports.ExternalLoanReport />,
    },
    {
      id: '3',
      report: Report.ACCOUNTING_FD_INVESTMENT_STATEMENT_REPORT,
      link: 'fd-investment-statement',

      acl: 'REPORTS_ACCOUNTING_FD_INVESTMENT_STATEMENT',
      component: <Reports.FDInvestmentStatementReport />,
    },
    {
      id: '4',
      report: Report.ACCOUNTING_FD_INVESTMENT,
      link: 'fd-investment',
      acl: 'REPORTS_ACCOUNTING_FD_INVESTMENT',
      component: <Reports.FDInvestmentReport />,
    },
  ],
  [ReportGroup.MICROFINANCE]: [
    {
      id: '1',
      report: Report.MICROFINANCE_TELLER_DAY_BOOK_REPORT,
      link: 'teller-day-book',
      acl: 'REPORTS_MF_TXN_TELLER_DAYBOOK',
      component: <Reports.MFTellerDayBookReport />,
    },
  ],
};
