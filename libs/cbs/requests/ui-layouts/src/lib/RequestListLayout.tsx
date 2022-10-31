import React from 'react';
import { AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { TabColumn } from '@coop/myra/components';
import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'Member Request',
    link: '/requests/member',
  },
  {
    title: 'Chequebook Request',
    link: '/requests/cheque-book',
  },
  {
    title: 'Teller Transfer Request',
    link: '/requests/teller-transfer',
  },
  {
    title: 'Branch Transfer Request',
    link: '/requests/branch-transfer',
  },
  {
    title: 'Withdraw via Collector Request',
    link: '/requests/withdraw-via-collector',
  },
  {
    title: 'Loan Request',
    link: '/requests/loan',
  },

  {
    title: 'Block Cheque Request',
    link: '/requests/block-cheque',
  },
];

export const RequestListLayout = ({ children }: IAccountPageLayoutProps) => {
  const router = useRouter();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            Request
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
            New Request
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
            Request Settings
          </Button>
        </Box>
      </Box>
      <Box
        // boxShadow="xl"
        width="calc(100% - 260px)"
        marginLeft="260px"
      >
        <Box bg="white" minHeight="calc(100vh - 110px)">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
