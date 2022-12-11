import React from 'react';
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
  Text,
} from '@myra-ui';

import { TabColumn } from '@coop/myra/components';
import { useTranslation } from '@coop/shared/utils';

interface IOthersPageLayoutProps {
  children: React.ReactNode;
}

const othersColumns = [
  {
    title: 'Market Representatives List',
    link: '/others/market-representatives/list',
    name: 'market-representatives',
  },
  {
    title: 'Market Representatives Transactions',
    link: '/others/market-representatives-transactions/list',
    name: 'market-representatives-transactions',
    addLink: '/others/market-representatives-transactions/add',
  },
  {
    title: 'Profit to Fund Management',
    link: '/others/fund-management/list',
    name: 'fund-management',
    addLink: '/others/fund-management/add',
  },
  {
    title: 'Share Dividend Posting',
    link: '/others/share-dividend-posting/list',
    name: 'share-dividend-posting',
    addLink: '/others/share-dividend-posting/add',
  },
];

const dropdownButtons = [
  {
    label: 'New Market Representatives',
    link: '/others/market-representatives/add',
  },
  {
    label: 'New Profit to Fund Management',
    link: '/others/fund-management/add',
  },
  {
    label: 'New Share Dividend Posting',
    link: '/others/share-dividend-posting/add',
  },
];

export const OthersPageLayout = ({ children }: IOthersPageLayoutProps) => {
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
        height="100%"
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

          <Link href="/others/fund-management/list">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              Others
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
                        {addButton.label}
                      </Text>
                    </Box>
                  ))}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Divider my="s16" />

          <TabColumn list={othersColumns} />
          <Divider my="s16" />
          {/* <SettingsButton icon={CgLoadbarDoc} buttonLabel="Account and Finance Settings" /> */}
        </Box>
      </Box>
      <Box
        bg="white"
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
