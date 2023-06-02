export const ROUTES = {
  HOME: '/',

  CBS_NO_MEMBER_CODE: '/no-member-code',

  CBS_MEMBER: '/cbs/members',
  CBS_MEMBER_IND_ADD: '/cbs/members/individual/add',
  CBS_MEMBER_INS_ADD: '/cbs/members/institution/add',
  CBS_MEMBER_COOP_ADD: '/cbs/members/coop/add',
  CBS_MEMBER_COOP_UNION_ADD: '/cbs/members/coop_union/add',
  CBS_MEMBER_LIST: '/cbs/members/list',
  CBS_MEMBER_INACTIVE_LIST: '/cbs/members/inactive/list',
  CBS_MEMBER_DETAILS: '/cbs/members/details',
  CBS_MEMBER_ACTIVATION: '/cbs/members/activation',
  CBS_MEMBER_INACTIVATION: '/cbs/members/inactivation',
  CBS_MEMBER_TRANSLATION: '/cbs/members/translation',
  CBS_MEMBER_MINOR_LIST: '/cbs/members/minor/list',
  CBS_MEMBER_DORMANCY: '/cbs/members/dormancy',

  CBS_SHARE_ISSUE_ADD: '/cbs/share/issue/add',
  CBS_SHARE_RETURN_ADD: '/cbs/share/return/add',
  CBS_SHARE_BALANCE: '/cbs/share/balance/list',
  CBS_SHARE_REGISTER: '/cbs/share/register/list',

  CBS_ACCOUNT_OPEN_ADD: '/cbs/savings/account-open/add',
  CBS_ACCOUNT_CLOSE_ADD: '/cbs/savings/account-close/add',
  CBS_ACCOUNT_LIST: '/cbs/savings/account-open/list',
  CBS_ACCOUNT_SAVING_PRODUCT: '/cbs/savings/products/list',
  CBS_ACCOUNT_SAVING_PRODUCT_DETAILS: '/cbs/savings/products/details',
  CBS_ACCOUNT_CLOSE_LIST: '/cbs/savings/account-close/list',
  CBS_ACCOUNT_SAVING_DETAILS: '/cbs/savings/account-open/details',

  CBS_LOAN_APPLICATIONS_LIST: '/cbs/loan/applications/list',
  CBS_LOAN_APPLICATIONS_ADD: '/cbs/loan/applications/add',
  CBS_LOAN_ACCOUNTS_SWITCH_ADD: '/cbs/loan/accounts/switch/add',
  CBS_LOAN_ACCOUNTS_COLLATERAL_ADD: '/cbs/loan/accounts/collateral/add',
  CBS_LOAN_REPAYMENTS_LIST: '/cbs/loan/repayments/list',
  CBS_LOAN_REPAYMENTS_ADD: '/cbs/loan/repayments/add',
  CBS_LOAN_REPAYMENT_DETAILS: '/cbs/loan/repayments/details',

  CBS_LOAN_PRODUCTS_LIST: '/cbs/loan/products/list',
  CBS_LOAN_PRODUCTS_DETAILS: '/cbs/loan/products/details',
  CBS_LOAN_DECLINED_LIST: '/cbs/loan/declined/list',
  CBS_LOAN_ACCOUNTS_LIST: '/cbs/loan/accounts/list',
  CBS_LOAN_ACCOUNT_DETAILS: '/cbs/loan/accounts/details',

  CBS_LOAN_LOSS_PROVISION_LIST: '/cbs/loan/loan-loss-provision/list',
  CBS_LOAN_LOSS_PROVISION_ADD: '/cbs/loan/loan-loss-provision/add',

  CBS_LOAN_WRITE_OFF_LIST: '/cbs/loan/loan-write-off/list',

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
  CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_DETAILS:
    '/cbs/transactions/market-representative-transaction/details',
  CBS_TRANS_MARKET_REPRESENTATIVE_LIST: '/cbs/transactions/market-representative/list',
  CBS_TRANS_MARKET_REPRESENTATIVE_DETAILS: '/cbs/transactions/market-representative/details',
  CBS_TRANS_JOURNAL_VOUCHER_LIST: '/cbs/transactions/journal-vouchers/list',
  CBS_TRANS_ALL_TRANSACTION_LIST: '/cbs/transactions/all-transactions/list',
  CBS_TRANS_ALL_LEDGERS_LIST: '/cbs/transactions/all-ledgers/list',
  CBS_TRANS_ALL_ACCOUNTS_LIST: '/cbs/transactions/all-accounts/list',
  CBS_TRANS_ALL_HOLDING_ACCOUNTS_LIST: '/cbs/transactions/all-holding-accounts/list',
  CBS_TRANS_ALL_LEDGERS_DETAIL: '/cbs/transactions/all-ledgers/details',
  CBS_TRANS_ALL_HOLDING_ACCOUNTS_DETAILS: '/cbs/transactions/all-holding-accounts/details',

  CBS_TRANSFER_VAULT_ADD: '/cbs/transfers/vault-transfer/add',
  CBS_TRANSFER_TELLER_ADD: '/cbs/transfers/teller-transfer/add',
  CBS_TRANSFER_VAULT_LIST: '/cbs/transfers/vault-transfer/list',
  CBS_TRANSFER_TELLER_LIST: '/cbs/transfers/teller-transfer/list',
  CBS_TRANSFER_BRANCH_LIST: '/cbs/transfers/branch-transfer/list',
  CBS_TRANSFER_CASH_TRANSFER_ADD: '/cbs/transfers/cash-transfer/add',
  CBS_TRANSFER_CASH_TRANSFER_LIST: '/cbs/transfers/cash-transfer/list',
  CBS_TRANSFER_BRANCH_TRANSFER_LIST: '/cbs/transfers/branch-transfer/list',
  CBS_TRANSFER_BRANCH_TRANSFER_ADD: '/cbs/transfers/branch-transfer/add',
  CBS_TRANSFER_INTER_SERVICE_TRANS_LIST: '/cbs/transfers/service-center-transactions/list',
  CBS_TRANSFER_INTER_SERVICE_TRANS_ADD: '/cbs/transfers/service-center-transactions/add',
  CBS_TRANSFER_INTER_SERVICE_TRANS_DETAILS: '/cbs/transfers/service-center-transactions/details',
  CBS_TRANSFER_CASH_IN_TRANSIT_ADD: '/cbs/transfers/cash-transit-transfer/add',
  CBS_TRANSFER_CASH_IN_TRANSIT_LIST: '/cbs/transfers/cash-transit-transfer/list',
  CBS_TRANSFER_CASH_IN_TRANSIT_DETAILS: '/cbs/transfers/cash-transit-transfer/details',
  CBS_TRANSFER_BANK_LIST: '/cbs/transfers/bank-transfer/list',
  CBS_TRANSFER_BANK_ADD: '/cbs/transfers/bank-transfer/add',
  CBS_TRANSFER_BANK_DETAILS: '/cbs/transfers/bank-transfer/details',

  CBS_REQUESTS_MEMBER_LIST: '/cbs/requests/member/list',
  CBS_REQUESTS_WITHDRAW_VIA_COLLECTOR_LIST: '/cbs/requests/withdraw-via-collector/list',
  CBS_REQUESTS_LOAN_LIST: '/cbs/requests/loan/list',
  CBS_WITHDRAW_SLIP_LIST: '/cbs/withdraw/withdraw-slip/list',
  CBS_WITHDRAW_SLIP_BOOK_ADD: '/cbs/withdraw/withdraw-slip-book/add',
  CBS_WITHDRAW_SLIP_BOOK_LIST: '/cbs/withdraw/withdraw-slip-book/list',
  CBS_WITHDRAW_SLIP_ADD: '/cbs/withdraw/withdraw-slip/add',
  CBS_BLOCK_WITHDRAW_SLIP_REQUEST_LIST: '/cbs/withdraw/block-withdraw-slip-requests/list',
  CBS_BLOCK_WITHDRAW_SLIP_REQUEST_ADD: '/cbs/withdraw/block-withdraw-slip-requests/add',

  CBS_REPORT_LIST: '/reports/cbs/share',
  CBS_REPORT_SAVED: '/reports/saved',

  CBS_OTHERS_FUND_MANAGEMENT_ADD: '/cbs/others/fund-management/add',
  CBS_OTHERS_SHARE_DIVIDEND_POSTING_LIST: '/cbs/others/share-dividend-posting/list',
  CBS_OTHERS_FUND_MANAGEMENT_LIST: '/cbs/others/fund-management/list',
  CBS_OTHERS_SHARE_DIVIDEND_POSTING_ADD: '/cbs/others/share-dividend-posting/add',
  CBS_OTHERS_BULK_TRANSFERS_LIST: '/cbs/others/bulk-transfer/list',
  CBS_OTHERS_BULK_TRANSFERS_ADD: '/cbs/others/bulk-transfer/add',

  /* SETTINGS APP & NOT INDEXED BY GLOBAL SEARCH */

  SETTINGS_GENERAL_ACCOUNTING_GENERAL: '/settings/general/accounting/general',
  SETTINGS_GENERAL_ACCOUNTING_CREDIT_TERMS: '/settings/general/accounting/credit-terms',
  SETTINGS_GENERAL_ACCOUTING_CUSTOM_FIELDS: '/settings/general/accounting/custom-fields',
  SETTINGS_GENERAL_ACCOUNTING_LEDGER_MAPPINGS:
    '/settings/general/accounting/default-ledger-mapping',
  SETTINGS_GENERAL_ACCOUNTING_CUSTOM_FIELDS: '/settings/general/accounting/custom-fields',
  SETTINGS_GENERAL_ACCOUNTING_TAX: '/settings/general/accounting/tax',

  SETTINGS_GENERAL_ALTERNATIVE_CHANNELS: '/settings/general/alternative-channels/charges/configure',

  SETTINGS_GENERAL_AUDIT_LOG: '/settings/monitor/audit-log/list',
  SETTINGS_EOD_SETUP: '/settings/general/eod/setup',
  SETTINGS_GENERAL_BANK: '/settings/general/bank/configure',

  SETTINGS_GENERAL_COA: '/settings/general/coa/list',
  SETTINGS_GENERAL_COA_DETAILS: '/settings/general/coa/details',

  SETTINGS_GENERAL_CODE_MANAGEMENT_ACCOUNTING: '/settings/general/code-management/accounting',
  SETTINGS_GENERAL_CODE_MANAGEMENT_CBS:
    '/settings/general/code-management/core-banking-system/configure',
  SETTINGS_GENERAL_CODE_MANAGEMENT_INVENTORY: '/settings/general/code-management/inventory',

  SETTINGS_GENERAL_SAVINGS_TDS: '/settings/general/savings/tds/configure',
  SETTINGS_GENERAL_SP_LIST: '/settings/general/saving-products/list',
  SETTINGS_GENERAL_SP_ADD: '/settings/general/saving-products/add',
  SETTINGS_GENERAL_SP_EDIT: '/settings/general/saving-products/edit',
  SETTINGS_GENERAL_SP_DETAILS: '/settings/general/deposit-products/details',

  SETTINGS_GENERAL_LOAN: '/settings/general/loan/configure',
  SETTINGS_GENERAL_LOAN_PRODUCT_TYPE: '/settings/general/loan/product-type/configure',
  SETTINGS_GENERAL_LOAN_VALUATOR: '/settings/general/loan/valuator/list',
  SETTINGS_GENERAL_LOAN_VALUATOR_ADD: '/settings/general/loan/valuator/add',
  SETTINGS_GENERAL_LOAN_VALUATOR_EDIT: '/settings/general/loan/valuator/edit',

  SETTINGS_GENERAL_LP_LIST: '/settings/general/loan-products/list',
  SETTINGS_GENERAL_LP_ADD: '/settings/general/loan-products/add',
  SETTINGS_GENERAL_LP_EDIT: '/settings/general/loan-products/edit',
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
  SETTINGS_USERS_EDIT: '/settings/users/super-admin/edit',
  SETTINGS_USERS_DETAILS: '/settings/users/super-admin/details',
  SETTINGS_GENERAL_PEARLS_REPORT_P1: '/settings/general/pearls-report/p1/configure',
  SETTINGS_GENERAL_PEARLS_REPORT_P2: '/settings/general/pearls-report/p2/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_P2X: '/settings/general/pearls-report/p2x/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_E1: '/settings/general/pearls-report/e1/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_E5: '/settings/general/pearls-report/e5/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_E6: '/settings/general/pearls-report/e6/configure',
  SETTINGS_GENERAL_PEARLS_REPORT_E7: '/settings/general/pearls-report/e7/configure',
  SETTINGS_GENERAL_PEARLS_REPORT_E8: '/settings/general/pearls-report/e8/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_A1: '/settings/general/pearls-report/a1/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_A2: '/settings/general/pearls-report/a2/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_L1: '/settings/general/pearls-report/l1/configure',

  SETTINGS_GENERAL_PEARLS_REPORT_L2: '/settings/general/pearls-report/l2/configure',

  SETTINGS_ACCESS_LOG: '/settings/monitor/access-log/list',

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
  CBS_TRANS_ALL_ACCOUNTS_DETAILS: '/cbs/transactions/all-accounts/details',

  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_LIST:
    '/cbs/others/market-representative-transaction/list',
  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANSACTIONS_ADD:
    '/cbs/others/market-representative-transaction/add',
  CBS_OTHERS_MARKET_REPRESENTATIVE_TRANS_DETAILS:
    '/cbs/others/market-representative-transaction/details',
  CBS_OTHERS_MARKET_REPRESENTATIVE_DETAILS: '/cbs/others/market-representative/details',

  CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_LIST:
    '/cbs/others/market-representative-collection/list',
  CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_ADD:
    '/cbs/others/market-representative-collection/add',

  CBS_ACCOUNT_DEPOSIT_LIST: '/cbs/savings/deposit/list',
  CBS_ACCOUNT_DEPOSIT_ADD: '/cbs/savings/deposit/add',
  CBS_ACCOUNT_WITHDRAW_LIST: '/cbs/savings/withdraw/list',
  CBS_ACCOUNT_WITHDRAW_ADD: '/cbs/savings/withdraw/add',
  CBS_ACCOUNT_TRANSFER_LIST: '/cbs/savings/account-transfer/list',
  CBS_ACCOUNT_TRANSFER_ADD: '/cbs/savings/account-transfer/add',
  CBS_WITHDRAW_SLIP_BOOK_PRINT: '/cbs/withdraw/withdraw-slip-book/print',

  CBS_LOAN_CLOSED_ACCOUNTS: '/cbs/loan/closed-accounts/list',
  CBS_LOAN_CLOSED_ACCOUNTS_ADD: '/cbs/loan/closed-accounts/add',
  CBS_LOAN_APPLICATIONS_EDIT: '/cbs/loan/applications/edit',

  CBS_REPORTS_MEMBER_CLASSIFICATION: '/reports/cbs/members/classification/new',
  CBS_REPORTS_MEMBER_ACTIVE_INACTIVE: '/reports/cbs/members/activations/new',
  CBS_REPORTS_KYM_STATUS: '/reports/cbs/members/kym-status/new',

  CBS_REPORTS_SHARE_REGISTER: '/reports/cbs/share/register/new',
  CBS_REPORTS_SHARE_STATEMENT: '/reports/cbs/share/statement/new',
  CBS_REPORTS_SHARE_TRANSACTION: '/reports/cbs/share/transaction/new',

  CBS_REPORTS_SAVING_STATEMENT: '/reports/cbs/savings/statement/new',
  CBS_REPORTS_INTEREST_TAX_REPORT: '/reports/cbs/savings/interest-tax/new',
  CBS_REPORTS_INTEREST_STATEMENT: '/reports/cbs/savings/interest-statement/new',

  CBS_REPORTS_LOAN_STATEMENT: '/reports/cbs/loan/statement/new',
  CBS_REPORTS_LOAN_AGEING_REPORT: '/reports/cbs/loan/ageing/new',

  CBS_REPORTS_TRANS_TRIAL_SHEET: '/reports/cbs/transactions/trial-sheet/new',
  CBS_REPORTS_TRANS_CASH_LEDGER: '/reports/cbs/transactions/cash-ledger/new',
  CBS_REPORTS_TRANS_BANK_GL_STATEMENT: '/reports/cbs/transactions/bank-gl-statement/new',
  CBS_REPORTS_VAULT_BALANCE: '/reports/cbs/transactions/vault-balance/new',
  CBS_REPORTS_TELLER_REPORT: '/reports/cbs/transactions/teller/new',
  CBS_REPORTS_DAY_BOOK_REPORT: '/reports/cbs/transactions/day-book/new',

  ALTERNATIVE_CHANNELS_MBANKING_USERS: '/alternative-channels/users/mBanking',
  ALTERNATIVE_CHANNELS_MBANKING_DOWNLOADS: '/alternative-channels/downloads/form',
  ALTERNATIVE_CHANNELS_MBANKING_REG_LIST: '/alternative-channels/users/mBanking',
  ALTERNATIVE_CHANNELS_MBANKING_REG: '/alternative-channels/users/activation?type=mBanking',

  ALTERNATIVE_CHANNELS_EBANKING_REG_LIST: '/alternative-channels/users/eBanking',
  ALTERNATIVE_CHANNELS_EBANKING_REG: '/alternative-channels/users/activation?type=eBanking',
  ALTERNATIVE_CHANNELS_SMS_BANKING_REG_LIST: '/alternative-channels/users/smsBanking',
  ALTERNATIVE_CHANNELS_SMS_BANKING_REG: '/alternative-channels/users/activation?type=smsBanking',

  ALTERNATIVE_CHANNELS_DOWNLOADS_FORMS: '/alternative-channels/downloads/forms',
  ALTERNATIVE_CHANNELS_DOWNLOADS_GUIDELINES: '/alternative-channels/downloads/guidelines',
  ALTERNATIVE_CHANNELS_DOWNLOADS_REPORTS: '/alternative-channels/downloads/reports',
  ALTERNATIVE_CHANNELS_DOWNLOADS_DIRECTIVES: '/alternative-channels/downloads/directives',

  ACCOUNTING_SALES_ENTRY: '/accounting/sales/sales-entry/list',
  ACCOUNTING_SALES_ENTRY_ADD: '/accounting/sales/sales-entry/add',
  ACCOUNTING_SALES_ENTRY_DETAILS: '/accounting/sales/sales-entry/details',
  ACCOUNTING_SALES_CREDIT_NOTE: '/accounting/sales/credit-note/list',
  ACCOUNTING_SALES_CREDIT_NOTE_ADD: '/accounting/sales/credit-note/add',
  ACCOUNTING_SALES_CREDIT_NOTE_DETAILS: '/accounting/sales/credit-note/details',

  ACCOUNTING_SALES_CUSTOMER_PAYMENT: '/accounting/sales/customer-payment/list',
  ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD: '/accounting/sales/customer-payment/add',
  ACCOUNTING_SALES_CUSTOMER: '/accounting/sales/customer/list',
  ACCOUNTING_SALES_CUSTOMER_ADD: '/accounting/sales/customer/add',
  ACCOUNTING_SALES_CUSTOMER_DETAILS: '/accounting/sales/customer/details',

  ACCOUNTING_INVENTORY_ITEMS_LIST: '/accounting/inventory/items/list',
  ACCOUNTING_INVENTORY_ITEMS_ADD: '/accounting/inventory/items/add',
  ACCOUTING_INVENTORY_VARIANT_ITEMS_ADD: '/accounting/inventory/variant-items/add',
  ACCOUNTING_INVENTORY_ITEM_CATEGORY: '/accounting/inventory/item-category/list',
  ACCOUNTING_INVENTORY_ITEM_CATEGORY_ADD: '/accounting/inventory/item-category/ass',

  ACCOUNTING_INVENTORY_UNITS_LIST: '/accounting/inventory/units/list',
  ACCOUNTING_INVENTORY_UNITS_LIST_ADD: '/accounting/inventory/units/add',

  ACCOUNTING_INVENTORY_WAREHOUSE_LIST: '/accounting/inventory/warehouse/list',
  ACCOUNTING_INVENTORY_WAREHOUSE_ADD: '/accounting/inventory/warehouse/add',

  ACCOUNTING_PURCHASE_LIST: '/accounting/purchase/list',
  ACCOUNTING_PURCHASE_LIST_ADD: '/accounting/purchase/add',
  ACCOUNTING_PURCHASE_LIST_DETAILS: '/accounting/purchase/details',
  ACCOUNTING_PURCHASE_EXPENSE: '/accounting/purchase/expenses/list',
  ACCOUNTING_PURCHASE_EXPENSE_ADD: '/accounting/purchase/expenses/add',
  ACCOUNTING_PURCHASE_EXPENSE_DETAILS: '/accounting/purchase/expenses/details',

  ACCOUNTING_PURCHASE_DEBIT_NOTE: '/accounting/purchase/debit-note/list',
  ACCOUNTING_PURCHASE_DEBIT_NOTE_ADD: '/accounting/purchase/debit-note/add',
  ACCOUNTING_PURCHASE_DEBIT_NOTE_DETAILS: '/accounting/purchase/debit-note/details',

  ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT: '/accounting/purchase/supplier-payment/list',
  ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT_ADD: '/accounting/purchase/supplier-payment/add',

  ACCOUNTING_JOURNAL_VOUCHER_LIST: '/accounting/accounting/journal-vouchers/list',
  ACCOUNTING_JOURNAL_VOUCHER_ADD: '/accounting/accounting/journal-vouchers/add',
  ACCOUNTING_CASH_TRANSFER_LIST: '/accounting/accounting/cash-transfer/list',
  ACCOUNTING_CASH_TRANSFER_ADD: '/accounting/accounting/cash-transfer/add',
  ACCOUNTING_BANK_ACCOUNTS_LIST: '/accounting/accounting/bank-accounts/list',
  ACCOUNTING_BANK_ACCOUNTS_ADD: '/accounting/accounting/bank-accounts/add',
  ACCOUNTING_BANK_ACCOUNTS_EDIT: '/accounting/accounting/bank-accounts/edit',
  ACCOUNTING_COA_LIST: '/accounting/accounting/charts-of-account',
  ACCOUNTING_INTER_SERVICE_TRANS_LIST: '/accounting/accounting/service-center-transactions/list',
  ACCOUNTING_INTER_SERVICE_TRANS_ADD: '/accounting/accounting/service-center-transactions/add',

  ACCOUNTING_CHAR_KHATA_REPORT: '/accounting/reports/transactions/charkhata/new',
  ACCOUNTING_DAY_BOOK_REPORT: '/accounting/reports/transactions/day-book/new',
  ACCOUNTING_TRAIL_BALANCE_REPORT: '/accounting/reports/transactions/trial-sheet/new',

  ACCOUNTING_EXTERNAL_LOAN_LIST: '/accounting/loan/external-loan/list',
  ACCOUNTING_EXTERNAL_LOAN_ADD: '/accounting/loan/external-loan/add',
  ACCOUNTING_EXTERNAL_LOAN_PAYMENT_LIST: '/accounting/loan/external-loan-payment/list',
  ACCOUNTING_EXTERNAL_LOAN_PAYMENT_ADD: '/accounting/loan/external-loan-payment/new/add',

  ACCOUNTING_INVESTMENT_LIST: '/accounting/investment/list',
  ACCOUNTING_INVESTMENT_LIST_ADD: '/accounting/investment/add',
  ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS: '/accounting/investment/investment-transaction/list',
  ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD:
    '/accounting/investment/investment-transaction/add',

  ACCOUNTING_REPORTS: '/accounting/reports/transactions',

  INVENTORY_REGISTER: '/inventory/inventory/register/list',
  INVENTORY_INVENTORY_ADJUSTMENT: '/inventory/inventory/adjustments/list',
  INVENTORY_INVENTORY_ADJUSTMENT_ADD: '/inventory/inventory/adjustments/add',
  INVENTORY_INVENTORY_ADJUSTMENT_DETAILS: '/inventory/inventory/adjustments/details',

  INVENTORY_ITEMS: '/inventory/items/items/list',
  INVENTORY_ITEMS_ADD: '/inventory/items/items/add',
  INVENTORY_ITEMS_VARIANT_ADD: '/inventory/items/items-variant/add',
  INVENTORY_SUPPLIERS: '/inventory/suppliers/list',
  INVENTORY_SUPPLIERS_ADD: '/inventory/suppliers/add',
  INVENTORY_WAREHOUSE: '/inventory/warehouse/list',
  INVENTORY_WAREHOUSE_TRASFER_LIST: '/inventory/warehouse/transfer/list',
  INVENTORY_WAREHOUSE_TRANSFER_ADD: '/inventory/warehouse/transfer/add',
  INVENTORY_WAREHOUSE_REQUEST_LIST: '/inventory/warehouse/request/list',
  INVENTORY_WAREHOUSE_REQUEST_ADD: '/inventory/warehouse/request/add',
  INVENTORY_ITEMS_CATEGORY: '/inventory/items/category/list',
  INVENTORY_ITEMS_UNIT_LIST: '/inventory/items/units/list',
  INVENTORY_SUPPLIERS_LIST: '/inventory/suppliers/list',

  SETTINGS_GENERAL_SAVING_PRODUCTS_DETAILS: '/settings/general/saving-products/details',
  CBS_LOAN_ACCOUNT_CLOSED_DETAILS: '/cbs/loan/closed-accounts/details',
  CBS_ACCOUNT_CLOSED_DETAILS: '/cbs/savings/account-close/details',

  SETTINGS_GENERAL_PRINT_PREFERENCE: '/settings/general/print-preference/withdraw-slip',

  SETTINGS_EOD_HISTORY: '/settings/general/eod/history',

  SETTINGS_GENERAL_SAVINGS_ORGANIZATION_RATE: '/settings/general/savings/organization-rate',

  SETTINGS_GENERAL_LOAN_ORGANIZATION_RATE: '/settings/general/loan/organization-rate',

  SETTINGS_GENERAL_ORGANIZATION_DETAILS: '/settings/general/organization',
  SETTINGS_GENERAL_ORGANIZATION_EDIT: '/settings/general/organization/edit',

  SETTINGS_EOD_HISTORY_DETAILS: '/settings/general/eod/history/details',
  SETTINGS_GENERAL_COMMITTEE: '/settings/general/committee/list',
  SETTINGS_GENERAL_COMMITTEE_DETAILS: '/settings/general/committee/details',

  DAY_CLOSE: '/day-close',

  BRANCH_READINESS: '/branch-readiness',

  ACCOUNTING_INVESTMENT_ORGANIZTION_LIST: '/accounting/investment/organizations/list',
  ACCOUNTING_INVESTMENT_ORGANIZATION_ADD: '/accounting/investment/organizations/add',
  ACCOUNTING_INVESTMENT_ORGANIZATION_EDIT: '/accounting/investment/organizations/edit',

  ACCOUNTING_INVESTMENT_EDIT: '/accounting/investment/edit',

  ACCOUNTING_EXTERNAL_LOAN_ORGANIZTION_LIST: '/accounting/loan/organizations/list',
  ACCOUNTING_EXTERNAL_LOAN_ORGANIZATION_ADD: '/accounting/loan/organizations/add',
  ACCOUNTING_EXTERNAL_LOAN_ORGANIZATION_EDIT: '/accounting/loan/organizations/edit',

  ACCOUNTING_EXTERNAL_LOAN_EDIT: '/accounting/loan/external-loan/edit',

  HRMODULE_EMPLOYEES_LIST: '/hr/employee/employee/list',
  HRMODULE_ATTENDENCE_LIST: '/hr/employee/attendence/list',
  HRMODULE_LEAVE_LIST: '/hr/employee/leave/list',

  HRMODULE_EMPLOYEES_ADD: '/hr/employee/employee/add',
  HRMODULE_ATTENDENCE_ADD: '/hr/employee/attendence/add',
  HRMODULE_LEAVE_ADD: '/hr/employee/leave/add',

  HRMODULE_EMPLOYEES_SETTINGS: '/settings/general/hcm/employee',
  HRMODULE_ATTENDENCE_SETTINGS: '/hr/employee/attendence/list',
  HRMODULE_LEAVE_SETTINGS: '/hr/employee/leave/list',

  HRMODULE_CONTRACTS_LIST: '/hr/employee/contracts/list',
  HRMODULE_EXIT_DETAILS_LIST: '/hr/employee/exit-details/list',

  HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_LIST: '/hr/lifecycle/employee-onboarding/list',
  HR_LIFECYCLE_EMPLOYEE_TRANSFER_LIST: '/hr/lifecycle/transfer/list',
  HR_LIFECYCLE_EMPLOYEE_SEPERATION_LIST: '/hr/lifecycle/seperation/list',
  HR_LIFECYCLE_EMPLOYEE_PROMOTION_LIST: '/hr/lifecycle/promotion/list',
  HR_LIFECYCLE_EMPLOYEE_EXIT_LIST: '/hr/lifecycle/exit/list',

  HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_ADD: '/hr/lifecycle/employee-onboarding/add',
  HR_LIFECYCLE_EMPLOYEE_TRANSFER_ADD: '/hr/lifecycle/transfer/add',
  HR_LIFECYCLE_EMPLOYEE_SEPERATION_ADD: '/hr/lifecycle/seperation/add',
  HR_LIFECYCLE_EMPLOYEE_PROMOTION_ADD: '/hr/lifecycle/promotion/add',
  HR_LIFECYCLE_EMPLOYEE_EXIT_ADD: '/hr/lifecycle/exit/add',

  HR_RECRUITMENT_STAFF_PLANNING_LIST: '/hr/recruitment/staff-planning/list',
  HR_RECRUITMENT_JOB_POSTING_LIST: '/hr/recruitment/job-posting/list',
  HR_RECRUITMENT_JOB_APPLICATION_LIST: '/hr/recruitment/job-application/list',
  HR_RECRUITMENT_INTERVIEW_LIST: '/hr/recruitment/interview/list',
  HR_RECRUITMENT_JOB_OFFER_LIST: '/hr/recruitment/job-offer/list',
  HR_RECRUITMENT_APPOINTMENT_LETTER_LIST: '/hr/recruitment/appointment-letter/list',

  HR_RECRUITMENT_STAFF_PLANNING_ADD: '/hr/recruitment/staff-planning/add',
  HR_RECRUITMENT_JOB_POSTING_ADD: '/hr/recruitment/job-posting/add',
  HR_RECRUITMENT_JOB_APPLICATION_ADD: '/hr/recruitment/job-application/add',
  HR_RECRUITMENT_INTERVIEW_ADD: '/hr/recruitment/interview/add',
  HR_RECRUITMENT_JOB_OFFER_ADD: '/hr/recruitment/job-offer/add',
  HR_RECRUITMENT_APPOINTMENT_LETTER_ADD: '/hr/recruitment/appointment-letter/add',

  HR_RECRUITMENT_SETTINGS: '/hr/recruitment/staff-planning/list',
  HR_INTERVIEW_ROUNDS: '/hr/recruitment/staff-planning/list',
  HR_EMAIL_TEMPLATES: '/hr/recruitment/staff-planning/list',

  HR_PAYROLL_ENTRY_LIST: '/hr/payroll/payroll-run/list',
  HR_PAYROLL_SALARY_STRUCTURE_LIST: '/hr/payroll/salary-structure/list',
  HR_PAYROLL_SALARY_SLIP_LIST: '/hr/payroll/salary-slip/list',
  HR_PAYROLL_EXPEN_LIST: '/hr/payroll/expen/list',

  HR_PAYROLL_ENTRY_ADD: '/hr/payroll/payroll-run/add',
  HR_PAYROLL_SALARY_STRUCTURE_ADD: '/hr/payroll/salary-structure/add',
  HR_PAYROLL_SALARY_SLIP_ADD: '/hr/payroll/salary-slip/add',
  HR_PAYROLL_EXPEN_ADD: '/hr/payroll/expen/add',

  HR_TRAINING_COURSES_LIST: '/hr/training/courses/list',
  HR_TRAINING_STUDENTS_LIST: '/hr/training/students/list',

  HR_TRAINING_COURSES_ADD: '/hr/training/courses/add',
  HR_TRAINING_STUDENTS_ADD: '/hr/training/students/add',

  HR_TRAINING_SETTINGS: '/hr/training/courses/list',
  HR_TRAINING_REPORTS: '/hr/training/courses/list',

  HR_REPORTS: '/hr/reports/transactions',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];
