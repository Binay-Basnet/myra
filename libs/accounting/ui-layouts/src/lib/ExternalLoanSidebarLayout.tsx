import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IExternalLoanSidebarLayoutProps {
  children: React.ReactNode;
}

const externalLoanSidebarColumns = [
  {
    title: 'External Loans',
    link: '/accounting/loan/external-loan/list',
    name: 'external-loan',
    addLink: '/accounting/loan/external-loan/new/add',
  },
  {
    title: 'External Loan Accounts',
    link: '/accounting/loan/external-loan-accounts/list',
    name: 'external-loan-accounts',
    addLink: '/accounting/loan/external-loan-accounts/new/add',
  },
  {
    title: 'External Loan Payment',
    link: '/accounting/loan/external-loan-payment/list',
    name: 'external-loan-payment',
    addLink: '/accounting/loan/external-loan-payment/new/add',
  },
];

const addButtoncolumns = [
  {
    title: 'External Loans',
    link: '/accounting/loan/external-loan/new/add',
  },
  {
    title: 'External Loan Accounts',
    link: '/accounting/loan/external-loan-accounts/new/add',
  },
  {
    title: 'External Loan Payment',
    link: '/accounting/loan/external-loan-payment/new/add',
  },
];

export const ExternalLoanSidebarLayout = ({ children }: IExternalLoanSidebarLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['accountingAccountingSidebarAccounting']}
      featureName="External Loan"
      featureLink="/accounting/loan/external-loan/list"
      mainButtonLabel={t['accountingAccountingSidebarCreate']}
      addButtonList={addButtoncolumns}
      tabColumns={externalLoanSidebarColumns}
      children={children}
    />
  );
};
