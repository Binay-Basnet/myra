// export const permissions: Record<string, Record<string, string>> = {
//   SUPERADMIN: {
//     CBS_MEMBERS_MEMBER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_DETAIL: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBB_MEMBERS_MEMBER_FEE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_MEMBERS_KYM_UPDATE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_MEMBERS_MEMBER_CLOSE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_SHARE: 'SHOW_IN_MENU',
//     CBS_SAVINGS: 'SHOW_IN_MENU',
//     CBS_LOAN: 'SHOW_IN_MENU',
//     CBS_TRANSACTIONS: 'SHOW_IN_MENU',
//     CBS_TRANSFERS: 'SHOW_IN_MENU',
//     CBS_REQUESTS: 'SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS: 'SHOW_IN_MENU',
//     CBS_REPORTS: 'CREATE/SHOW_IN_MENU',
//     CBS_OTHERS: 'SHOW_IN_MENU',
//
//     CBS_SHARE_SHARE_ISSUE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_RETURN: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_BALANCE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_REGISTER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_CERTIFICATE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_SAVINGS_SAVING_ACCOUNT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_PRODUCT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_CLOSE:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_RENEW: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_SAVINGS_FD_CERTIFICATE_PRINT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_SAVINGS_SAVING_INTEREST_RATE_CHANGE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_SAVINGS_SAVING_INTEREST_POST: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_LOAN_LOAN_APPLICATION: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_DISBURSEMENT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_RENEW_OR_RESCHEDULE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_COLLATERAL_RELEASE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT_CLOSE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_DECLINED_LOAN: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_INTEREST_RATE_CHANGE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_INTEREST_POST: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_TRANSACTIONS_DEPOSIT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_WITHDRAW: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_ACCOUNT_TRANSFER:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_LOAN_REPAYMENT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_ALL_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_JOURNAL_VOUCHER:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_BULK_ACCOUNT_TRANSFER:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSACTION_LIMIT_SHARE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_TRANSACTION_LIMIT_DEPOSIT_LIMIT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_TRANSACTION_LIMIT_WITHDRAW_LIMIT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_TRANSACTION_LIMIT_LOAN_DISBURSE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_TODAY_COLLECTION_SHEET:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_MEMBER_ASSIGNMENT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_DAY_CLOSE:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_PROFIT_TO_FUND_MANAGEMENT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_SHARE_DIVIDEND_POSTING:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSFERS_VAULT_TRANSFER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSFERS_TELLER_TRANSFER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSFERS_CASH_IN_TRANSIT_TRANSFER:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSFERS_SERVICE_CENTER_CASH_TRANSFER:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_REQUESTS_MEMBER_REQUESTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_REQUESTS_WITHDRAW_REQUEST: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_REQUESTS_LOAN_REQUESTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_REQUESTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_ISSUE:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_BLOCK:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ACCOUNTING_SALES: 'SHOW_IN_MENU',
//     ACCOUNTING_PURCHASE: 'SHOW_IN_MENU',
//     ACCOUNTING_ACCOUNTING: 'SHOW_IN_MENU',
//     ACCOUNTING_LOAN: 'SHOW_IN_MENU',
//     ACCOUNTING_INVESTMENT: 'SHOW_IN_MENU',
//
//     ALTERNATIVE_CHANNELS_USERS: 'SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_DOWNLOADS: 'SHOW_IN_MENU',
//
//     ACCOUNTING_SYSTEM_SALES_SALES_ENTRY:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_SALES_CUSTOMERS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_PURCHASE_EXPENSES:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_PURCHASE_SUPPLIERS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_ACCOUNTING_QUICK_PAYMENT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_ACCOUNTING_QUICK_RECEIPT:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_ACCOUNTING_BANK_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_ACCOUNTING_CHARTS_OF_ACCOUNTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ACCOUNTING_SYSTEM_INVESTMENTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_INVESTMENTS_ACCOUNTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_INVESTMENT_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ACCOUNTING_SYSTEM_EXTERNAL_LOAN:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_EXTERNAL_LOAN_ACCOUNTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_EXTERNAL_LOAN_PAYMENTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_E_BANKING_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_ATM_CARD_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_SMS_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     USER_USER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     USER_USER_PASSWORD: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     SETTINGS_ORGANIZATION_PROFILE: 'SHOW_IN_MENU',
//     SETTINGS_SERVICE_CENTER: 'SHOW_IN_MENU',
//     SETTINGS_COA: 'SHOW_IN_MENU',
//     SETTINGS_MEMBER: 'SHOW_IN_MENU',
//     SETTINGS_KYM_SETTING: 'SHOW_IN_MENU',
//     SETTINGS_SHARE: 'SHOW_IN_MENU',
//     SETTINGS_SAVING_PARAMETERS: 'SHOW_IN_MENU',
//     SETTINGS_SAVING_PRODUCTS: 'SHOW_IN_MENU',
//     SETTINGS_LOAN_PARAMETERS: 'SHOW_IN_MENU',
//     SETTINGS_LOAN_PRODUCTS: 'SHOW_IN_MENU',
//     SETTINGS_DOCUMENT_MANAGEMENT: 'SHOW_IN_MENU',
//     SETTINGS_INSURANCE: 'SHOW_IN_MENU',
//     SETTINGS_AUDIT_LOG: 'SHOW_IN_MENU',
//     SETTINGS_BANK: 'SHOW_IN_MENU',
//     SETTINGS_CODE_MANAGEMENT: 'SHOW_IN_MENU',
//     SETTINGS_ALTERNATIVE_CHANNELS: 'SHOW_IN_MENU',
//     SETTINGS_INDEXING: 'SHOW_IN_MENU',
//     SETTINGS_GENERAL: 'SHOW_IN_MENU',
//     SETTINGS_USERS: 'SHOW_IN_MENU',
//
//     APP_CBS: 'SHOW_IN_MENU',
//     APP_MEMBER_SHARE: 'SHOW_IN_MENU',
//     APP_ACCOUNTING: 'SHOW_IN_MENU',
//     APP_ALTERNATIVE_CHANNEL: 'SHOW_IN_MENU',
//     APP_INVENTORY: 'SHOW_IN_MENU',
//     APP_SETTINGS: 'SHOW_IN_MENU',
//
//     CBS_REPORTS_ORGANIZATION: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_SHARE: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MEMBER: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_SAVINGS: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_LOAN: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_TRANSACTION: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MOBILE_BANKING: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_ATM: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_BRANCHLESS_BANKING: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_SERVICE_CENTER: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_OTHER: 'CREATE/SHOW_IN_MENU',
//   },
//   TELLER: {
//     CBS_MEMBERS_MEMBER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_DETAIL: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBB_MEMBERS_MEMBER_FEE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_KYM_UPDATE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_CLOSE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_SHARE: 'SHOW_IN_MENU',
//     CBS_SHARE_SHARE_ISSUE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_RETURN: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_BALANCE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_REGISTER: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_CERTIFICATE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_SAVINGS: 'SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_PRODUCT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_CLOSE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_RENEW: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_SAVINGS_FD_CERTIFICATE_PRINT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_LOAN: 'SHOW_IN_MENU',
//     CBS_LOAN_LOAN_APPLICATION: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_DISBURSEMENT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_RENEW_OR_RESCHEDULE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_COLLATERAL_RELEASE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT_CLOSE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_DECLINED_LOAN: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSACTIONS: 'SHOW_IN_MENU',
//     CBS_TRANSACTIONS_DEPOSIT: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_WITHDRAW: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_ACCOUNT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_LOAN_REPAYMENT: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_JOURNAL_VOUCHER: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_BULK_ACCOUNT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_ALL_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSFERS: 'SHOW_IN_MENU',
//     CBS_TRANSFERS_TELLER_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSFERS_BRANCH_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED',
//
//     CBS_REQUESTS: 'SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS: 'SHOW_IN_MENU',
//     CBS_REQUESTS_WITHDRAW_REQUEST: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_REQUESTS: 'CREATE/VIEW/REVIEW/APPROVED',
//
//     APP_CBS: 'SHOW_IN_MENU',
//     APP_MEMBER_SHARE: 'SHOW_IN_MENU',
//     'APP_ALTERNATIVE CHANNEL': 'SHOW_IN_MENU',
//
//     CBS_REPORTS_SHARE: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MEMBER: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_SAVINGS: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_LOAN: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_TRANSACTION: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MOBILE_BANKING: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_ATM: 'CREATE/SHOW_IN_MENU',
//   },
//
//   MARKET_REPRESENTATIVE: {
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_TODAY_COLLECTION_SHEET:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_REQUESTS: 'SHOW_IN_MENU',
//     CBS_REQUESTS_WITHDRAW_REQUEST: 'CREATE/VIEW/REVIEW/APPROVED',
//     APP_CBS: 'SHOW_IN_MENU',
//   },
//
//   ACCOUNTANT: {
//     ACCOUNTING_SYSTEM_SALES_SALES_ENTRY: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_SALES_CUSTOMERS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_PURCHASE_EXPENSES: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_PURCHASE_SUPPLIERS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_ACCOUNTING_QUICK_PAYMENT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_ACCOUNTING_QUICK_RECEIPT: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_ACCOUNTING_BANK_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_ACCOUNTING_CHARTS_OF_ACCOUNTS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     ACCOUNTING_SYSTEM_INVESTMENTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_INVESTMENTS_ACCOUNTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_INVESTMENT_TRANSACTIONS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     ACCOUNTING_SYSTEM_EXTERNAL_LOAN: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_EXTERNAL_LOAN_ACCOUNTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     ACCOUNTING_SYSTEM_EXTERNAL_LOAN_PAYMENTS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     ACCOUNTING_SALES: 'SHOW_IN_MENU',
//     ACCOUNTING_PURCHASE: 'SHOW_IN_MENU',
//     ACCOUNTING_ACCOUNTING: 'SHOW_IN_MENU',
//     ACCOUNTING_LOAN: 'SHOW_IN_MENU',
//     ACCOUNTING_INVESTMENT: 'SHOW_IN_MENU',
//
//     APP_ACCOUNTING: 'SHOW_IN_MENU',
//     CBS_REPORTS_TRANSACTION: 'CREATE/SHOW_IN_MENU',
//   },
//   HEAD_TELLER: {
//     CBS_MEMBERS_MEMBER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_DETAIL: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBB_MEMBERS_MEMBER_FEE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_KYM_UPDATE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_CLOSE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_SHARE: 'SHOW_IN_MENU',
//     CBS_SHARE_SHARE_ISSUE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_RETURN: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_BALANCE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_REGISTER: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_CERTIFICATE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_SAVINGS: 'SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_PRODUCT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_CLOSE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_RENEW: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_SAVINGS_FD_CERTIFICATE_PRINT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_LOAN: 'SHOW_IN_MENU',
//     CBS_LOAN_LOAN_APPLICATION: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_DISBURSEMENT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_RENEW_OR_RESCHEDULE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_COLLATERAL_RELEASE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT_CLOSE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_DECLINED_LOAN: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSACTIONS: 'SHOW_IN_MENU',
//     CBS_TRANSACTIONS_DEPOSIT: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_WITHDRAW: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_ACCOUNT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_LOAN_REPAYMENT: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_JOURNAL_VOUCHER: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_BULK_ACCOUNT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_ALL_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSFERS: 'SHOW_IN_MENU',
//     CBS_TRANSFERS_VAULT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED/UPDATE/DELETE',
//     CBS_TRANSFERS_TELLER_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED/UPDATE/DELETE',
//     CBS_TRANSFERS_BRANCH_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED/UPDATE/DELETE',
//
//     CBS_REQUESTS: 'SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS: 'SHOW_IN_MENU',
//     CBS_REQUESTS_WITHDRAW_REQUEST: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_REQUESTS: 'CREATE/VIEW/REVIEW/APPROVED',
//
//     ACCOUNTING_SALES: 'SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_SALES_SALES_ENTRY: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_SALES_CUSTOMERS: 'CREATE/VIEW/EXPORT/REVIEW',
//
//     ACCOUNTING_PURCHASE: 'SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_PURCHASE_EXPENSES: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_PURCHASE_SUPPLIERS: 'CREATE/VIEW/EXPORT/REVIEW',
//
//     ACCOUNTING_ACCOUNTING: 'SHOW_IN_MENU',
//     ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_ACCOUNTING_QUICK_PAYMENT: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_ACCOUNTING_QUICK_RECEIPT: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_ACCOUNTING_BANK_TRANSACTIONS: 'CREATE/VIEW/EXPORT/REVIEW',
//     ACCOUNTING_SYSTEM_ACCOUNTING_CHARTS_OF_ACCOUNTS: 'CREATE/VIEW/EXPORT/REVIEW',
//
//     SETTINGS_COA: 'SHOW_IN_MENU',
//     APP_CBS: 'SHOW_IN_MENU',
//     APP_MEMBER_SHARE: 'SHOW_IN_MENU',
//     'APP_ALTERNATIVE CHANNEL': 'SHOW_IN_MENU',
//     CBS_REPORTS: 'CREATE/SHOW_IN_MENU',
//
//     CBS_REPORTS_SHARE: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MEMBER: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_SAVINGS: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_LOAN: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_TRANSACTION: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MOBILE_BANKING: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_ATM: 'CREATE/SHOW_IN_MENU',
//   },
//   CUSTOMER_SERVICE_REPRESENTATIVE: {
//     CBS_MEMBERS_MEMBER: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_DETAIL: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBB_MEMBERS_MEMBER_FEE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_KYM_UPDATE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MEMBERS_MEMBER_CLOSE: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_SHARE: 'SHOW_IN_MENU',
//     CBS_SHARE_SHARE_ISSUE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_RETURN: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_BALANCE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_REGISTER: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SHARE_SHARE_CERTIFICATE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_SAVINGS: 'SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_PRODUCT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_CLOSE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_SAVINGS_SAVING_ACCOUNT_RENEW: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_SAVINGS_FD_CERTIFICATE_PRINT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//
//     CBS_LOAN: 'SHOW_IN_MENU',
//     CBS_LOAN_LOAN_APPLICATION: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_DISBURSEMENT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_LOAN_RENEW_OR_RESCHEDULE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_COLLATERAL_RELEASE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED',
//     CBS_LOAN_LOAN_ACCOUNT_CLOSE: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_LOAN_DECLINED_LOAN: 'CREATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_TRANSACTIONS: 'SHOW_IN_MENU',
//     CBS_TRANSACTIONS_DEPOSIT: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_WITHDRAW: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_ACCOUNT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_LOAN_REPAYMENT: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_JOURNAL_VOUCHER: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_MARKET_REPRESENTATIVE_COLLECTION: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_TRANSACTIONS_BULK_ACCOUNT_TRANSFER: 'CREATE/VIEW/REVIEW/APPROVED',
//     CBS_TRANSACTIONS_ALL_TRANSACTIONS:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_OTHERS: 'SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES_MEMBER_ASSIGNMENT:
//       'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_REQUESTS: 'SHOW_IN_MENU',
//     CBS_REQUESTS_MEMBER_REQUESTS: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_REQUESTS_WITHDRAW_REQUEST: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_REQUESTS_LOAN_REQUESTS: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     CBS_WITHDRAW_SLIPS: 'SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_REQUESTS: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_ISSUE: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//     CBS_WITHDRAW_SLIPS_WITHDRAW_SLIPS_BLOCK: 'CREATE/VIEW/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     ALTERNATIVE_CHANNELS_USERS: 'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_MOBILE_BANKING_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_E_BANKING_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_ATM_CARD_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//     ALTERNATIVE_CHANNELS_SMS_REGISTRATION:
//       'CREATE/UPDATE/VIEW/DELETE/EXPORT/REVIEW/APPROVED/SHOW_IN_MENU',
//
//     APP_CBS: 'SHOW_IN_MENU',
//     APP_MEMBER_SHARE: 'SHOW_IN_MENU',
//     'APP_ALTERNATIVE CHANNEL': 'SHOW_IN_MENU',
//
//     CBS_REPORTS: 'VIEW/SHOW_IN_MENU',
//     CBS_REPORTS_SHARE: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MEMBER: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_SAVINGS: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_LOAN: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_TRANSACTION: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_MOBILE_BANKING: 'CREATE/SHOW_IN_MENU',
//     CBS_REPORTS_ATM: 'CREATE/SHOW_IN_MENU',
//   },
// };

export const permissions = {};
