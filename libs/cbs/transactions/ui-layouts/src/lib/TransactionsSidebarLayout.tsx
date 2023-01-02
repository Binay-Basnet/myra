import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

const transactionSidebarColumns = [
  {
    title: 'transactionsSidebarDeposit',
    link: ROUTES.CBS_TRANS_DEPOSIT_LIST,
    name: 'deposit',
    addLink: ROUTES.CBS_TRANS_DEPOSIT_ADD,
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: ROUTES.CBS_TRANS_WITHDRAW_LIST,
    name: 'withdraw',
    addLink: ROUTES.CBS_TRANS_WITHDRAW_ADD,
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_LIST,
    name: 'account-transfer',
    addLink: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD,
  },
  {
    title: 'transactionsSidebarLoanPayment',
    link: ROUTES.CBS_TRANS_LOAN_PAYMENT_LIST,
    name: 'loan-payment',
    addLink: ROUTES.CBS_TRANS_LOAN_PAYMENT_ADD,
  },
  {
    title: 'transactionsSidebarAgentTransaction',
    link: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_LIST,
    name: 'agent-transaction',
    addLink: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD,
  },
  {
    title: 'transactionsSidebarAgentList',
    link: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_LIST,
    name: 'agent-list',
    // addLink: '/cbs/transactions/agent/add',
  },
  {
    title: 'transactionsSidebarJournalVoucher',
    link: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_LIST,
    name: 'journal-voucher',
    addLink: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD,
  },
  {
    title: 'transactionsSidebarAllTransactions',
    link: ROUTES.CBS_TRANS_ALL_TRANSACTION_LIST,
    name: 'all-transactions',
  },
];

const dropdownButtons = [
  {
    title: 'transactionSidebarNewDeposit',
    link: ROUTES.CBS_TRANS_DEPOSIT_ADD,
  },
  {
    title: 'transactionSidebarNewWithdraw',
    link: ROUTES.CBS_TRANS_WITHDRAW_ADD,
  },
  {
    title: 'transactionSidebarNewAccountTransfer',
    link: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD,
  },
  {
    title: 'transactionSidebarNewLoanPayment',
    link: ROUTES.CBS_TRANS_LOAN_PAYMENT_ADD,
  },
  // {
  //   title: 'New Agent',
  //   link: '/cbs/transactions/agent/add',
  // },
  {
    title: 'transactionSidebarNewMarketRepresentativeTransaction',
    link: ROUTES.CBS_TRANS_MARKET_REPRESENTATIVE_TRANS_ADD,
  },
  {
    title: 'New Journal Voucher',
    link: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_ADD,
  },
];

const reportColumn = [
  {
    label: 'transactionLayoutBalanceSheet',
    navigate: '/cbs/reports/cbs/transactions/trial-sheet/new',
  },
  // {
  //   label: 'transactionLayoutIncomeStatement',
  //   navigate: '/cbs/settings/general/members/kym-individual',
  // },
  {
    label: 'transactionLayoutCashFlowStament',
    navigate: '/cbs/reports/cbs/transactions/cash-ledger/new',
  },
  // {
  //   label: 'transactionLayoutChangeOfEquity',
  //   navigate: '/cbs/settings/general/members/kym-individual',
  // },
  // {
  //   label: 'transactionLayoutAppropriationOfProfit',
  //   navigate: '/cbs/settings/general/members/kym-individual',
  // },
  // {
  //   label: 'transactionLayoutBankGLBalance',
  //   navigate: '/cbs/settings/general/members/kym-individual',
  // },
  {
    label: 'transactionLayoutBankGLStatement',
    navigate: '/cbs/reports/cbs/transactions/bank-gl-statement/new',
  },
];

export const TransactionsSidebarLayout = ({ children }: ITransactionsSidebarLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName={t['transactions']}
      featureLink={ROUTES.CBS_TRANS_DEPOSIT_LIST}
      mainButtonLabel={t['transactionSidebarNewTransaction']}
      tabColumns={transactionSidebarColumns}
      addButtonList={dropdownButtons}
      children={children}
      reportButtons={reportColumn}
    />
  );
};
