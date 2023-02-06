import type { NavType } from '../NAV';
import { ROUTES } from '../ROUTES';

export const ACCOUNTING: NavType = {
  label: 'Accounting',
  menus: {
    SALES: {
      aclKey: 'ACCOUNTING_SALES',
      label: 'Sales',
      forms: [
        {
          label: 'accountingSalesSalesEntry',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_SALES_ENTRY',
          route: ROUTES.ACCOUNTING_SALES_ENTRY_ADD,
        },
        {
          label: 'creditNote',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE',
          route: ROUTES.ACCOUNTING_SALES_CREDIT_NOTE_ADD,
        },
        {
          label: 'customerPayment',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
        {
          label: 'accountingSalesCustomers',
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
      ],
      pages: [
        {
          label: 'accountingSalesSalesEntry',
          route: ROUTES.ACCOUNTING_SALES_ENTRY,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_SALES_ENTRY',
          addRoute: ROUTES.ACCOUNTING_SALES_ENTRY_ADD,
        },
        {
          label: 'creditNote',
          route: ROUTES.ACCOUNTING_SALES_CREDIT_NOTE,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CREDIT_NOTE',
          addRoute: ROUTES.ACCOUNTING_SALES_CREDIT_NOTE_ADD,
        },
        {
          label: 'customerPayment',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          addRoute: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
        {
          label: 'accountingSalesCustomers',
          route: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT,
          aclKey: 'ACCOUNTING_SYSTEM_SALES_CUSTOMER_PAYMENT',
          addRoute: ROUTES.ACCOUNTING_SALES_CUSTOMER_PAYMENT_ADD,
        },
      ],
    },
    PURCHASE: {
      aclKey: 'ACCOUNTING_PURCHASE',
      label: 'PURCHASE',
      pages: [
        {
          label: 'accountingPurchaseSidebarPurchaseList',
          route: ROUTES.ACCOUNTING_PURCHASE_LIST,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_LIST_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY',
        },
        {
          label: 'accountingPurchaseSidebarExpenses',
          route: ROUTES.ACCOUNTING_PURCHASE_EXPENSE,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_EXPENSE_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_EXPENSES',
        },
        {
          label: 'accountingPurchaseSidebarDebitNote',
          route: ROUTES.ACCOUNTING_PURCHASE_DEBIT_NOTE,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_DEBIT_NOTE_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE',
        },
        {
          label: 'accountingPurchaseSidebarSupplierPayment',
          route: ROUTES.ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT,
          addRoute: ROUTES.ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT',
        },
      ],
      forms: [
        {
          label: 'accountingPurchaseSidebarPurchaseList',
          route: ROUTES.ACCOUNTING_PURCHASE_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_PURCHASE_ENTRY',
        },
        {
          label: 'accountingPurchaseSidebarExpenses',
          route: ROUTES.ACCOUNTING_PURCHASE_EXPENSE,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_EXPENSES',
        },
        {
          label: 'accountingPurchaseSidebarDebitNote',
          route: ROUTES.ACCOUNTING_PURCHASE_DEBIT_NOTE,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_DEBIT_NOTE',
        },
        {
          label: 'accountingPurchaseSidebarSupplierPayment',
          route: ROUTES.ACCOUNTING_PURCHASE_SUPPLIER_PAYMENT,
          aclKey: 'ACCOUNTING_SYSTEM_PURCHASE_SUPPLIER_PAYMENT',
        },
      ],
    },
    ACCOUNTING: {
      label: 'Accounting',
      aclKey: 'ACCOUNTING_ACCOUNTING',
      pages: [
        {
          label: 'accountingAccountingSidebarJournalVouchers',
          route: ROUTES.ACCOUNTING_JOURNAL_VOUCHER_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY',
          addRoute: ROUTES.ACCOUNTING_JOURNAL_VOUCHER_ADD,
        },
        {
          label: 'transServiceCenterTransfer',
          route: ROUTES.ACCOUNTING_INTER_SERVICE_TRANS_LIST,
          aclKey: 'CBS_TRANSFERS_SERVICE_CENTER_CASH_TRANSFER',
          addRoute: ROUTES.ACCOUNTING_INTER_SERVICE_TRANS_ADD,
        },
        {
          label: 'accountingAccountingSidebarCashTransfer',
          route: ROUTES.ACCOUNTING_CASH_TRANSFER_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_CASH_TRANSFER',
          addRoute: ROUTES.ACCOUNTING_CASH_TRANSFER_ADD,
        },
        {
          label: 'accountingAccountingSidebarBankAccounts',
          route: ROUTES.ACCOUNTING_BANK_ACCOUNTS_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS',
          addRoute: ROUTES.ACCOUNTING_BANK_ACCOUNTS_ADD,
        },
        {
          label: 'accountingAccountingSidebarChartsOfAccounts',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_CHARTS_OF_ACCOUNTS',
          route: ROUTES.ACCOUNTING_COA_LIST,
        },
      ],

      forms: [
        {
          label: 'accountingAccountingSidebarJournalVouchers',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_JOURNAL_ENTRY',
          route: ROUTES.ACCOUNTING_JOURNAL_VOUCHER_ADD,
        },

        {
          label: 'accountingAccountingSidebarBankAccounts',
          aclKey: 'ACCOUNTING_SYSTEM_ACCOUNTING_BANK_ACCOUNTS',
          route: ROUTES.ACCOUNTING_BANK_ACCOUNTS_ADD,
        },
        {
          label: 'transServiceCenterTransfer',
          aclKey: 'CBS_TRANSFERS_SERVICE_CENTER_CASH_TRANSFER',
          route: ROUTES.ACCOUNTING_INTER_SERVICE_TRANS_ADD,
        },
      ],
    },
    LOAN: {
      label: 'External Loan',
      aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN',
      pages: [
        {
          label: 'External Loans',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN',
          addRoute: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ADD,
        },
        {
          label: 'External Loan Accounts',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ACCOUNTS_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_ACCOUNTS',
          addRoute: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ACCOUNTS_ADD,
        },
        {
          label: 'External Loan Payment',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_LIST,
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_PAYMENTS',
          addRoute: ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_ADD,
        },
      ],
      forms: [
        {
          label: 'External Loans',
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ADD,
        },
        {
          label: 'External Loan Accounts',
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_ACCOUNTS',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_ACCOUNTS_ADD,
        },
        {
          label: 'External Loan Payment',
          aclKey: 'ACCOUNTING_SYSTEM_EXTERNAL_LOAN_PAYMENTS',
          route: ROUTES.ACCOUNTING_EXTERNAL_LOAN_PAYMENT_ADD,
        },
      ],
    },

    INVESTMENT: {
      label: 'Investments',
      aclKey: 'ACCOUNTING_INVESTMENT',
      forms: [
        {
          label: 'Investments',
          route: ROUTES.ACCOUNTING_INVESTMENT_LIST_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS',
        },
        {
          label: 'Investment Accounts',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNTS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS_ACCOUNTS',
        },
        {
          label: 'Investment Transaction',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENT_TRANSACTIONS',
        },
      ],
      pages: [
        {
          label: 'Investments',
          route: ROUTES.ACCOUNTING_INVESTMENT_LIST,
          addRoute: ROUTES.ACCOUNTING_INVESTMENT_LIST_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS',
        },
        {
          label: 'Investment Accounts',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNTS,
          addRoute: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNTS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENTS_ACCOUNTS',
        },
        {
          label: 'Investment Transaction',
          route: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD,
          addRoute: ROUTES.ACCOUNTING_INVESTMENT_ACCOUNT_TRANSACTIONS_ADD,
          aclKey: 'ACCOUNTING_SYSTEM_INVESTMENT_TRANSACTIONS',
        },
      ],
    },
    REPORTS: {
      label: 'REPORTS',
      aclKey: 'ACCOUNTING_INVESTMENT',
      pages: [
        {
          label: 'Accounting Reports',
          aclKey: 'ACCOUNTING_INVESTMENT',
          route: ROUTES.ACCOUNTING_REPORTS,
        },
      ],
    },
  },
};