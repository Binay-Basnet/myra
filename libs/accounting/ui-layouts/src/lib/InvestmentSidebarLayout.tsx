import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IInvestmentSidebarLayoutProps {
  children: React.ReactNode;
}

const investmentSidebarColumns = [
  {
    title: 'Investments',
    link: '/accounting/investment/list',
    name: 'investment-list',
    addLinkId: '/accounting/investment',
  },
  {
    title: 'Investment Accounts',
    link: '/accounting/investment/investment-account/list',
    name: 'investment-account-list',
    addLinkId: '/accounting/investment/investment-account',
  },
  {
    title: 'Investment Transaction',
    link: '/accounting/investment/investment-transaction/list',
    name: 'investment-transaction-list',
    addLink: '/accounting/investment/investment-transaction/add',
  },
];

const dropdownButtons = [
  {
    title: 'Investment',
    linkId: '/accounting/investment/add',
  },
  {
    title: 'Investment Account',
    linkId: '/accounting/investment/investment-account/add',
  },
  {
    title: 'Investment Transaction',
    link: '/accounting/investment/investment-transaction/add',
  },
];

export const InvestmentSidebarLayout = ({ children }: IInvestmentSidebarLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['accountingAccountingSidebarAccounting']}
      featureName=" Investment"
      featureLink="/accounting/investment/list"
      mainButtonLabel={t['accountingAccountingSidebarCreate']}
      addButtonList={dropdownButtons}
      tabColumns={investmentSidebarColumns}
      children={children}
    />
  );
};
