import { ReactNode, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { chakra, Tab, Tabs } from '@chakra-ui/react';

import { Box, Divider, Text } from '@myra-ui';
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
    { title: t['neoSettingsSidebarGeneralSettings'], to: `/settings` },
    {
      title: t['neoSettingsSidebarGlobalAppSettings'],
      to: `/settings/global-app-settings`,
    },
    {
      title: t['neoSettingsSidebarMyraModules'],
      to: `/settings/myra-modules`,
    },
    {
      title: t['neoSettingsSidebarDocumentMasterLists'],
      to: `/settings/document-master-lists`,
    },
    {
      title: t['neoSettingsSidebarUsers'],
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
          {t['neoSettingsSidebarSettings']}
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
      </Box>
      <Box w="100%" ml="275px">
        <Box bg="white" minHeight="calc(100vh - 110px)" width="100%">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
