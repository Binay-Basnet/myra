import React from 'react';

import { Sidebar } from '@myra-ui';

import { Id_Type } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'accountList',
    link: ROUTES.CBS_ACCOUNT_LIST,
    name: 'account-open',
    addLink: ROUTES.CBS_ACCOUNT_OPEN_ADD,
  },
  {
    title: 'transactionsSidebarDeposit',
    link: ROUTES.CBS_ACCOUNT_DEPOSIT_LIST,
    name: 'deposit',
    addLink: ROUTES.CBS_ACCOUNT_DEPOSIT_ADD,
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: ROUTES.CBS_ACCOUNT_WITHDRAW_LIST,
    name: 'withdraw',
    addLink: ROUTES.CBS_ACCOUNT_WITHDRAW_ADD,
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: ROUTES.CBS_ACCOUNT_TRANSFER_LIST,
    name: 'account-transfer',
    addLink: ROUTES.CBS_ACCOUNT_TRANSFER_ADD,
  },
  {
    title: 'savingProducts',
    link: ROUTES.CBS_ACCOUNT_SAVING_PRODUCT,
  },
  {
    title: 'accountClose',
    link: ROUTES.CBS_ACCOUNT_CLOSE_LIST,
    addLink: ROUTES.CBS_ACCOUNT_CLOSE_ADD,
  },
];

const addButtoncolumns = [
  {
    title: 'newAccountOpen',
    link: ROUTES.CBS_ACCOUNT_OPEN_ADD,
  },
  {
    title: 'accountClose',
    link: ROUTES.CBS_ACCOUNT_CLOSE_ADD,
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
      featureLink={ROUTES.CBS_ACCOUNT_LIST}
      hasActionURL
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
