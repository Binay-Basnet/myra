import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { chakra, Tab, Tabs } from '@chakra-ui/react';

import { Box, Text } from '@myra-ui';

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
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

export interface GlobalAppSettingsLayoutProps {
  children: React.ReactNode;
}

export const GlobalAppSettingsLayout = (props: GlobalAppSettingsLayoutProps) => {
  const { children } = props;

  const router = useRouter();

  const { t } = useTranslation();

  const tabLinks = [
    {
      title: t['neoSettingsGlobalAppSettingsGeneral'],
      to: `/settings/global-app-settings`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsInterestRate'],
      to: `/settings/global-app-settings/interest-rate`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsShare'],
      to: `/settings/global-app-settings/share`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsTDSTaxVAT'],
      to: `/settings/global-app-settings/tds-tax-vat`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsChargeSetup'],
      to: `/settings/global-app-settings/charge-setup`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsCalendarSetup'],
      to: `/settings/global-app-settings/calendar-setup`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsChequeCertificateSetup'],
      to: `/settings/global-app-settings/cheque-certificate-setup`,
    },
    {
      title: t['neoSettingsGlobalAppSettingsBulkMessaging'],
      to: `/settings/global-app-settings/bulk-messaging`,
    },
  ];

  const currentIndex = useMemo(
    () => tabLinks.findIndex((link) => router.asPath === link.to),
    [router.asPath]
  );

  return (
    <Box>
      <Box
        height="3.125rem"
        p="s16"
        borderBottom="1px solid"
        borderColor="border.layout"
        position="sticky"
        zIndex="10"
        display="flex"
        gap="s10"
        alignItems="center"
      >
        <Text color="gray.800" fontWeight={600} fontSize="r2">
          {t['neoSettingsGlobalAppSettingsGlobal']}
        </Text>
      </Box>
      <Box width="300px" position="fixed" px="s8" py="s16">
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
      <Box
        marginLeft="300px"
        bg="#EEF2F7"
        p="s16"
        width="calc(100%-300px)"
        minHeight="calc(100vh - 160px) "
      >
        {children}
      </Box>
    </Box>
  );
};

export default GlobalAppSettingsLayout;
