import React from 'react';

import { Sidebar } from '@myra-ui';

import { Id_Type } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'accountList',
    link: '/savings/list',
    addLinkId: '/savings/account-open',
    idType: Id_Type?.Account,
  },
  {
    title: 'transactionsSidebarDeposit',
    link: '/savings/deposit/list',
    name: 'deposit',
    addLink: '/savings/deposit/add',
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: '/savings/withdraw/list',
    name: 'withdraw',
    addLink: '/savings/withdraw/add',
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: '/savings/account-transfer/list',
    name: 'account-transfer',
    addLink: '/savings/account-transfer/add',
  },
  {
    title: 'savingProducts',
    link: '/savings/products',
  },
  {
    title: 'accountClose',
    link: '/savings/account-close',
    addLinkId: '/savings/account-close',
    idType: Id_Type?.Account,
  },
];

const addButtoncolumns = [
  {
    title: 'newAccountOpen',
    linkId: '/savings/account-open',
  },
  {
    title: 'accountClose',
    linkId: '/savings/account-close',
  },
];

const settingsColumn = [
  {
    label: 'savingsDepositSettings',
    navigate: '/settings/general/deposit/tds',
  },
  {
    label: 'savingsProductSettings',
    navigate: '/settings/general/deposit-products',
  },
];

const reportColumn = [
  {
    label: 'savingsDepositStatementReport',
    navigate: '/reports/cbs/savings/statement/new',
  },
  {
    label: 'savingsIntrestTaxReport',
    navigate: '/reports/cbs/savings/interest-tax/new',
  },
  {
    label: 'savingsIntrestStatement',
    navigate: '/reports/cbs/savings/interest-statement/new',
  },
];
export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName={t['savings']}
      featureLink="/savings/list"
      mainButtonLabel={t['accountLayoutNewAccount']}
      idType={Id_Type.Account}
      tabColumns={accountColumns}
      addButtonList={addButtoncolumns}
      children={children}
      settingButtons={settingsColumn}
      reportButtons={reportColumn}
    />
  );
};
