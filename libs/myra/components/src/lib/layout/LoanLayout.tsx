import React from 'react';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { Box, Button, Divider, Icon, Text } from '@myra-ui';

import { TabColumn } from '../tab/TabforMemberPage';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Loan Applications',
    link: '/loan/applications',
    addLink: '/loan/apply',
  },
  {
    title: 'Loan Accounts',
    link: '/loan/accounts',
  },
  {
    title: 'Loan Repayment',
    link: '/loan/repayments',
  },
  {
    title: 'Loan Products',
    link: '/loan/products',
  },
  { title: 'Declined Loan', link: '/loan/declined' },
];

export const LoanListLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="50px" alignItems="center" display="flex" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            Loan
          </Text>
        </Box>
        <Box p="s16">
          <Button
            display="flex"
            justifyContent="start"
            onClick={() => router.push('/loan/apply')}
            w="100%"
            height="44px"
            leftIcon={<Icon as={AiOutlinePlus} size="md" color="white" />}
          >
            New Loan Application
          </Button>

          <Divider my="s16" />
          <TabColumn list={accountColumns} />
          <Divider my="s16" />
          <Button
            onClick={() => router.push('/settings/general/loan')}
            variant="ghost"
            color="#37474F"
            height="s48"
            width="full"
            justifyContent="start"
            leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
          >
            Loan Settings
          </Button>
        </Box>
      </Box>
      <Box
        // boxShadow="xl"
        width="calc(100% - 260px)"
        overflowX="hidden"
        position="relative"
        left="260px"
      >
        <Box bg="white" minHeight="calc(100vh - 110px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
