import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import {
  AddButtonList,
  Box,
  Button,
  Divider,
  Icon,
  PopOverComponentForButtonList,
  Text,
} from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

interface IAccountingSidebarLayoutProps {
  children: React.ReactNode;
}

const accountingSidebarColumns = [
  {
    title: 'accountingAccountingSidebarJournalVouchers',
    link: '/accounting/accounting/journal-vouchers/list',
    name: 'journal-vouchers',
    addLink: '/accounting/accounting/journal-vouchers/add',
  },
  {
    title: 'accountingAccountingSidebarCashTransfer',
    link: '/accounting/accounting/cash-transfer/list',
    name: 'cash-transfer',
    addLink: '/accounting/accounting/cash-transfer/add',
  },
  // {
  //   title: 'accountingAccountingSidebarQuickPayment',
  //   link: '/accounting/accounting/quick-payment/list',
  //   name: 'quick-payment',
  //   addLink: '/accounting/accounting/quick-payment/add',
  // },
  // {
  //   title: 'accountingAccountingSidebarQuickReceipt',
  //   link: '/accounting/accounting/quick-receipt/list',
  //   name: 'quick-receipt',
  //   addLink: '/accounting/accounting/quick-receipt/add',
  // },
  {
    title: 'accountingAccountingSidebarBankAccounts',
    link: '/accounting/accounting/bank-accounts/list',
    name: 'bank-accounts',
    addLink: '/accounting/accounting/bank-accounts/add',
  },
  {
    title: 'accountingAccountingSidebarChartsOfAccounts',
    link: '/accounting/accounting/charts-of-account/list',
    name: 'charts-of-account',
    addLink: '/accounting/accounting/charts-of-accounts/add',
  },
];

export const AccountingSidebarLayout = ({ children }: IAccountingSidebarLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const addButtoncolumns = [
    {
      title: t['accountingAccountingSidebarJournalVouchers'],
      link: '/accounting/accounting/journal-vouchers/add',
    },
    {
      title: t['accountingAccountingSidebarCashTransfer'],
      link: '/accounting/accounting/cash-transfer/add',
    },
    // {
    //   title: t['accountingAccountingSidebarQuickPayment'],
    //   link: '/accounting/accounting/quick-payment/add',
    // },

    // {
    //   title: t['accountingAccountingSidebarQuickReceipt'],
    //   link: '/accounting/accounting/quick-receipt/add',
    // },
    {
      title: t['accountingAccountingSidebarBankAccounts'],
      link: '/accounting/accounting/bank-accounts/add',
    },
    {
      title: t['accountingAccountingSidebarChartsOfAccounts'],
      link: '/accounting/accounting/charts-of-accounts/add',
    },
  ];

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountingAccountingSidebarAccounting']}
        </Text>
        <Divider my="s16" />

        <PopOverComponentForButtonList buttonLabel="accountingAccountingSidebarCreate">
          {addButtoncolumns.map((item) => (
            <Box key={item?.title}>
              <AddButtonList label={item?.title} onClick={() => router.push(`${item.link}`)} />
            </Box>
          ))}
        </PopOverComponentForButtonList>

        <Divider my="s16" />
        <TabColumn list={accountingSidebarColumns} />
        <Divider my="s16" />
        <Button
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['accountingAccountingSiderbarAccountingSettings']}
        </Button>
      </Box>
      <Box width="calc(100% - 275px)" position="relative" left="275px" minH="calc(100vh - 110px)">
        {children}
      </Box>
    </Box>
  );
};
