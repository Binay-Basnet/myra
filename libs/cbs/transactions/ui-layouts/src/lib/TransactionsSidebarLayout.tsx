import React from 'react';
import { CgLoadbarDoc } from 'react-icons/cg';
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
  SettingsButton,
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
    addLink: '/loan/repayments/add',
  },
  {
    title: 'transactionsSidebarAgentTransaction',
    link: '/transactions/agent-transaction/list',
    name: 'agent-transaction',
    addLink: '/transactions/agent-transaction/add',
  },
  {
    title: 'transactionsSidebarAgentList',
    link: '/transactions/agent/list',
    name: 'agent-list',
    // addLink: '/transactions/agent/add',
  },
  {
    title: 'transactionsSidebarJournelVoucher',
    link: '/transactions/deposit/list',
    name: 'journel-voucher',
    addLink: '/transactions/deposit/add',
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
    link: '/loan/repayments/add',
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

const reportColumn = [
  {
    label: 'transactionLayoutBalanceSheet',
    navigate: '/settings/general/members',
  },
  {
    label: 'transactionLayoutIncomeStatement',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'transactionLayoutCashFlowStament',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'transactionLayoutChangeOfEquity',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'transactionLayoutAppropriationOfProfit',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'transactionLayoutBankGLBalance',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'transactionLayoutBankGLStatement',
    navigate: '/settings/general/members/kym-individual',
  },
];

export const TransactionsSidebarLayout = ({ children }: ITransactionsSidebarLayoutProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Box>
      <Box width="260px" position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['transactionSidebarTransaction']}
          </Text>
        </Box>

        <Box p="s16">
          <Popover placement="bottom-start" gutter={3}>
            <PopoverTrigger>
              <Button width="full" size="md" justifyContent="start" leftIcon={<AddIcon />}>
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
          {reportColumn.map((item) => (
            <SettingsButton icon={CgLoadbarDoc} buttonLabel={t[item?.label]} />
          ))}
        </Box>
      </Box>
      <Box width="calc(100% - 260px)" position="relative" left="260px" minH="calc(100vh - 110px)">
        {children}
      </Box>
    </Box>
  );
};
