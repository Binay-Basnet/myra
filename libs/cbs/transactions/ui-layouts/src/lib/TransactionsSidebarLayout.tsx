import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { TabColumn } from '@coop/myra/components';
import {
  Box,
  Button,
  Divider,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface ITransactionsSidebarLayoutProps {
  children: React.ReactNode;
}

const transactionSidebarColumns = [
  {
    title: 'transactionsSidebarDeposit',
    link: '/transactions/deposit/list',
    name: 'deposit',
    addLink: '/transactions/deposit/add',
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: '/transactions/withdraw/list',
    name: 'withdraw',
    addLink: '/transactions/withdraw/add',
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: '/transactions/account-transfer/list',
    name: 'account-transfer',
    addLink: '/transactions/account-transfer/add',
  },
  {
    title: 'transactionsSidebarLoanPayment',
    link: '/transactions/loan-payment/list',
    name: 'loan-payment',
    addLink: '/transactions/loan-payment/add',
  },
  {
    title: 'transactionsSidebarAgentList',
    link: '/transactions/agent/list',
    name: 'agent-list',
    // addLink: '/transactions/agent/add',
  },
  {
    title: 'transactionsSidebarAgentTransaction',
    link: '/transactions/agent-transaction/list',
    name: 'agent-transaction',
    addLink: '/transactions/agent-transaction/add',
  },
];

const dropdownButtons = [
  {
    label: 'transactionSidebarNewDeposit',
    link: '/transactions/deposit/add',
  },
  {
    label: 'transactionSidebarNewWithdraw',
    link: '/transactions/withdraw/add',
  },
  {
    label: 'transactionSidebarNewAccountTransfer',
    link: '/transactions/account-transfer/add',
  },
  {
    label: 'transactionSidebarNewLoanPayment',
    link: '/transactions/loan-payment/add',
  },
  // {
  //   label: 'New Agent',
  //   link: '/transactions/agent/add',
  // },
  {
    label: 'transactionSidebarNewMarketRepresentativeTransaction',
    link: '/transactions/agent-transaction/add',
  },
];

export const TransactionsSidebarLayout = ({ children }: ITransactionsSidebarLayoutProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['transactionSidebarTransaction']}
        </Text>
        <Divider my="s16" />

        <Popover placement="bottom-start" gutter={3}>
          <PopoverTrigger>
            <Button width="full" size="lg" justifyContent="start" leftIcon={<AddIcon />}>
              {t['transactionSidebarNewTransaction']}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            // bg="gray.0"
            p={0}
            w="225px"
            _focus={{
              boxShadow: 'none',
            }}
          >
            <PopoverBody p={0}>
              <Box>
                {dropdownButtons.map((addButton) => (
                  <Box
                    px="s16"
                    py="s10"
                    width="100%"
                    display="flex"
                    alignItems="center"
                    _hover={{ bg: 'gray.100' }}
                    cursor="pointer"
                    onClick={() => router.push(addButton.link)}
                    key={addButton.link}
                  >
                    <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                    <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                      {t[addButton.label]}
                    </Text>
                  </Box>
                ))}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Divider my="s16" />
        <TabColumn list={transactionSidebarColumns} />
        <Divider my="s16" />
        <Button
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['transactionSidebarTransactionSettings']}
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
