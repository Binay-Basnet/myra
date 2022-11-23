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

interface IExternalLoanSidebarLayoutProps {
  children: React.ReactNode;
}

const externalLoanSidebarColumns = [
  {
    title: 'External Loans',
    link: '/accounting/loan/external-loan/list',
    name: 'external-loan',
  },
  {
    title: 'External Loan Accounts',
    link: '/accounting/loan/external-loan-accounts/list',
    name: 'external-loan-accounts',
  },
  {
    title: 'Externa Loan Payment',
    link: '/accounting/loan/external-loan-payment/list',
    name: 'external-loan-payment',
  },
];

export const ExternalLoanSidebarLayout = ({ children }: IExternalLoanSidebarLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="SemiBold" color="gray.800">
          External Loan
        </Text>
        <Divider my="s16" />

        <Popover placement="bottom-start" gutter={3}>
          <PopoverTrigger>
            <Button width="full" size="lg" justifyContent="start" leftIcon={<AddIcon />}>
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
                  onClick={() => router.push('/accounting/loan/external-loan/new/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    External Loans
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
                  onClick={() => router.push('/accounting/loan/external-loan-accounts/new/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    External Loan Accounts
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
                  onClick={() => router.push('/accounting/loan/external-loan-payment/new/add')}
                >
                  <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    External Loan Payment
                  </Text>
                </Box>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Divider my="s16" />
        <TabColumn list={externalLoanSidebarColumns} />
        <Divider my="s16" />
        <Button
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          External Loan
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
