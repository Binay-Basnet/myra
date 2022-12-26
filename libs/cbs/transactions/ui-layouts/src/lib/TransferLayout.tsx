import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

const transactionSidebarColumns = [
  {
    title: 'transferVaultTransfer',
    link: '/transfer/vault-transfer/list',
    name: 'vault-transfer',
    addLink: '/transfer/vault-transfer/add',
  },
  {
    title: 'transferTellerTransfer',
    link: '/transfer/teller-transfer/list',
    name: 'teller-transfer',
    addLink: '/transfer/teller-transfer/add',
  },
  // {
  //   title: 'transferBranchTransfer',
  //   link: '/transfer/branch-transfer',
  //   name: 'branch-transfer',
  //   // addLink: '/transactions/account-transfer/add',
  // },
];

const dropdownButtons = [
  {
    title: 'transferVaultTransfer',
    link: '/transfer/vault-transfer/add',
  },
  {
    title: 'transferTellerTransfer',
    link: '/transfer/teller-transfer/add',
  },
  // {
  //   label: 'transferBranchTransfer',
  //   link: '/transactions/account-transfer/add',
  // },
];

const reportColumn = [
  {
    label: 'transferVaultBalanceReport',
    navigate: '/reports/cbs/transactions/vault-balance/new',
  },
  {
    label: 'transferTellerReport',
    navigate: '/reports/cbs/transactions/teller/new',
  },
];

export const TransferLayout = ({ children }: ITransactionsSidebarLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName={t['corebankingSystems']}
      featureName={t['navbarTransfer']}
      featureLink="/transfer/vault-transfer/list"
      mainButtonLabel={t['newTransfer']}
      tabColumns={transactionSidebarColumns}
      addButtonList={dropdownButtons}
      children={children}
      reportButtons={reportColumn}
    />
  );
};
