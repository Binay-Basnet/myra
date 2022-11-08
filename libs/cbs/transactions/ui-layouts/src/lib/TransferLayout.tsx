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
    title: 'transferVaultTransfer',
    link: '/transfer/vault-transfer/list',
    name: 'vault-transfer',
    addLink: '/transfer/vault-transfer/add',
  },
  {
    title: 'transferTellerTransfer',
    link: '/transfer/teller-transfer/list',
    name: 'teller-transfer',
    addLink: '/transfer/teller-transfer/add',
  },
  {
    title: 'transferBranchTransfer',
    link: '/transfer/branch-transfer',
    name: 'branch-transfer',
    // addLink: '/transactions/account-transfer/add',
  },
];

const dropdownButtons = [
  {
    label: 'transferVaultTransfer',
    link: '/transfer/vault-transfer/add',
  },
  {
    label: 'transferTellerTransfer',
    link: '/transfer/teller-transfer/add',
  },
  // {
  //   label: 'transferBranchTransfer',
  //   link: '/transactions/account-transfer/add',
  // },
];

const reportColumn = [
  {
    label: 'transferVaultBalanceReport',
    navigate: '/settings/general/members',
  },
  {
    label: 'transferTellerReport',
    navigate: '/settings/general/members/kym-individual',
  },
];

export const TransferLayout = ({ children }: ITransactionsSidebarLayoutProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Box>
      <Box width="260px" position="fixed">
        <Box height="50px" alignItems="center" display="flex" py="s12" px="s16">
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
          {reportColumn.map((item) => (
            <SettingsButton icon={CgLoadbarDoc} buttonLabel={t[item?.label]} />
          ))}
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
