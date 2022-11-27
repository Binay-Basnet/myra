import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { chakra, Tab, Tabs } from '@chakra-ui/react';

import { Box, Button, Divider, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

interface IUsersSidebarProps {
  children: React.ReactNode;
}

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

export const UsersSiderbar = ({ children }: IUsersSidebarProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const tabLinks = [
    { title: t['neoClientUserSiderbarUsersList'], to: `/users` },
    {
      title: t['neoClientUserSiderbarUsersRole'],
      to: `/users/role`,
    },
  ];

  const currentIndex = useMemo(
    () => tabLinks.findIndex((link) => router.asPath === link.to),
    [router.asPath]
  );

  return (
    <Box display="flex">
      <Box width="275px" p="s24" position="fixed" flexShrink={0}>
        <Text fontSize="l1" fontWeight="600" color="gray.800">
          {t['neoClientUserSiderbarUsers']}
        </Text>

        <Divider my="s16" />

        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
          onClick={() => router.push('/users/add')}
        >
          {t['neoClientUserSiderbarNewUser']}
        </Button>

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

        {/* <Button
          width="full"
          size="lg"
          color="gray.600"
          fontWeight={600}
          variant="ghost"
          justifyContent="start"
          onClick={() => router.push('/users')}
        >
          {t['neoClientUserSiderbarUsersList']}
        </Button>

        <Button
          width="full"
          size="lg"
          color="gray.600"
          fontWeight={600}
          variant="ghost"
          justifyContent="start"
          onClick={() => router.push('/users')}
        >
          {t['neoClientUserSiderbarUsersRole']}
        </Button> */}

        <Divider my="s16" />

        <Button
          width="full"
          size="lg"
          justifyContent="start"
          variant="ghost"
          color="gray.600"
          leftIcon={<AddIcon height="11px" />}
          // onClick={() => router.push('/users/[action]')}
        >
          {t['neoClientUserSiderbarNewUserRole']}
        </Button>
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
