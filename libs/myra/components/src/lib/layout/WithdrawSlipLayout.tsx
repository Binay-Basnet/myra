import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AddButtonList, Box, Divider, PopOverComponentForButtonList, Text } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { TabColumn } from '../tab/TabforMemberPage';

interface IMemberPageLayout {
  children: React.ReactNode;
}

const shareColumns = [
  {
    title: 'Withdraw Slip Book',
    link: '/withdraw/withdraw-slip-book/list',
    addLink: '/withdraw/withdraw-slip-book/add',
  },
  {
    title: 'withdrawSlipRequests',
    link: '/withdraw/cheque-book',
  },
  {
    title: 'withdrawSlipBlockRequests',
    link: '/withdraw/block-withdraw-slip-requests/list',
    addLink: '/withdraw/block-withdraw-slip-requests/add',
  },
];

const addButtoncolumns = [
  {
    title: 'Withraw Slip Book',
    link: '/withdraw/withdraw-slip-book/add',
  },
  {
    title: 'Block Withdraw Slip Requests',
    link: '/withdraw/block-withdraw-slip-requests/add',
  },
];

export const WithdrawSlipLayout = ({ children }: IMemberPageLayout) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box width="260px" flexShrink={0} position="fixed" zIndex={1}>
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

          <Link href="/withdraw/cheque-book">
            <Text lineHeight="125%" fontSize="l1" fontWeight="600" color="gray.800">
              {t['withdrawSlip']}
            </Text>
          </Link>
        </Box>

        <Box p="s16">
          <PopOverComponentForButtonList buttonLabel="New">
            {addButtoncolumns.map((item) => (
              <Box key={item?.title}>
                <AddButtonList
                  label={t[item.title] ?? item.title}
                  onClick={() => router.push(`${item.link}`)}
                />
              </Box>
            ))}
          </PopOverComponentForButtonList>

          <Divider my="s16" />
          <TabColumn list={shareColumns} />
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
export default WithdrawSlipLayout;
