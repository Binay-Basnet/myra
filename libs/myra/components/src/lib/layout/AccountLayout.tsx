import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import { useRouter } from 'next/router';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import {
  AddButtonList,
  Box,
  Divider,
  PopOverComponentForButtonList,
  SettingsButton,
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
    idType: Id_Type?.Account,
  },
  {
    title: 'transactionsSidebarDeposit',
    link: '/accounts/deposit/list',
    name: 'deposit',
    addLink: '/accounts/deposit/add',
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: '/accounts/withdraw/list',
    name: 'withdraw',
    addLink: '/accounts/withdraw/add',
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: '/accounts/account-transfer/list',
    name: 'account-transfer',
    addLink: '/accounts/account-transfer/add',
  },
  {
    title: 'savingProducts',
    link: '/accounts/products',
  },
  {
    title: 'accountClose',
    link: '/accounts/account-close',
    addLinkId: '/accounts/account-close',
    idType: Id_Type?.Account,
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

const settingsColumn = [
  {
    label: 'savingsDepositSettings',
    navigate: '/settings/general/deposit/tds',
  },
  {
    label: 'savingsProductSettings',
    navigate: '/settings/general/deposit-products',
  },
];

const reportColumn = [
  {
    label: 'savingsDepositStatementReport',
    navigate: '/settings/general/members',
  },
  {
    label: 'savingsIntrestTaxReport',
    navigate: '/settings/general/members/kym-individual',
  },
  {
    label: 'savingsIntrestStatement',
    navigate: '/settings/general/members/kym-individual',
  },
];
export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation({});

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
        <Box height="50px" alignItems="center" display="flex" py="s12" px="s16">
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {t['savings']}
          </Text>
        </Box>
        <Box p="s16">
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
                    newId
                      .mutateAsync({ idType: Id_Type.Account })
                      .then((res) => router.push(`${item.link}/add/${res?.newId}`))
                  }
                />
              </Box>
            ))}
          </PopOverComponentForButtonList>
          <Divider my="s16" />
          <TabColumn list={accountColumns} />
          <Divider my="s16" />
          {settingsColumn.map((item) => (
            <SettingsButton
              icon={AiOutlineSetting}
              buttonLabel={t[item?.label]}
              onClick={() => router.push(item?.navigate)}
            />
          ))}
          {reportColumn.map((item) => (
            <SettingsButton icon={CgLoadbarDoc} buttonLabel={t[item?.label]} />
          ))}
        </Box>
      </Box>
      <Box w="100%" ml="260px">
        <Box bg="white" minHeight="calc(100vh - 110px)" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
