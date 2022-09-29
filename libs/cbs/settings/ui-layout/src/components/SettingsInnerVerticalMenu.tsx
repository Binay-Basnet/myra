import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '40px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'left',
    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
      borderRadius: 'br2',
    },
    _focus: {
      boxShadow: 'none',
    },
    _hover: {
      bg: 'gray.100',
      borderRadius: 'br2',
    },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const SettingsInnerVerticalMenu = ({ tablinks }: IVerticalSidebarProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const currentIndex = useMemo(
    () => tablinks.findIndex((link) => router.pathname === link.to),
    [router.pathname]
  );

  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }) => (
          <Link href={to} key={title}>
            <TabCol>
              <Text>{t[title]}</Text>
            </TabCol>
          </Link>
        ))}
      </Tabs>
    </Box>
  );
};
