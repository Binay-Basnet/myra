import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface IPurchaseLayoutProps {
  children: React.ReactNode;
}

const purchaseColumns = [
  {
    title: 'accountingPurchaseSidebarPurchaseList',
    link: '/accounting/purchase/list',
    addLink: '/accounting/purchase/add',
  },
  {
    title: 'accountingPurchaseSidebarExpenses',
    link: '/accounting/purchase/expenses/list',
    addLink: '/accounting/purchase/expenses/add',
  },
  {
    title: 'accountingPurchaseSidebarDebitNote',
    link: '/accounting/purchase/debit-note/list',
    addLink: '/accounting/purchase/debit-note/add',
  },
  {
    title: 'accountingPurchaseSidebarSupplierPayment',
    link: '/accounting/purchase/supplier-payment/list',
    addLink: '/accounting/purchase/supplier-payment/add',
  },
];
const addButtonColumns = [
  {
    title: 'accountingPurchaseSidebarPurchaseList',
    link: '/accounting/purchase/add',
  },
  {
    title: 'accountingPurchaseSidebarExpenses',
    link: '/accounting/purchase/expenses/add',
  },
  {
    title: 'accountingPurchaseSidebarDebitNote',
    link: '/accounting/purchase/debit-note/add',
  },
  {
    title: 'accountingPurchaseSidebarSupplierPayment',
    link: '/accounting/purchase/supplier-payment/add',
  },
];

export const PurchaseLayout = ({ children }: IPurchaseLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Sidebar
      applicationName="Accounting"
      featureName={t['accountingPurchaseSidebarPurchase']}
      featureLink="/accounting/purchase/list"
      mainButtonLabel={t['accountingPurchaseSidebarCreate']}
      addButtonList={addButtonColumns}
      tabColumns={purchaseColumns}
      children={children}
    />
  );
};
