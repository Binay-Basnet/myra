// export const featureCode = {
//   newMemberIndividual: '10001',
//   newMemberInstitution: '10002',
//   newMemberCooperative: '10003',
//   newMemberCooperativeUnion: '10004',
//   memberList: '10005',

//   newShareIssue: '10101',
//   newShareReturn: '10102',
//   shareBalance: '10103',

//   newAccountOpen: '10201',
//   newAccountClose: '10202',
//   accountList: '10203',
//   accountCloseList: '10204',
//   depositProductList: '10205',

//   newDeposit: '10401',
//   newWithdraw: '10402',
//   newAccountTransfer: '10403',
//   newLoanPayment: '10304',
//   newMarketRepresentativeTransaction: '10404',
//   depositList: '10405',
//   withdrawList: '10406',
//   accountTransferList: '10407',
//   marketRepresentativeList: '10410',
//   marketRepresentativeTransactionsList: '10408',

//   newLoan: '10401',
//   loanList: '10402',
//   loanCloseList: '10404',
//   loanProductsList: '10405',

//   saveReports: '10601',
//   favoriteReports: '10602',
//   shareRegister: '10103',
//   shareTransactionReport: '10604',

//   accountCode: ['90.1', '90.2'],
//   ledgerAccountCode: ['160.6', '160.8'],

//   settingsOrganization: '90001',
//   settingsServiceCenter: '90002',
//   settingsChartsOfAccount: '90003',
//   settingsMembers: '90004',
//   settingsShare: '90005',
//   settingsDeposit: '90006',
//   settingsDepositProduct: '90007',
//   settingsLoan: '90008',
//   settingsLoanProduct: '90009',
//   settingsValuator: '90010',

//   newLoanApplication: '10301',
//   newLoanRepayment: '10302',
//   loanApplication: '10303',
//   loanAccounts: '10304',
//   loanRepayment: '10305',
//   loanProducts: '10306',
//   loanDeclined: '10307',

//   cbsReports: '10801',
//   savedReports: '10802',

//   profitFundManagementList: '10905',
//   newProfitFundManagement: '10902',

//   withdrawSlipRequest: '10702',
//   blockWithdrawSlip: '10703',

//   vaultTransferList: '10503',
//   tellerTransferList: '10504',
//   newVaultTransfer: '10501',
//   newTellerTransfer: '10502',

//   withdrawRequestList: '10602',
//   loanRequestList: '10603',
// };

export const featureCode = {
  // member
  memberList: 100000,
  newMemberIndiviual: 100011,
  newMemberInstitution: 100021,
  newMemberCooperative: 100031,
  newMemberCooperativeUnion: 100041,

  // share
  shareBalanceList: 101030,
  shareRegisterList: 101040,
  newShareIssue: 101011,
  newShareReturn: 101021,

  // savings
  savingAccountList: 102030,
  savingCloseAccountList: 102020,
  newSavingAccountOpen: 102011,
  newAccountClose: 102021,

  // loan
  loanAccountList: 103030,
  declinedLoanList: 103060,
  loanRepaymentList: 103020,
  loanApplicationList: 103010,
  newLoanApplication: 103011,
  newLoanRepayment: 103021,
  loanClosedAccountList: 103070,

  // transactions
  depositList: 104010,
  withdrawList: 104020,
  accountTransferList: 104030,
  marketRepresentativeTransactionList: 104040,
  marketRepresentativeList: 104060,
  journalVoucherList: 104050,
  allTransactionList: 104070,
  newDeposit: 104011,
  newWithdraw: 104021,
  newAccountTransfer: 104031,
  newMarketRepresentativeTransaction: 104041,
  newJournalVoucher: 104051,
  allAccounts: 104080,

  // transfer
  vaultTransferList: 105010,
  tellerTransferList: 105020,
  serviceCenterTransferList: 105030,
  newVaultTransfer: 105011,
  newTellerTransfer: 105021,

  // requests
  memberRequestList: 106010,
  withdrawRequestList: 106020,
  loanRequestList: 106030,

  // withdraw slip
  withdrawSlipBookList: 107010,
  withdrawSlipRequestList: 107030,
  blockWithdrawSlipRequestList: 107020,
  newWithdrawSlipBook: 107011,
  newBlockWithdrawSlipBook: 107021,

  // report
  cbsReports: 108010,
  savedReports: 108020,

  // others
  profitToFundManagementList: 109010,
  shareDividendPostingList: 109020,
  newProfitToFundManagement: 109011,
  newShareDividendPosting: 109021,

  // settings
  serviceCenterList: 900010,
  newServiceCenter: 900011,
  coaList: 900020,
  coaDetail: 900022,
  auditLogList: 900030,
  generalMemberSetting: 900043,
  individualMemberSetting: 900053,
  institutionalMemberSetting: 900063,
  coopMemberSetting: 900073,
  coopUnionMemberSetting: 900083,
  generalShareSetting: 900093,
  shareIssueSetting: 900103,
  shareReturnSetting: 900113,
  shareTransferSetting: 900123,
  savingGeneralSetting: 900133,
  savingProductList: 900140,
  newSavingProduct: 900141,
  savingProductDetail: 900142,
  generalLoanSetting: 900153,
  loanProductTypeSetting: 900163,
  valuatorSetting: 900170,
  newValuator: 900171,
  loanProductList: 900180,
  newloanProduct: 900181,
  loanProductDetail: 900182,
  codeManagementCbs: 900203,
  alternativeChannelCharges: 900223,
  userList: 901010,
};
