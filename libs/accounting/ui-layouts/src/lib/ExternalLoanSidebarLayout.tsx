import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { TabColumn } from '@coop/myra/components';
import {
  AddButtonList,
  Box,
  Button,
  Divider,
  Icon,
  PopOverComponentForButtonList,
  Text,
} from '@coop/shared/ui';

interface IExternalLoanSidebarLayoutProps {
  children: React.ReactNode;
}

const externalLoanSidebarColumns = [
  {
    title: 'External Loans',
    link: '/accounting/loan/external-loan/list',
    name: 'external-loan',
    addLink: '/accounting/loan/external-loan/new/add',
  },
  {
    title: 'External Loan Accounts',
    link: '/accounting/loan/external-loan-accounts/list',
    name: 'external-loan-accounts',
    addLink: '/accounting/loan/external-loan-accounts/new/add',
  },
  {
    title: 'Externa Loan Payment',
    link: '/accounting/loan/external-loan-payment/list',
    name: 'external-loan-payment',
    addLink: '/accounting/loan/external-loan-payment/new/add',
  },
];

const addButtoncolumns = [
  {
    title: 'External Loans',
    link: '/accounting/loan/external-loan/new/add',
  },
  {
    title: 'External Loan Accounts',
    link: '/accounting/loan/external-loan-accounts/new/add',
  },
  {
    title: 'Externa Loan Payment',
    link: '/accounting/loan/external-loan-payment/new/add',
  },
];

export const ExternalLoanSidebarLayout = ({ children }: IExternalLoanSidebarLayoutProps) => {
  const router = useRouter();

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="SemiBold" color="gray.800">
          External Loan
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
        <TabColumn list={externalLoanSidebarColumns} />
        <Divider my="s16" />
        <Button
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          External Loan
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        position="relative"
        left="275px"
        minH="calc(100vh - 110px)"
        bg="white"
      >
        {children}
      </Box>
    </Box>
  );
};
