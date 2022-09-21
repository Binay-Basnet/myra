import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import {
  AddButtonList,
  Box,
  Button,
  Divider,
  Icon,
  PopOverComponentForButtonList,
  Text,
} from '@coop/shared/ui';
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
    link: '/accounts/account-close',
    addLinkId: '/accounts/account-close',
  },
];

const addButtoncolumns = [
  {
    title: 'newAccountOpen',
    link: '/accounts/account-open',
  },
  {
    title: 'accountClose',
    link: '/accounts/account-close',
  },
];
export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation();

  return (
    <Box display="flex">
      <Box width="240px" p="s12" flexShrink={0} position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['accountLayout']}
        </Text>
        <Divider my="s16" />
        {/* <Button
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
        </Button> */}

        <PopOverComponentForButtonList buttonLabel="accountLayoutNewAccount">
          {addButtoncolumns.map((item) => (
            <Box key={item.link}>
              <AddButtonList
                label={t[item.title]}
                onClick={() =>
                  newId.mutateAsync({}).then((res) => router.push(`${item.link}/add/${res?.newId}`))
                }
              />
            </Box>
          ))}
        </PopOverComponentForButtonList>
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
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['accountLayoutAccountSettings']}
        </Button>
      </Box>
      <Box
        boxShadow="xl"
        width="calc(100% - 240px)"
        overflowX="hidden"
        position="relative"
        left="240px"
      >
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
