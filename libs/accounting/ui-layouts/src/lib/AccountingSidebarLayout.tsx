import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';

import { TabColumn } from '@coop/myra/components';
import {
  Box,
  Button,
  Divider,
  Icon,
  //   Popover,
  //   PopoverBody,
  //   PopoverContent,
  //   PopoverTrigger,
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
  },
  {
    title: 'accountingAccountingSidebarCashTransfer',
    link: '/accounting/accounting/cash-transfer/list',
  },
  {
    title: 'accountingAccountingSidebarQuickPayment',
    link: '/accounting/accounting/quick-payment/list',
  },
  {
    title: 'accountingAccountingSidebarQuickReceipt',
    link: '/accounting/accounting/quick-receipt/list',
  },
  {
    title: 'accountingAccountingSidebarBankAccounts',
    link: '/accounting/accounting/bank-accounts/list',
  },
  {
    title: 'accountingAccountingSidebarChartsOfAccounts',
    link: '/accounting/accounting/charts-of-account/list',
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

        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              width="full"
              size="lg"
              justifyContent="start"
              leftIcon={<AddIcon h="11px" />}
            >
              {t['accountingAccountingSidebarCreate']}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            // bg="gray.0"
            w="275px"
            h="auto"
            px="s12"
            py="s24"
            border="none"
            boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
            outline={'none'}
            _focus={{
              boxShadow:
                '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <PopoverBody>
              <Box>
                <Button
                  width="full"
                  size="lg"
                  justifyContent="start"
                  leftIcon={<AddIcon h="11px" />}
                  variant="ghost"
                  onClick={() => router.push('/accounting/purchase/add')}
                >
                  {'Journal Voucher'}
                </Button>

                <Button
                  width="full"
                  size="lg"
                  justifyContent="start"
                  leftIcon={<AddIcon h="11px" />}
                  variant="ghost"
                  onClick={() =>
                    router.push('/accounting/purchase/expenses/add')
                  }
                >
                  {'Cash Transfer'}
                </Button>

                <Button
                  width="full"
                  size="lg"
                  justifyContent="start"
                  leftIcon={<AddIcon h="11px" />}
                  variant="ghost"
                  onClick={() =>
                    router.push('/accounting/purchase/debit-note/add')
                  }
                >
                  {'Quick Payment'}
                </Button>

                <Button
                  width="full"
                  size="lg"
                  justifyContent="start"
                  leftIcon={<AddIcon h="11px" />}
                  variant="ghost"
                  onClick={() =>
                    router.push('/accounting/purchase/supplier-payment/add')
                  }
                >
                  {'Bank Accounts'}
                </Button>

                <Button
                  width="full"
                  size="lg"
                  justifyContent="start"
                  leftIcon={<AddIcon h="11px" />}
                  variant="ghost"
                  onClick={() =>
                    router.push('/accounting/purchase/supplier-payment/add')
                  }
                >
                  {'Charts of Accounts'}
                </Button>
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
          {'Accounting Settings'}
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
