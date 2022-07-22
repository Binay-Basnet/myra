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

interface ISalesLayoutProps {
  children: React.ReactNode;
}

const inventoryColumns = [
  {
    title: 'salesList',
    link: '/accounting/sales/list',
  },
  {
    title: 'creditNote',
    link: '/accounting/sales/credit-note/list',
  },
  {
    title: 'customerPayment',
    link: '/accounting/sales/customer-payment/list',
  },
];

export const SalesLayout = ({ children }: ISalesLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountingsales']}
        </Text>
        <Divider my="s16" />
        <Popover placement="bottom-start" gutter={3}>
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
                  onClick={() => router.push('/accounting/sales/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['salesList']}
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
                  onClick={() =>
                    router.push('/accounting/sales/credit-note/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['creditNote']}
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
                    router.push('/accounting/sales/customer-payment/add')
                  }
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {t['customerPayment']}
                  </Text>
                </Box>

                {/* <Button
                  width="full"
                  size="lg"
                  justifyContent="start"
                  borderRadius={'none'}
                  leftIcon={<AddIcon h="11px" />}
                  variant="ghost"
                  onClick={() =>
                    router.push('/accounting/sales/customer-payment/add')
                  }
                >
                  {t['customerPayment']}
                </Button> */}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Divider my="s16" />
        <TabColumn list={inventoryColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/members/settings')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          {t['accountingSalesSettings']}
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
