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

interface IAccountingSidebarLayoutProps {
  children: React.ReactNode;
}

const accountingSidebarColumns = [
  {
    title: 'accountingAccountingSidebarJournalVouchers',
    link: '/accounting/accounting/journal-vouchers/list',
    name: 'journal-vouchers',
  },
  {
    title: 'accountingAccountingSidebarCashTransfer',
    link: '/accounting/accounting/cash-transfer/list',
    name: 'cash-transfer',
  },
  {
    title: 'accountingAccountingSidebarQuickPayment',
    link: '/accounting/accounting/quick-payment/list',
    name: 'quick-payment',
  },
  {
    title: 'accountingAccountingSidebarQuickReceipt',
    link: '/accounting/accounting/quick-receipt/list',
    name: 'quick-receipt',
  },
  {
    title: 'accountingAccountingSidebarBankAccounts',
    link: '/accounting/accounting/bank-accounts/list',
    name: 'bank-accounts',
  },
  {
    title: 'accountingAccountingSidebarChartsOfAccounts',
    link: '/accounting/accounting/charts-of-account/list',
    name: 'charts-of-account',
  },
];

export const AccountingSidebarLayout = ({
  children,
}: IAccountingSidebarLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountingAccountingSidebarAccounting']}
        </Text>
        <Divider my="s16" />

        <Popover placement="bottom-start" gutter={3}>
          <PopoverTrigger>
            <Button
              width="full"
              size="lg"
              justifyContent="start"
              leftIcon={<AddIcon />}
            >
              {t['accountingAccountingSidebarCreate']}
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
                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() =>
                    router.push('/accounting/accounting/journal-vouchers/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingAccountingSidebarJournalVouchers']}
                  </Text>
                </Box>

                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() =>
                    router.push('/accounting/accounting/cash-transfer/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingAccountingSidebarCashTransfer']}
                  </Text>
                </Box>

                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() =>
                    router.push('/accounting/accounting/quick-payment/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingAccountingSidebarQuickPayment']}
                  </Text>
                </Box>

                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() =>
                    router.push('/accounting/accounting/quick-receipt/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingAccountingSidebarQuickReceipt']}
                  </Text>
                </Box>

                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() =>
                    router.push('/accounting/accounting/bank-accounts/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingAccountingSidebarBankAccounts']}
                  </Text>
                </Box>

                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() =>
                    router.push('/accounting/accounting/charts-of-accounts/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingAccountingSidebarChartsOfAccounts']}
                  </Text>
                </Box>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Divider my="s16" />
        <TabColumn list={accountingSidebarColumns} />
        <Divider my="s16" />
        <Button
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          {t['accountingAccountingSiderbarAccountingSettings']}
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
