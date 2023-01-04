export const ROUTES = {
  CBS_MEMBER_IND_ADD: '/cbs/members/individual/add',
  CBS_MEMBER_INS_ADD: '/cbs/members/institution/add',
  CBS_MEMBER_COOP_ADD: '/cbs/members/coop/add',
  CBS_MEMBER_COOP_UNION_ADD: '/cbs/members/coop_union/add',
  CBS_MEMBER_LIST: '/cbs/members/list',
  CBS_MEMBER_DETAILS: '/cbs/members/details',
  CBS_MEMBER_ACTIVATION: '/cbs/members/activation',
  CBS_MEMBER_INACTIVATION: '/cbs/members/inactivation',

  CBS_SHARE_ISSUE_ADD: '/cbs/share/issue/add',
  CBS_SHARE_RETURN_ADD: '/cbs/share/return/add',
  CBS_SHARE_BALANCE: '/cbs/share/balance/list',
  CBS_SHARE_REGISTER: '/cbs/share/register/list',

  CBS_ACCOUNT_OPEN_ADD: '/cbs/savings/account-open/add',
  CBS_ACCOUNT_CLOSE_ADD: '/cbs/savings/account-close/add',
  CBS_ACCOUNT_LIST: '/cbs/savings/account-open/list',
  CBS_ACCOUNT_SAVING_PRODUCT: '/cbs/savings/products/list',
  CBS_ACCOUNT_CLOSE_LIST: '/cbs/savings/account-close/list',
  CBS_ACCOUNT_SAVING_DETAILS: '/cbs/savings/account-open/details',

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
  CBS_TRANSFER_CASH_TRANSFER_ADD: '/cbs/transfers/cash-transfer/add',
  CBS_TRANSFER_CASH_TRANSFER_LIST: '/cbs/transfers/cash-transfer/list',
  CBS_TRANSFER_BRANCH_TRANSFER_LIST: '/cbs/transfers/brancg-transfer/list',
  CBS_TRANSFER_BRANCH_TRANSFER_ADD: '/cbs/transfers/brancg-transfer/add',

  CBS_REQUESTS_MEMBER_LIST: '/cbs/requests/member/list',
  CBS_REQUESTS_WITHDRAW_VIA_COLLECTOR_LIST: '/cbs/requests/withdraw-via-collector/list',
  CBS_REQUESTS_LOAN_LIST: '/cbs/requests/loan/list',
  CBS_WITHDRAW_SLIP_LIST: '/cbs/withdraw/withdraw-slip/list',
  CBS_WITHDRAW_SLIP_BOOK_ADD: '/cbs/withdraw/withdraw-slip-book/add',
  CBS_WITHDRAW_SLIP_BOOK_LIST: '/cbs/withdraw/withdraw-slip-book/list',
  CBS_WITHDRAW_SLIP_ADD: '/cbs/withdraw/withdraw-slip/add',
  CBS_BLOCK_WITHDRAW_SLIP_REQUEST_LIST: '/cbs/withdraw/block-withdraw-slip-requests/list',
  CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD: '/cbs/withdraw/block-withdraw-slip-requests/add',

  CBS_REPORT_LIST: '/cbs/reports/cbs/list',
  CBS_REPORT_SAVED: '/cbs/reports/saved/list',

  CBS_OTHERS_FUND_MANAGEMENT_ADD: '/cbs/others/fund-management/add',
  CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST: '/cbs/others/share-dividend-posting/list',
  CBS_OTHERS_FUND_MANAGEMENT_LIST: '/cbs/others/fund-management/list',
  CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD: '/cbs/others/share-dividend-posting/add',

  /* SETTINGS APP & NOT INDEXED BY GLOBAL SEARCH */

  SETTINGS_GENERAL_ALTERNATIVE_CHANNELS: '/settings/general/alternative-channels/charges/configure',

  SETTINGS_GENERAL_AUDIT_LOG: '/settings/general/audit-log/list',

  SETTINGS_GENERAL_COA: '/settings/general/coa/list',
  SETTINGS_GENERAL_COA_DETAILS: '/settings/general/coa/details',

  SETTINGS_GENERAL_CODE_MANAGEMENT_ACCOUNTING: '/settings/general/code-management/accounting',
  SETTINGS_GENERAL_CODE_MANAGEMENT_CBS: '/settings/general/code-management/core-banking-system',
  SETTINGS_GENERAL_CODE_MANAGEMENT_INVENTORY: '/settings/general/code-management/inventory',

  SETTINGS_GENERAL_SAVINGS_TDS: '/settings/general/savings/tds/configure',
  SETTINGS_GENERAL_SP_LIST: '/settings/general/saving-products/list',
  SETTINGS_GENERAL_SP_ADD: '/settings/general/saving-products/add',
  SETTINGS_GENERAL_SP_DETAILS: '/settings/general/deposit-products/details',

  SETTINGS_GENERAL_LOAN: '/settings/general/loan/configure',
  SETTINGS_GENERAL_LOAN_PRODUCT_TYPE: '/settings/general/loan/product-type/configure',
  SETTINGS_GENERAL_LOAN_VALUATOR: '/settings/general/loan/valuator/list',
  SETTINGS_GENERAL_LOAN_VALUATOR_ADD: '/settings/general/loan/valuator/add',
  SETTINGS_GENERAL_LOAN_VALUATOR_EDIT: '/settings/general/loan/valuator/edit',

  SETTINGS_GENERAL_LP_LIST: '/settings/general/loan-products/list',
  SETTINGS_GENERAL_LP_ADD: '/settings/general/loan-products/add',
  SETTINGS_GENERAL_LP_DETAILS: '/settings/general/loan-products/details',

  SETTINGS_GENERAL_INDEXING: '/settings/general/indexing',

  SETTINGS_GENERAL_MEMBERS: '/settings/general/members/configure',
  SETTINGS_GENERAL_MEMBERS_KYM_IND: '/settings/general/members/kym-individual/configure',
  SETTINGS_GENERAL_MEMBERS_KYM_INS: '/settings/general/members/kym-institutional/configure',
  SETTINGS_GENERAL_MEMBERS_KYM_COOP: '/settings/general/members/kym-cooperative/configure',
  SETTINGS_GENERAL_MEMBERS_KYM_COOP_UNION:
    '/settings/general/members/kym-cooperative-union/configure',

  SETTINGS_GENERAL_SERVICE_CENTER_LIST: '/settings/general/service-center/list',
  SETTINGS_GENERAL_SERVICE_CENTER_LIST_ADD: '/settings/general/service-center/add',
  SETTINGS_GENERAL_SERVICE_CENTER_LIST_EDIT: '/settings/general/service-center/edit',

  SETTINGS_GENERAL_SHARE: '/settings/general/share/configure',
  SETTINGS_GENERAL_SHARE_ISSUES: '/settings/general/share/issues/configure',
  SETTINGS_GENERAL_SHARE_RETURNS: '/settings/general/share/returns/configure',
  SETTINGS_GENERAL_SHARE_TRANSFER: '/settings/general/share/transfer/configure',
  SETTINGS_USERS_LIST: '/settings/users/super-admin/list',
  SETTINGS_USERS_ADD: '/settings/users/super-admin/add',

  /* NOT INDEXED BY GLOBAL SEARCH */

  CBS_ACCOUNT_OPEN_EDIT: '/cbs/savings/account-open/edit',
  CBS_LOAN_APPLICATION_DETAILS: '/cbs/loan/applications/details',

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
  CBS_TRANS_LOAN_PAYMENT_DETAILS: '/cbs/transactions/loan-payment/details',

  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST:
    '/cbs/others/market-representative-transaction/list',
  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD:
    '/cbs/others/market-representative-transaction/add',
  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANS_DETAILS:
    '/cbs/others/market-representative-transaction/details',
  CBS_OTHERS_MARKET_REPRESENTATIVE_DETAILS: '/cbs/others/market-representative/details',
  CBS_ACCOUNT_DEPOSIT_LIST: '/cbs/savings/deposit/list',
  CBS_ACCOUNT_DEPOSIT_ADD: '/cbs/savings/deposit/add',
  CBS_ACCOUNT_WITHDRAW_LIST: '/cbs/savings/withdraw/list',
  CBS_ACCOUNT_WITHDRAW_ADD: '/cbs/savings/withdraw/add',
  CBS_ACCOUNT_TRANSFER_LIST: '/cbs/savings/account-transfer/list',
  CBS_ACCOUNT_TRANSFER_ADD: '/cbs/savings/account-transfer/add',
  CBS_WITHDRAW_SLIP_BOOK_PRINT: '/cbs/withdraw/withdraw-slip-book/print',
} as const;
