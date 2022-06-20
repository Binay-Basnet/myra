import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';

import { TabColumn } from '../tab/TabforMemberPage';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'accountList',
    link: '/accounts/list',
  },
  {
    title: 'accountReport',
    link: '/accounts/report',
  },
  {
    title: 'accountConsolidatedReport',
    link: '/accounts/consolidatedReport',
  },
  {
    title: 'accountCertificatePrint',
    link: '/accounts/certificate',
  },
];

export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Account
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => {
            router.push('/accounts/add-new-account');
          }}
        >
          New Account
        </Button>
        <Divider my="s16" />
        <TabColumn list={accountColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/settings/general/charts-of-accounts')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          Account Settings
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        overflowX="hidden"
        position="relative"
        left="275px"
      >
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
