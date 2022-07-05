import { ReactNode, useMemo } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import { chakra, Tab, Tabs } from '@chakra-ui/react';

import { Box, Button, Divider, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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

interface ISettingsLayoutProps {
  children: ReactNode;
}

export const SettingsLayout = ({ children }: ISettingsLayoutProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const tabLinks = [
    { title: 'General Settings', to: `/settings` },
    {
      title: 'Global App Settings',
      to: `/settings/global-app-settings`,
    },
    {
      title: 'Myra Modules',
      to: `/settings/myra-modules`,
    },
    {
      title: 'Document Master Lists',
      to: `/settings/document-master-list`,
    },
    {
      title: 'Setting',
      to: `/settings/users`,
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
          {t['neoClientSiderbarClients']}
        </Text>

        <Divider my="s16" />

        <Tabs variant="unstyled" index={currentIndex}>
          {tabLinks.map(({ title, to }, index) => {
            return (
              <Link href={to}>
                <TabCol key={`${title}${index}`}>
                  <Text>{title}</Text>
                </TabCol>
              </Link>
            );
          })}
        </Tabs>
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
