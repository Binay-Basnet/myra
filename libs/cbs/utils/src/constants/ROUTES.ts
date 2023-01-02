export const ROUTES = {
  CBS_MEMBER_IND_ADD: '/cbs/members/individual/add',
  CBS_MEMBER_INS_ADD: '/cbs/members/institution/add',
  CBS_MEMBER_COOP_ADD: '/cbs/members/coop/add',
  CBS_MEMBER_COOP_UNION_ADD: '/cbs/members/coop_union/add',
  CBS_MEMBER_LIST: '/cbs/members/list',
  CBS_MEMBER_DETAILS: '/cbs/members/details',

  CBS_SHARE_ISSUE_ADD: '/cbs/share/issue/add',
  CBS_SHARE_RETURN_ADD: '/cbs/share/return/add',
  CBS_SHARE_BALANCE: '/cbs/share/balance/list',
  CBS_SHARE_REGISTER: '/cbs/share/register/list',

  CBS_ACCOUNT_OPEN_ADD: '/cbs/savings/account-open/add',
  CBS_ACCOUNT_CLOSE_ADD: '/cbs/savings/account-close/add',
  CBS_ACCOUNT_LIST: '/cbs/savings/accounts/list',
  CBS_ACCOUNT_SAVING_PRODUCT: '/cbs/savings/products/list',
  CBS_ACCOUNT_CLOSE_LIST: '/cbs/savings/account-close/list',
  CBS_SAVING_DETAILS: '/cbs/saving/details',

  CBS_LOAN_APPLICATIONS_LIST: '/cbs/loan/applications/list',
  CBS_LOAN_APPLICATIONS_ADD: '/cbs/loan/applications/add',
  CBS_LOAN_REPAYMENTS_LIST: '/cbs/loan/repayments/list',
  CBS_LOAN_REPAYMENTS_ADD: '/cbs/loan/repayments/add',
  CBS_LOAN_PRODUCTS_LIST: '/cbs/loan/products/list',
  CBS_LOAN_DECLINED_LIST: '/cbs/loan/declined/list',
  CBS_LOAN_ACCOUNTS_LIST: '/cbs/loan/accounts/list',
  CBS_LOAN_ACCOUNT_DETAILS: '/cbs/loan/accounts/details',

  CBS_TRANS_DEPOSIT_ADD: '/cbs/transactions/deposit/add',
  CBS_TRANS_WITHDRAW_ADD: '/cbs/transactions/withdraw/add',
  CBS_TRANS_ACCOUNT_TRANSFER_ADD: '/cbs/transactions/account-transfer/add',
  CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD:
    '/cbs/transactions/market-representative-transaction/add',
  CBS_TRANS_JOURNAL_VOUCHER_ADD: '/cbs/transactions/journal-vouchers/add',
  CBS_TRANS_DEPOSIT_LIST: '/cbs/transactions/deposit/list',
  CBS_TRANS_WITHDRAW_LIST: '/cbs/transactions/withdraw/list',
  CBS_TRANS_ACCOUNT_TRANSFER_LIST: '/cbs/transactions/account-transfer/list',
  CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_LIST:
    '/cbs/transactions/market-representative-transaction/list',
  CBS_TRANS_MARKET_REPRESENTATIVE_LIST: '/cbs/transactions/market-representative/list',
  CBS_TRANS_JOURNAL_VOUCHER_LIST: '/cbs/transactions/journal-vouchers/list',
  CBS_TRANS_ALL_TRANSACTION_LIST: '/cbs/transactions/all-transactions/list',

  CBS_TRANSFER_VAULT_ADD: '/cbs/transfers/vault-transfer/add',
  CBS_TRANSFER_TELLER_ADD: '/cbs/transfers/tellSer-transfer/add',
  CBS_TRANSFER_VAULT_LIST: '/cbs/transfers/vault-transfer/list',
  CBS_TRANSFER_TELLER_LIST: '/cbs/transfers/teller-transfer/list',
  CBS_TRANSFER_BRANCH_LIST: '/cbs/transfers/branch-transfer/list',

  CBS_REQUESTS_MEMBER_LIST: '/cbs/requests/member/list',
  CBS_REQUESTS_WITHDRAW_VIA_COLLECTOR_LIST: '/cbs/requests/withdraw-via-collector/list',
  CBS_REQUESTS_LOAN_LIST: '/cbs/requests/loan/list',
  CBS_WITHDRAW_SLIP_LIST: '/cbs/withdraw/withdraw-slip/list',
  CBS_WITHDRAW_SLIP_BOOK_ADD: '/cbs/withdraw/withdraw-slip-book/add',
  CB_WITHDRAW_SLIP_BOOK_LIST: '/cbs/withdraw/withdraw-slip-book/list',
  CBS_WITHDRAW_SLIP_ADD: '/cbs/withdraw/withdraw-slip/add',
  CBS_BLOCK_WITHDRAW_SLIP_REQUEST_LIST: '/cbs/withdraw/block-withdraw-slip-requests/list',
  CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD: '/cbs/withdraw/block-withdraw-slip-requests/add',

  CBS_REPORT_LIST: '/cbs/reports/cbs/list',
  CBS_REPORT_SAVED: '/cbs/reports/saved/list',

  CBS_OTHERS_FUND_MANAGEMENT_ADD: '/cbs/others/fund-management/add',
  CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST: '/cbs/others/share-dividend-posting/list',

  CBS_OTHERS_FUND_MANAGEMENT_LIST: '/cbs/others/fund-management/list',
  CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD: '/cbs/others/share-dividend-posting/add',

  SETTINGS_GENERAL_MEMBERS: '/settings/general/members',
  SETTINGS_GENERAL_COA_DETAILS: '/settings/general/charts-of-accounts/details',
  SETTINGS_GENERAL_DP_DETAILS: '/settings/general/deposit-products/details',
  SETTINGS_GENERAL_LP_DETAILS: '/settings/general/loan-products/details',

  CBS_ACCOUNT_OPEN_EDIT: '/cbs/savings/account-close/edit',
  CBS_LOAN_APPLICATION_DETAILS: '/cbs/loan/applications/details',
  CBS_MEMBER_ACTIVATION: '/cbs/members/activation',
  CBS_MEMBER_INACTIVATION: '/cbs/members/inactivation',

  CBS_OTHERS_MARKET_REPRESENTATIVE_LIST: '/cbs/others/market-representative/list',

  CBS_SHARE_REGISTER_DETAILS: '/cbs/share/register/details',
  CBS_LOAN_ACCOUNTS_DETAILS: '/cbs/loan/accounts/details',
  CBS_LOAN_DISBURSE: '/cbs/loan/applications/disburse',
  CBS_LOAN_APPROVE: '/cbs/loan/applications/approve',
  CBS_LOAN_DECLINED_DETAILS: '/cbs/loan/declined/details',
  CBS_TRANS_LOAN_PAYMENT_LIST: '/cbs/transactions/loan-payment/list',
  CBS_TRANS_LOAN_PAYMENT_ADD: '/cbs/transactions/loan-payment/add',
  CBS_TRANS_ALL_TRANSACTIONS_DETAILS: '/cbs/transactions/all-transactions/details',
  CBS_TRANS_ACCOUNT_TRANSFER_DETAILS: '/cbs/transactions/account-transfer/details',
  CBS_TRANS_BULK_DEPOSIT_ADD: '/cbs/transactions/bulk-deposit/add',
  CBS_TRANS_DEPOSIT_DETAILS: '/cbs/transactions/deposit/details',
  CBS_TRANS_WITHDRAW_DETAILS: '/cbs/transactions/withdraw/details',
  CBS_TRANS_JOURNAL_VOUCHER_DETAILS: '/cbs/transactions/journal-vouchers/details',

  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST:
    '/cbs/others/market-representative-transaction/list',
  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD:
    '/cbs/others/market-representative-transaction/add',
} as const;
