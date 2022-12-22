import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

const transactionSidebarColumns = [
  {
    title: 'transactionsSidebarDeposit',
    link: '/transactions/deposit/list',
    name: 'deposit',
    addLink: '/transactions/deposit/add',
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: '/transactions/withdraw/list',
    name: 'withdraw',
    addLink: '/transactions/withdraw/add',
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: '/transactions/account-transfer/list',
    name: 'account-transfer',
    addLink: '/transactions/account-transfer/add',
  },
  {
    title: 'transactionsSidebarLoanPayment',
    link: '/transactions/loan-payment/list',
    name: 'loan-payment',
    addLink: '/transactions/loan-payment/add',
  },
  {
    title: 'transactionsSidebarAgentTransaction',
    link: '/transactions/market-representative-transaction/list',
    name: 'agent-transaction',
    addLink: '/transactions/market-representative-transaction/add',
  },
  {
    title: 'transactionsSidebarAgentList',
    link: '/transactions/market-representative/list',
    name: 'agent-list',
    // addLink: '/transactions/agent/add',
  },
  {
    title: 'transactionsSidebarJournalVoucher',
    link: '/transactions/journal-vouchers/list',
    name: 'journal-voucher',
    addLink: '/transactions/journal-vouchers/add',
  },
  {
    title: 'transactionsSidebarAllTransactions',
    link: '/transactions/all-transactions/list',
    name: 'all-transactions',
  },
];

const dropdownButtons = [
  {
    title: 'transactionSidebarNewDeposit',
    link: '/transactions/deposit/add',
  },
  {
    title: 'transactionSidebarNewWithdraw',
    link: '/transactions/withdraw/add',
  },
  {
    title: 'transactionSidebarNewAccountTransfer',
    link: '/transactions/account-transfer/add',
  },
  {
    title: 'transactionSidebarNewLoanPayment',
    link: '/loan/repayments/add',
  },
  // {
  //   title: 'New Agent',
  //   link: '/transactions/agent/add',
  // },
  {
    title: 'transactionSidebarNewMarketRepresentativeTransaction',
    link: '/transactions/market-representative-transaction/add',
  },
  {
    title: 'New Journal Voucher',
    link: '/transactions/journal-vouchers/add',
  },
];

const reportColumn = [
  {
    label: 'transactionLayoutBalanceSheet',
    navigate: '/reports/cbs/transactions/trial-sheet/new',
  },
  // {
  //   label: 'transactionLayoutIncomeStatement',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  {
    label: 'transactionLayoutCashFlowStament',
    navigate: '/reports/cbs/transactions/cash-ledger/new',
  },
  // {
  //   label: 'transactionLayoutChangeOfEquity',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  // {
  //   label: 'transactionLayoutAppropriationOfProfit',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  // {
  //   label: 'transactionLayoutBankGLBalance',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  {
    label: 'transactionLayoutBankGLStatement',
    navigate: '/reports/cbs/transactions/bank-gl-statement/new',
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
