import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Loan Applications',
    link: '/loan/applications',
    addLink: '/loan/apply',
  },
  {
    title: 'Loan Accounts',
    link: '/loan/accounts',
  },
  {
    title: 'Loan Repayment',
    link: '/loan/repayments',
    addLink: '/loan/repayments/add',
  },
  {
    title: 'Loan Products',
    link: '/loan/products',
  },
  { title: 'Declined Loan', link: '/loan/declined' },
];
const addButtoncolumns = [
  {
    title: 'New Loan Application',
    link: '/loan/apply',
  },
  {
    title: 'Loan Repayment',
    link: '/loan/repayments/add',
  },
];

const settingsColumn = [
  {
    label: 'loanLayoutSettings',
    navigate: '/settings/general/loan',
  },
  {
    label: 'loanLayoutProductsSettings',
    navigate: '/settings/general/loan-products',
  },
];

const reportColumn = [
  {
    label: 'loanLayoutStatementReport',
    navigate: '/reports/cbs/loan/statement/new',
  },
  {
    label: 'loanLayoutAgeingReport',
    navigate: '/reports/cbs/loan/ageing/new',
  },
];

export const LoanListLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName={t['kymIndFinancialLoan']}
      featureLink="/loan/applications"
      mainButtonLabel={t['loanLayoutTopButton']}
      tabColumns={accountColumns}
      addButtonList={addButtoncolumns}
      children={children}
      settingButtons={settingsColumn}
      reportButtons={reportColumn}
    />
  );
};
