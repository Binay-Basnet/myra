import React from 'react';
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
    title: 'transferVaultTransfer',
    link: '/transactions/deposit/list',
    name: 'deposit',
    addLink: '/transactions/deposit/add',
  },
  {
    title: 'transferTellerTransfer',
    link: '/transactions/withdraw/list',
    name: 'withdraw',
    addLink: '/transactions/withdraw/add',
  },
  {
    title: 'transferBranchTransfer',
    link: '/transactions/account-transfer/list',
    name: 'account-transfer',
    addLink: '/transactions/account-transfer/add',
  },
];

const dropdownButtons = [
  {
    label: 'transferVaultTransfer',
    link: '/transactions/deposit/add',
  },
  {
    label: 'transferTellerTransfer',
    link: '/transactions/withdraw/add',
  },
  {
    label: 'transferBranchTransfer',
    link: '/transactions/account-transfer/add',
  },
];

export const TransferLayout = ({ children }: ITransactionsSidebarLayoutProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Box>
      <Box width="260px" position="fixed">
        <Box height="60px" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['navbarTransfer']}
          </Text>
        </Box>

        <Box p="s16">
          <Popover placement="bottom-start" gutter={3}>
            <PopoverTrigger>
              <Button width="full" size="md" justifyContent="start" leftIcon={<AddIcon />}>
                {t['newTransfer']}
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
        </Box>
      </Box>
      <Box
        width="calc(100% - 260px)"
        position="relative"
        left="260px"
        minH="calc(100vh - 110px)"
        bg="white"
      >
        {children}
      </Box>
    </Box>
  );
};