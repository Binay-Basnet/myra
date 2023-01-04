import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Loan Applications',
    link: ROUTES.CBS_LOAN_APPLICATIONS_LIST,
    addLink: ROUTES.CBS_LOAN_APPLICATIONS_ADD,
  },
  {
    title: 'Loan Accounts',
    link: ROUTES.CBS_LOAN_ACCOUNTS_LIST,
  },
  {
    title: 'Loan Repayment',
    link: ROUTES.CBS_LOAN_REPAYMENTS_LIST,
    addLink: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
  },
  {
    title: 'Loan Products',
    link: ROUTES.CBS_LOAN_PRODUCTS_LIST,
  },
  { title: 'Declined Loan', link: ROUTES.CBS_LOAN_DECLINED_LIST },
];
const addButtoncolumns = [
  {
    title: 'New Loan Application',
    link: ROUTES.CBS_LOAN_APPLICATIONS_ADD,
  },
  {
    title: 'Loan Repayment',
    link: ROUTES.CBS_LOAN_REPAYMENTS_ADD,
  },
];

const settingsColumn = [
  {
    label: 'loanLayoutSettings',
    navigate: ROUTES.SETTINGS_GENERAL_LOAN,
  },
  {
    label: 'loanLayoutProductsSettings',
    navigate: ROUTES.SETTINGS_GENERAL_LP_LIST,
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
      featureLink={ROUTES.CBS_LOAN_APPLICATIONS_LIST}
      mainButtonLabel={t['loanLayoutTopButton']}
      tabColumns={accountColumns}
      addButtonList={addButtoncolumns}
      children={children}
      settingButtons={settingsColumn}
      reportButtons={reportColumn}
    />
  );
};
