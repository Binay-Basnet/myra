export enum ReportGroup {
  ORGANIZATIONS = 'Organizations',
  MEMBERS = 'Members',
  SHARE = 'Share',
  SAVINGS = 'Savings',
  LOAN = 'loan',
}

export enum Report {
  ORGANIZATION_PROFILE = 'Organization Profile',
  BOARD_OF_DIRECTOR_DETAIL_REGISTER = 'Board Of Directors Detail Register',

  INDIVIDUAL_MEMBER_PROFILE = 'Individual Member Profile',
  MEMBER_REPORTS = 'Member Reports',
  MEMBER_REGISTER_REPORT = 'Member Register Report',
  MEMBER_ACTIVATIONS = 'Active/Inactive Member',
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

  LOAN_INDIVIDUAL_STATEMENT = 'Loan Individual Statement',
  LOAN_CONSOLIDATED_REPORT = 'Loan Consolidated Report',
  LOAN_AGING_REPORT = 'Loan Aging Report',
  LOAN_DAILY_TRANSACTION_REPORT = 'Loan Daily Transaction Report',
  LOAN_INTEREST_REPORT = 'Interest Report',
  LOAN_MIS_ANALYSIS_REPORT = 'Loan MIS/Analysis Report',
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
    },
    {
      id: '2.4',
      report: Report.MEMBER_ACTIVATIONS,
    },
    {
      id: '2.5',
      report: Report.KYM_STATUS_REPORT,
    },
  ],

  [ReportGroup.SHARE]: [
    {
      id: '3.1',
      report: Report.SHARE_REGISTER,
    },
    {
      id: '3.2',
      report: Report.SHARE_STATEMENT,
      link: 'statement',
    },
    {
      id: '3.3',
      report: Report.SHARE_TRANSACTION_REPORT,
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
      id: '5.3',
      report: Report.DEPOSIT_DAILY_TRANSACTION_REPORT,
    },
    {
      id: '5.4',
      report: Report.DEPOSIT_INTEREST_REPORT,
    },
    {
      id: '5.5',
      report: Report.DEPOSIT_MIS_ANALYSIS_REPORT,
    },
    {
      id: '5.6',
      report: Report.FD_PRE_MATURE_REPORT,
    },
  ],

  [ReportGroup.LOAN]: [
    {
      id: '6.1',
      report: Report.LOAN_INDIVIDUAL_STATEMENT,
    },
    {
      id: '6.2',
      report: Report.LOAN_CONSOLIDATED_REPORT,
    },
    {
      id: '6.3',
      report: Report.LOAN_AGING_REPORT,
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
  ],
};
