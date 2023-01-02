import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

const transactionSidebarColumns = [
  {
    title: 'transactionsSidebarDeposit',
    link: '/cbs/transactions/deposit/list',
    name: 'deposit',
    addLink: '/cbs/transactions/deposit/add',
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: '/cbs/transactions/withdraw/list',
    name: 'withdraw',
    addLink: '/cbs/transactions/withdraw/add',
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: '/cbs/transactions/account-transfer/list',
    name: 'account-transfer',
    addLink: '/cbs/transactions/account-transfer/add',
  },
  {
    title: 'transactionsSidebarLoanPayment',
    link: '/cbs/transactions/loan-payment/list',
    name: 'loan-payment',
    addLink: '/cbs/transactions/loan-payment/add',
  },
  {
    title: 'transactionsSidebarAgentTransaction',
    link: '/cbs/transactions/market-representative-transaction/list',
    name: 'agent-transaction',
    addLink: '/cbs/transactions/market-representative-transaction/add',
  },
  {
    title: 'transactionsSidebarAgentList',
    link: '/cbs/transactions/market-representative/list',
    name: 'agent-list',
    // addLink: '/cbs/transactions/agent/add',
  },
  {
    title: 'transactionsSidebarJournalVoucher',
    link: '/cbs/transactions/journal-vouchers/list',
    name: 'journal-voucher',
    addLink: '/cbs/transactions/journal-vouchers/add',
  },
  {
    title: 'transactionsSidebarAllTransactions',
    link: '/cbs/transactions/all-transactions/list',
    name: 'all-transactions',
  },
];

const dropdownButtons = [
  {
    title: 'transactionSidebarNewDeposit',
    link: '/cbs/transactions/deposit/add',
  },
  {
    title: 'transactionSidebarNewWithdraw',
    link: '/cbs/transactions/withdraw/add',
  },
  {
    title: 'transactionSidebarNewAccountTransfer',
    link: '/cbs/transactions/account-transfer/add',
  },
  {
    title: 'transactionSidebarNewLoanPayment',
    link: '/cbs/loan/repayments/add',
  },
  // {
  //   title: 'New Agent',
  //   link: '/cbs/transactions/agent/add',
  // },
  {
    title: 'transactionSidebarNewMarketRepresentativeTransaction',
    link: '/cbs/transactions/market-representative-transaction/add',
  },
  {
    title: 'New Journal Voucher',
    link: '/cbs/transactions/journal-vouchers/add',
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
      featureLink="/transactions/deposit/list"
      mainButtonLabel={t['transactionSidebarNewTransaction']}
      tabColumns={transactionSidebarColumns}
      addButtonList={dropdownButtons}
      children={children}
      reportButtons={reportColumn}
    />
  );
};
