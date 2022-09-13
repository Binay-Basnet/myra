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

const loanColumns = [
  {
    title: 'NewLoanApplication',
    link: '/loan',
    addLink: '/loan/add',
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
      <Box width="275px" p="s24" flexShrink={0} position="fixed">
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
          {addButtoncolumns.map((item, index) => {
            return (
              <Box key={`${item}${index}`}>
                <AddButtonList
                  label={t[item.title]}
                  onClick={() =>
                    newId
                      .mutateAsync({})
                      .then((res) => router.push(`${item.link}/add/${res?.newId}`))
                  }
                />
              </Box>
            );
          })}
        </PopOverComponentForButtonList>
        <Divider my="s16" />
        <TabColumn list={loanColumns} />
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
      <Box width="calc(100% - 275px)" overflowX="hidden" position="relative" left="275px">
        <Box bg="white" minHeight="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
