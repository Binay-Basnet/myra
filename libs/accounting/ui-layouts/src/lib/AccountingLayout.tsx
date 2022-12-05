import React from 'react';
import { AiOutlineAppstore } from 'react-icons/ai';
import { ImStack } from 'react-icons/im';
import { IoIosList } from 'react-icons/io';
import { IoCubeOutline, IoPerson } from 'react-icons/io5';
import { Box } from '@chakra-ui/react';

import { TabMenu, TopLevelHeader } from '@myra-ui';

export interface AccountingLayoutProps {
  children: React.ReactNode;
}

export const AccountingLayout = (props: AccountingLayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <TabMenu
          tabs={[
            {
              title: 'sales',
              icon: AiOutlineAppstore,
              link: '/accounting/sales/list',
              match: ['sales'],
            },
            {
              title: 'purchase',
              icon: IoPerson,
              link: '/accounting/purchase/list',
              match: ['purchase'],
            },
            {
              title: 'accounting',
              icon: IoCubeOutline,
              link: '/accounting/accounting/journal-vouchers/list',
              match: ['accounting'],
            },
            {
              title: 'loan',
              icon: ImStack,
              link: '/accounting/loan/external-loan/list',
              match: ['loan'],
            },

            {
              title: 'investment',
              icon: IoIosList,
              link: '/accounting/investment/list',
              match: ['investment'],
            },
          ]}
          app="Accounting"
          routeIndex={2}
        />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default AccountingLayout;
