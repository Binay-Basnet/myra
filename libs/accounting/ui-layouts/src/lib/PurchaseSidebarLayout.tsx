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
} from '@myra-ui';
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

        <Popover placement="bottom-start" gutter={3}>
          <PopoverTrigger>
            <Button width="full" size="lg" justifyContent="start" leftIcon={<AddIcon />}>
              {t['accountingPurchaseSidebarCreate']}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            // bg="gray.0"
            p={0}
            w="225px"
            _focus={{ boxShadow: 'none' }}
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
                  onClick={() => router.push('/accounting/purchase/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingPurchaseSidebarPurchaseList']}
                  </Text>
                </Box>

                <Box
                  px="s16"
                  py="s10"
                  width="100%"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  onClick={() => router.push('/accounting/purchase/expenses/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingPurchaseSidebarExpenses']}
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
                  onClick={() => router.push('/accounting/purchase/debit-note/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingPurchaseSidebarDebitNote']}
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
                  onClick={() => router.push('/accounting/purchase/supplier-payment/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['accountingPurchaseSidebarSupplierPayment']}
                  </Text>
                </Box>
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
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['accountingPurchaseSidebarPurchaseSettings']}
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
