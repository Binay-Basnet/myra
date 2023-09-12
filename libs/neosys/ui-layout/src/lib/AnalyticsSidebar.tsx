import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { chakra, Tab, Tabs } from '@chakra-ui/react';

import { Box, Divider, Text } from '@myra-ui';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '48px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {
      bg: '#DFE5EC',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

export const AnalyticsSiderbar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const tabLinks = [
    { title: 'Members', to: `/analytics/members` },
    { title: 'Money Ledgers', to: `/analytics/money-ledgers` },
    { title: 'Closing Day', to: `/analytics/closing-day` },
    { title: 'Loan Accounts', to: `/analytics/loan-accounts` },
    { title: 'Saving Accounts', to: `/analytics/saving-accounts` },
    { title: 'Transactions', to: `/analytics/transactions` },
    { title: 'Users', to: `/analytics/users` },
    { title: 'Database size', to: `/analytics/database-size` },
    { title: 'Access Log', to: `/analytics/access-log` },
  ];

  const currentIndex = useMemo(
    () => tabLinks.findIndex((link) => router.asPath === link.to),
    [router.asPath]
  );

  return (
    <Box display="flex">
      <Box width="275px" p="s24" position="fixed" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          Analytics
        </Text>

        <Divider my="s16" />
        <Tabs variant="unstyled" index={currentIndex}>
          {tabLinks.map(({ title, to }) => (
            <Link href={to}>
              <TabCol key={to}>
                <Text>{title}</Text>
              </TabCol>
            </Link>
          ))}
        </Tabs>

        <Divider my="s16" />
      </Box>
      <Box
        width="calc(100% - 275px)"
        left="275px"
        overflowX="hidden"
        position="relative"
        minHeight="calc(100vh - 110px)"
        bg="white"
      >
        {children}
      </Box>
    </Box>
  );
};
