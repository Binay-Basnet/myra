import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IAccountingSidebarLayoutProps {
  children: React.ReactNode;
}

const accountingSidebarColumns = [
  {
    title: 'accountingAccountingSidebarJournalVouchers',
    link: '/accounting/accounting/journal-vouchers/list',
    name: 'journal-vouchers',
    addLink: '/accounting/accounting/journal-vouchers/add',
  },
  {
    title: 'accountingAccountingSidebarCashTransfer',
    link: '/accounting/accounting/cash-transfer/list',
    name: 'cash-transfer',
    addLink: '/accounting/accounting/cash-transfer/add',
  },
  // {
  //   title: 'accountingAccountingSidebarQuickPayment',
  //   link: '/accounting/accounting/quick-payment/list',
  //   name: 'quick-payment',
  //   addLink: '/accounting/accounting/quick-payment/add',
  // },
  // {
  //   title: 'accountingAccountingSidebarQuickReceipt',
  //   link: '/accounting/accounting/quick-receipt/list',
  //   name: 'quick-receipt',
  //   addLink: '/accounting/accounting/quick-receipt/add',
  // },
  {
    title: 'accountingAccountingSidebarBankAccounts',
    link: '/accounting/accounting/bank-accounts/list',
    name: 'bank-accounts',
    addLink: '/accounting/accounting/bank-accounts/add',
  },
  {
    title: 'accountingAccountingSidebarChartsOfAccounts',
    link: '/accounting/accounting/charts-of-account',
    name: 'charts-of-account',
  },
];

export const AccountingSidebarLayout = ({ children }: IAccountingSidebarLayoutProps) => {
  const { t } = useTranslation();

  const addButtoncolumns = [
    {
      title: t['accountingAccountingSidebarJournalVouchers'],
      link: '/accounting/accounting/journal-vouchers/add',
    },
    {
      title: t['accountingAccountingSidebarCashTransfer'],
      link: '/accounting/accounting/cash-transfer/add',
    },
    // {
    //   title: t['accountingAccountingSidebarQuickPayment'],
    //   link: '/accounting/accounting/quick-payment/add',
    // },

    // {
    //   title: t['accountingAccountingSidebarQuickReceipt'],
    //   link: '/accounting/accounting/quick-receipt/add',
    // },
    {
      title: t['accountingAccountingSidebarBankAccounts'],
      link: '/accounting/accounting/bank-accounts/add',
    },
    {
      title: t['accountingAccountingSidebarChartsOfAccounts'],
      link: '/accounting/accounting/charts-of-accounts',
    },
  ];

  return (
    <Sidebar
      applicationName={t['accountingAccountingSidebarAccounting']}
      featureName={t['accountingAccountingSidebarAccounting']}
      featureLink="/accounting/accounting/journal-vouchers/list"
      mainButtonLabel={t['accountingAccountingSidebarCreate']}
      addButtonList={addButtoncolumns}
      tabColumns={accountingSidebarColumns}
      children={children}
    />
  );
};
