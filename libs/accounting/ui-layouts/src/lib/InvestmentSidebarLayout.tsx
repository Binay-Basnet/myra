import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { TabColumn } from '@coop/myra/components';
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

interface IInvestmentSidebarLayoutProps {
  children: React.ReactNode;
}

const investmentSidebarColumns = [
  {
    title: 'Investments',
    link: '/accounting/investment/list',
    name: 'investment-list',
    addLinkId: '/accounting/investment',
  },
  {
    title: 'Investment Accounts',
    link: '/accounting/investment/investment-account/list',
    name: 'investment-account-list',
    addLinkId: '/accounting/investment/investment-account',
  },
  {
    title: 'Investment Transaction',
    link: '/accounting/investment/investment-transaction/list',
    name: 'investment-transaction-list',
    addLink: '/accounting/investment/investment-transaction/add',
  },
];

const dropdownButtons = [
  {
    label: 'Investment',
    linkId: '/accounting/investment/add',
  },
  {
    label: 'Investment Account',
    linkId: '/accounting/investment/investment-account/add',
  },
  {
    label: 'Investment Transaction',
    link: '/accounting/investment/investment-transaction/add',
  },
];

export const InvestmentSidebarLayout = ({ children }: IInvestmentSidebarLayoutProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const newId = useGetNewIdMutation();

  return (
    <Box>
      <Box width="275px" p="s24" position="fixed">
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Investment
        </Text>
        <Divider my="s16" />

        <PopOverComponentForButtonList buttonLabel="Create">
          {dropdownButtons.map((item) => (
            <Box key={item.link}>
              <AddButtonList
                label={t[item.label] ?? item.label}
                onClick={() => {
                  if (item.linkId) {
                    newId
                      .mutateAsync({})
                      .then((res) => router.push(`${item.link}/add/${res?.newId}`));
                  } else {
                    item.link && router.push(item.link);
                  }
                }}
              />
            </Box>
          ))}
        </PopOverComponentForButtonList>

        <Divider my="s16" />
        <TabColumn list={investmentSidebarColumns} />
        <Divider my="s16" />
        <Button
          variant="ghost"
          color="#37474F"
          height="s48"
          width="full"
          justifyContent="start"
          leftIcon={<Icon as={AiOutlineSetting} size="md" color="primary.500" />}
        >
          {t['accountingAccountingSiderbarAccountingSettings']}
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
