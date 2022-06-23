import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _focus: {
      boxShadow: 'none',
    },
    _selected: { color: '#37474F', bg: 'gray.200' },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const VerticalSideBarForSettings = ({
  tablinks,
}: IVerticalSidebarProps) => {
  const route = useRouter();
  const currentIndex = useMemo(
    () => tablinks.findIndex((link) => route.pathname.includes(link.to)),
    [route.pathname]
  );
  const { t } = useTranslation();
  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }, index) => {
          return (
            <Link href={to} key={`${title}${index}`}>
              <TabCol>
                <Text>{t[title]}</Text>
              </TabCol>
            </Link>
          );
        })}
      </Tabs>
    </Box>
  );
};
