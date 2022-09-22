import React from 'react';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';

import { TabColumn } from '../tab/TabforMemberPage';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Loan Applications',
    link: '/loan',
    addLink: '/loan/add',
  },
];

export const LoanListLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="240px" p="s12" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Loan
        </Text>
        <Divider my="s16" />

        <Button
          display="flex"
          justifyContent="start"
          onClick={() => router.push('/loan/add')}
          w="100%"
          height="s40"
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
      <Box
        boxShadow="xl"
        width="calc(100% - 240px)"
        overflowX="hidden"
        position="relative"
        left="240px"
      >
        <Box bg="white" minHeight="calc(100vh - 110px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
