import React from 'react';

import { Sidebar } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

const transactionSidebarColumns = [
  {
    title: 'transferVaultTransfer',
    link: ROUTES.CBS_TRANSFER_VAULT_LIST,
    name: 'vault-transfer',
    addLink: ROUTES.CBS_TRANSFER_VAULT_ADD,
  },
  {
    title: 'transferTellerTransfer',
    link: ROUTES.CBS_TRANSFER_TELLER_LIST,
    name: 'teller-transfer',
    addLink: ROUTES.CBS_TRANSFER_TELLER_ADD,
  },
  // {
  //   title: 'Service Center Cash Transfer',
  //   link: ROUTES.CBS_TRANSFER_CASH_TRANSFER_LIST,
  //   name: 'cash-transfer',
  //   addLink: ROUTES.CBS_TRANSFER_CASH_TRANSFER_ADD,
  // },
  {
    title: 'transferBranchTransfer',
    link: ROUTES.CBS_TRANSFER_BRANCH_TRANSFER_LIST,
    name: 'branch-transfer',
    addLink: ROUTES.CBS_TRANSFER_BRANCH_TRANSFER_ADD,
  },
];

const dropdownButtons = [
  {
    title: 'transferVaultTransfer',
    link: ROUTES.CBS_TRANSFER_VAULT_ADD,
  },
  {
    title: 'transferTellerTransfer',
    link: ROUTES.CBS_TRANSFER_TELLER_ADD,
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
      featureLink={ROUTES.CBS_TRANSFER_VAULT_LIST}
      mainButtonLabel={t['newTransfer']}
      tabColumns={transactionSidebarColumns}
      addButtonList={dropdownButtons}
      children={children}
      reportButtons={reportColumn}
    />
  );
};
