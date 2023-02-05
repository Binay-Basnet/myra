import React from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { BsFileText } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoPerson } from 'react-icons/io5';

import { MainLayoutContainer, Scrollable, TabMenu, TopLevelHeader } from '@myra-ui';

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
            icon: AiOutlineAppstore,
            link: '/accounting/sales/list',
            match: ['sales'],
            aclKey: 'ACCOUNTING_SALES',
            navMenu: 'SALES',
          },
          {
            title: 'purchase',
            icon: IoPerson,
            link: '/accounting/purchase/list',
            match: ['purchase'],
            aclKey: 'ACCOUNTING_PURCHASE',
            navMenu: 'PURCHASE',
          },
          {
            title: 'accounting',
            icon: IoCubeOutline,
            link: '/accounting/accounting/journal-vouchers/list',
            match: ['accounting'],
            aclKey: 'ACCOUNTING_ACCOUNTING',
            navMenu: 'ACCOUNTING',
          },
          {
            title: 'loan',
            icon: ImStack,
            link: '/accounting/loan/external-loan/list',
            match: ['loan'],
            aclKey: 'ACCOUNTING_LOAN',
            navMenu: 'LOAN',
          },

          {
            title: 'investment',
            icon: IoIosList,
            link: '/accounting/investment/list',
            match: ['investment'],
            aclKey: 'ACCOUNTING_INVESTMENT',
            navMenu: 'INVESTMENT',
          },
          {
            title: 'reports',
            icon: BsFileText,
            link: ROUTES.ACCOUNTING_REPORTS,
            match: ['reports'],
            aclKey: 'ACCOUNTING_INVESTMENT',
            navMenu: 'REPORTS',
          },
        ]}
        routeIndex={2}
      />
      <Scrollable>{children}</Scrollable>
    </MainLayoutContainer>
  );
};

export default AccountingLayout;
