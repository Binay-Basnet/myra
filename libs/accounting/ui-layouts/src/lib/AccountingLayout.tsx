import React from 'react';
import {
  FiCodesandbox,
  FiDatabase,
  FiFileText,
  FiPackage,
  FiPieChart,
  FiShoppingBag,
  FiShoppingCart,
} from 'react-icons/fi';

import { MainLayoutContainer, TabMenu, TopLevelHeader } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

export interface AccountingLayoutProps {
  children: React.ReactNode;
}

export const AccountingLayout = (props: AccountingLayoutProps) => {
  const { children } = props;
  return (
    <MainLayoutContainer>
      <TopLevelHeader />
      <TabMenu
        module="ACCOUNTING"
        tabs={[
          {
            title: 'sales',
            icon: FiShoppingBag,
            link: '/accounting/sales/list',
            match: ['sales'],
            aclKey: 'ACCOUNTING_SALES',
            navMenu: 'SALES',
          },
          {
            title: 'purchase',
            icon: FiShoppingCart,
            link: '/accounting/purchase/list',
            match: ['purchase'],
            aclKey: 'ACCOUNTING_PURCHASE',
            navMenu: 'PURCHASE',
          },
          {
            title: 'inventory',
            icon: FiPackage,
            link: '/accounting/inventory/items/list',
            match: ['inventory'],
            aclKey: 'ACCOUNTING_ACCOUNTING',
            navMenu: 'INVENTORY',
          },
          {
            title: 'accounting',
            icon: FiDatabase,
            link: '/accounting/accounting/journal-vouchers/list',
            match: ['accounting'],
            aclKey: 'ACCOUNTING_ACCOUNTING',
            navMenu: 'ACCOUNTING',
          },
          {
            title: 'loan',
            icon: FiCodesandbox,
            link: '/accounting/loan/external-loan/list',
            match: ['loan'],
            aclKey: 'ACCOUNTING_LOAN',
            navMenu: 'LOAN',
          },

          {
            title: 'investment',
            icon: FiPieChart,
            link: '/accounting/investment/list',
            match: ['investment'],
            aclKey: 'ACCOUNTING_INVESTMENT',
            navMenu: 'INVESTMENT',
          },
          {
            title: 'reports',
            icon: FiFileText,
            link: ROUTES.ACCOUNTING_REPORTS,
            match: ['reports'],
            aclKey: 'ACCOUNTING_INVESTMENT',
            navMenu: 'REPORTS',
          },
        ]}
        routeIndex={2}
      />
      {children}
    </MainLayoutContainer>
  );
};

export default AccountingLayout;
