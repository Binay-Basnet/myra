import React from 'react';

import { Sidebar } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

interface ISalesLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'accountingSalesSalesEntry',
    link: '/accounting/sales/list',
    addLinkId: '/accounting/sales',
  },
  {
    title: 'creditNote',
    link: '/accounting/sales/credit-note/list',
    addLinkId: '/accounting/sales/credit-note',
  },
  {
    title: 'customerPayment',
    link: '/accounting/sales/customer-payment/list',
    addLinkId: '/accounting/sales/customer-payment',
  },
  {
    title: 'accountingSalesCustomers',
    link: '/accounting/sales/customer/list',
    addLinkId: '/accounting/sales/customer',
  },
];

export const SalesLayout = ({ children }: ISalesLayoutProps) => {
  const { t } = useTranslation();

  const dropdownButtons = [
    {
      title: t['accountingSalesSalesEntry'],
      linkId: '/accounting/sales/add',
    },
    {
      title: t['creditNote'],
      linkId: '/accounting/sales/credit-note/add',
    },
    {
      title: t['customerPayment'],
      linkId: '/accounting/sales/customer-payment/add',
    },
    {
      title: t['accountingSalesCustomers'],
      linkId: '/accounting/sales/customer/add',
    },
  ];

  return (
    <Sidebar
      applicationName="Accounting"
      featureName={t['accountingsales']}
      featureLink="/accounting/sales/list"
      mainButtonLabel={t['accountingPurchaseSidebarCreate']}
      addButtonList={dropdownButtons}
      tabColumns={inventoryColumns}
      children={children}
    />
  );
};
