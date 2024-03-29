import React from 'react';
import { CgLoadbarDoc } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

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
} from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

interface IShareRegisterDetailPageSidebarLayout {
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
    title: 'transactionsSidebarAgentTransaction',
    link: '/transactions/market-representative-transaction/list',
    name: 'agent-transaction',
    addLink: '/transactions/market-representative-transaction/add',
  },
  {
    title: 'transactionsSidebarAgentList',
    link: '/transactions/market-representative/list',
    name: 'agent-list',
    // addLink: '/transactions/agent/add',
  },
  {
    title: 'transactionsSidebarJournalVoucher',
    link: '/transactions/journal-vouchers/list',
    name: 'journal-voucher',
    addLink: '/transactions/journal-vouchers/add',
  },
  {
    title: 'transactionsSidebarAllTransactions',
    link: '/transactions/all-transactions/list',
    name: 'all-transactions',
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
  {
    label: 'New Journal Voucher',
    link: '/transactions/journal-vouchers/add',
  },
];

const reportColumn = [
  {
    label: 'transactionLayoutBalanceSheet',
    navigate: '/reports/cbs/transactions/trial-sheet/new',
  },
  // {
  //   label: 'transactionLayoutIncomeStatement',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  {
    label: 'transactionLayoutCashFlowStament',
    navigate: '/reports/cbs/transactions/cash-ledger/new',
  },
  // {
  //   label: 'transactionLayoutChangeOfEquity',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  // {
  //   label: 'transactionLayoutAppropriationOfProfit',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  // {
  //   label: 'transactionLayoutBankGLBalance',
  //   navigate: '/settings/general/members/kym-individual',
  // },
  {
    label: 'transactionLayoutBankGLStatement',
    navigate: '/reports/cbs/transactions/bank-gl-statement/new',
  },
];

export const ShareRegisterDetailPageSidebarLayout = ({
  children,
}: IShareRegisterDetailPageSidebarLayout) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Box minH="calc(100vh - 110px)">
      <Box
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        width="260px"
        height="calc(100vh - 110px)"
        overflowY="auto"
        position="fixed"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="start"
          py="s16"
          pb="s8"
          justifyContent="center"
          gap="s2"
          px="s16"
        >
          <Text fontSize="s2" fontWeight="600" color="primary.500">
            {t['corebankingSystems']}
          </Text>

          <Link href="/transactions/deposit/list">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {t['transactions']}
            </Text>
          </Link>
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
                        {t[addButton.label] ?? addButton.label}
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
            <SettingsButton
              icon={CgLoadbarDoc}
              buttonLabel={t[item?.label]}
              onClick={() => router.push(item.navigate)}
            />
          ))}
        </Box>
      </Box>
      <Box
        bg="background.500"
        width="calc(100% - 260px)"
        position="relative"
        left="260px"
        minH="calc(100vh - 110px)"
      >
        {children}
      </Box>
    </Box>
  );
};
