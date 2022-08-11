import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../tab/TabforMemberPage';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'accountList',
    link: '/accounts/list',
    addLinkId: '/accounts/account-open',
  },
  {
    title: 'accountClose',
    link: '/accounts/close',
    addLinkId: '/accounts/account-open',
  },
  {
    title: 'accountReport',
    link: '/accounts/report',
  },
];

export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation();

  return (
    <Box display="flex">
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountLayout']}
        </Text>
        <Divider my="s16" />
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() =>
            newId
              .mutateAsync({})
              .then((res) =>
                router.push(`/accounts/account-open/add/${res?.newId}`)
              )
          }
        >
          {t['accountLayoutNewAccount']}
        </Button>
        <Divider my="s16" />
        <TabColumn list={accountColumns} />
        <Divider my="s16" />
        <Button
          onClick={() => router.push('/settings/general/charts-of-accounts')}
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={
            <Icon as={AiOutlineSetting} size="md" color="primary.500" />
          }
        >
          {t['accountLayoutAccountSettings']}
        </Button>
      </Box>
      <Box
        width="calc(100% - 275px)"
        overflowX="hidden"
        position="relative"
        left="275px"
      >
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
