import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgLoadbarDoc } from 'react-icons/cg';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  AddButtonList,
  Box,
  Divider,
  PopOverComponentForButtonList,
  SettingsButton,
  Text,
} from '@myra-ui';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../tab/TabforMemberPage';

interface IAccountPageLayoutProps {
  children: React.ReactNode;
}

const accountColumns = [
  {
    title: 'accountList',
    link: '/savings/list',
    addLinkId: '/savings/account-open',
    idType: Id_Type?.Account,
  },
  {
    title: 'transactionsSidebarDeposit',
    link: '/savings/deposit/list',
    name: 'deposit',
    addLink: '/savings/deposit/add',
  },
  {
    title: 'transactionsSidebarWithdraw',
    link: '/savings/withdraw/list',
    name: 'withdraw',
    addLink: '/savings/withdraw/add',
  },
  {
    title: 'transactionsSidebarAccountTransfer',
    link: '/savings/account-transfer/list',
    name: 'account-transfer',
    addLink: '/savings/account-transfer/add',
  },
  {
    title: 'savingProducts',
    link: '/savings/products',
  },
  {
    title: 'accountClose',
    link: '/savings/account-close',
    addLinkId: '/savings/account-close',
    idType: Id_Type?.Account,
  },
];

const addButtoncolumns = [
  {
    title: 'newAccountOpen',
    link: '/savings/account-open',
  },
  {
    title: 'accountClose',
    link: '/savings/account-close',
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
    navigate: '/reports/cbs/savings/statement/new',
  },
  {
    label: 'savingsIntrestTaxReport',
    navigate: '/reports/cbs/savings/interest-tax/new',
  },
  {
    label: 'savingsIntrestStatement',
    navigate: '/reports/cbs/savings/interest-statement/new',
  },
];
export const AccountPagesLayout = ({ children }: IAccountPageLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation({});

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed">
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

          <Link href="/savings/list">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {t['savings']}
            </Text>
          </Link>
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
            <SettingsButton
              icon={CgLoadbarDoc}
              buttonLabel={t[item?.label]}
              onClick={() => item?.navigate && router.push(item?.navigate)}
            />
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
