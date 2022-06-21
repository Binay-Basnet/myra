import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: '#37474F',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {
      color: 'gray.800',
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const SettingsInnerVerticalMenu = ({
  tablinks,
}: IVerticalSidebarProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const currentIndex = useMemo(
    () => tablinks.findIndex((link) => router.pathname === link.to),
    [router.pathname]
  );

  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }, index) => {
          return (
            <Link href={to}>
              <TabCol key={`${title}${index}`}>
                <Text>{t[title]}</Text>
              </TabCol>
            </Link>
          );
        })}
      </Tabs>
    </Box>
  );
};
