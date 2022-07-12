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

interface IPurchaseLayoutProps {
  children: React.ReactNode;
}

const purchaseColumns = [
  {
    title: 'accountingPurchaseSidebarPurchaseList',
    link: '/accounting/purchase/list',
  },
  {
    title: 'accountingPurchaseSidebarExpenses',
    link: '/accounting/purchase/expenses/list',
  },
  {
    title: 'accountingPurchaseSidebarDebitNote',
    link: '/accounting/purchase/debit-note/list',
  },
  {
    title: 'accountingPurchaseSidebarSupplierPayment',
    link: '/accounting/purchase/supplier-payment/list',
  },
];

export const PurchaseLayout = ({ children }: IPurchaseLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountingPurchaseSidebarPurchase']}
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
              {t['accountingPurchaseSidebarCreate']}
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
                  {'Purchase List'}
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
                  {'Expenses'}
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
                  {'Debit Note'}
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
                  {'Supplier Payment'}
                </Button>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Divider my="s16" />
        <TabColumn list={purchaseColumns} />
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
          {'Purchase Settings'}
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
